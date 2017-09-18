import * as $ from "jquery";
import ActionResult from "../../ActionResult";
import CityAirport from "./CityAirport";
import DatePicker from "../../controls/DatePicker";
import errorList from "../../controls/errorList";
import flightSearchResults from "./flightSearchResults";
import { IAirport } from "../../api/getAirports";
import { IFlightSearchParams, IFlightSearchItem } from "../../api/flightSearch";
import * as moment from "moment";
import ProgressBar from "../../controls/ProgressBar";

interface IFlightProps {
    flightSearch: (args: IFlightSearchParams) => Promise<ActionResult<IFlightSearchItem[]>>;
    getAirports: (city: string) => Promise<ActionResult<IAirport[]>>;
    header: string;
    stubId: string;
}
export default class Flight {
    public readonly fromCityAirport: CityAirport;
    public readonly toCityAirport: CityAirport;
    public readonly datepicker: DatePicker;
    private readonly control: JQuery.Node[];
    private readonly searchButtonId: string;
    private readonly searchProgressBar: ProgressBar = new ProgressBar();

    constructor(readonly props: IFlightProps) {
        this.search.bind(this);

        const fromCityStubId = `${props.stubId}_from_city`;
        const toCityStubId = `${props.stubId}_to_city`;
        const datePickerStubId = `${props.stubId}_datepicker`;
        this.searchButtonId = `${props.stubId}_search_button`;

        this.control = $.parseHTML(
            `<div class="flight">
                <h2>${props.header}</h2>
                <div class="form-group row">
                    <div class="col-sm-4">
                        <div id="${fromCityStubId}"></div>
                    </div>
                    <div class="col-sm-4">
                        <div id="${toCityStubId}"></div>
                    </div>
                    <div class="col-sm-4">
                        <label>Date</label>
                        <div id="${datePickerStubId}"></div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <button id="${this.searchButtonId}" type="button" class="btn btn-primary pull-right">
                            Search
                        </button>
                    </div>
                </div>
                <div class="row>
                    <div class="col-sm-12">
                        <div class="search-progress-bar-stub"></div>
                        <div class="flight-result"></div>
                    </div>
                </div>
            </div>`);

        const labelNoSpace = props.header.replace(/[^a-zA-Z]/, "").toLowerCase();
        this.fromCityAirport = new CityAirport({
            label: "Flying from",
            name: `from_city_${labelNoSpace}`,
            placeholder: "City",
            stubId: fromCityStubId,
        });

        this.toCityAirport = new CityAirport({
            label: "Flying to",
            name: `to_city_${labelNoSpace}`,
            placeholder: "City",
            stubId: toCityStubId,
        });

        this.datepicker = new DatePicker({
            minDate: moment().startOf("day").add(1, "days").toDate(),
            stubId: datePickerStubId,
        });
    }

    public render() {
        const self = this;
        $().ready(() => {
            const ctrl = $(`#${self.props.stubId}`).replaceWith($(self.control));
            self.fromCityAirport.render();
            self.toCityAirport.render();
            self.datepicker.render();
            $(self.control).find(".search-progress-bar-stub").replaceWith($(self.searchProgressBar.control));
            self.searchProgressBar.hide();

            $(`#${self.searchButtonId}`).click(async () => {
                const button = $(self.control).find("button");
                self.searchProgressBar.show();
                button.prop("disabled", true);

                const result = await self.search();
                const flightResultContainer = $(self.control).find(".flight-result");

                const jNode: JQuery.Node[] = result.type === "success"
                    ? flightSearchResults(result.value)
                    : errorList(result.errors);
                flightResultContainer.html("");
                flightResultContainer.append(jNode);

                self.searchProgressBar.hide();
                button.prop("disabled", false);
            });
        });
    }

    public validate(): ActionResult<IFlightSearchParams> {
        const errors: string[] = [];
        const fromAirportCode = this.fromCityAirport.getAirportCode();
        if (fromAirportCode === undefined) {
            errors.push(`The field "Flying from airport" is required`);
        }
        const toAirportCode = this.toCityAirport.getAirportCode();
        if (toAirportCode === undefined) {
            errors.push(`The field "Flying to airport" is required`);
        }
        const date = this.datepicker.getDate();
        if (date === undefined) {
            errors.push(`The field "Date" is required`);
        }

        return errors.length > 0
            ? { type: "error", errors }
            : { type: "success", value: { fromAirportCode, toAirportCode, date } as IFlightSearchParams };
    }

    public search(): Promise<ActionResult<IFlightSearchItem[]>> {
        const result = this.validate();
        if (result.type === "error") {
            return new Promise((res, rej) => res(result));
        }

        return this.props.flightSearch(result.value);
    }
}
