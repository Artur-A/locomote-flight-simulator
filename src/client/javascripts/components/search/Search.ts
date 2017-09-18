import * as $ from "jquery";
import ActionResult from "../../ActionResult";
import Flight from "./Flight";
import { IAirport } from "../../api/getAirports";
import { IFlightSearchParams, IFlightSearchItem } from "../../api/flightSearch";

interface ISearchProps {
    flightSearch: (args: IFlightSearchParams) => Promise<ActionResult<IFlightSearchItem[]>>;
    getAirports: (city: string) => Promise<ActionResult<IAirport[]>>;
    stubId: string;
}
export default class Search {
    public readonly directFlight: Flight;
    public readonly returnFlight: Flight;
    private readonly control: JQuery.Node[];

    constructor(readonly props: ISearchProps) {
        const directFlightStubId = `${props.stubId}_direct_flight`;
        const returnFlightStubId = `${props.stubId}_return_flight`;
        this.control = $.parseHTML(
            `<div>
                <div id="${directFlightStubId}"></div>
                <div id="${returnFlightStubId}"></div>
            </div>`);

        this.directFlight = new Flight({
            flightSearch: props.flightSearch,
            getAirports: props.getAirports,
            header: "Go to",
            stubId: directFlightStubId,
        });

        this.returnFlight = new Flight({
            flightSearch: props.flightSearch,
            getAirports: props.getAirports,
            header: "Return",
            stubId: returnFlightStubId,
        });
    }

    public render() {
        const self = this;
        $().ready(() => {
            $(`#${self.props.stubId}`).replaceWith($(self.control));
            self.directFlight.render();
            self.returnFlight.render();
        });
    }
}
