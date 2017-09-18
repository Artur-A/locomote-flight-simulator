import errorList from "../../controls/errorList";
import getAirports from "../../api/getAirports";
import GoogleCityAutocomplete from "./GoogleCityAutocomplete";
import IKeyText from "../../IKeyText";
import Select from "../../controls/Select";

interface ICityAirportProps {
    label: string;
    name: string;
    placeholder: string;
    stubId: string;
}
export default class CityAirport {
    private readonly cityControl: GoogleCityAutocomplete;
    private airportControl: Select;
    private readonly control: JQuery.Node[];

    constructor(private readonly props: ICityAirportProps) {
        const self = this;
        const cityStubId = `${props.stubId}_city`;
        const airporStubId = `${props.stubId}_airport`;
        this.control = $.parseHTML(`
            <div>
                <div>
                    <label for="${props.name}">${props.label}</label>
                    <div id="${cityStubId}"></div>
                </div>
                <div>
                    <label>Airport</label>
                    <div id="${airporStubId}"></div>
                    <div class="airport-search-error"></div>
                </div>
            </div>
        `);

        this.cityControl = new GoogleCityAutocomplete({
            name: props.name,
            onCitySelect: this.loadAirports.bind(this),
            placeholder: props.placeholder,
            stubId: cityStubId,
        });
        this.airportControl = new Select({
            items: [],
            stubId: airporStubId,
        });
    }

    public getAirportCode(): string | undefined {
        return this.airportControl.getSelectedKey();
    }

    public render() {
        const self = this;
        $().ready(() => {
            $(`#${self.props.stubId}`).replaceWith($(self.control));
            self.cityControl.render();
            self.airportControl.render();
        });
    }


    private async loadAirports(city: string) {
        $(this.control).find(".airport-search-error").html("");

        const result = await getAirports(city);
        if (result.type === "success") {
            const keyPairs = result.value.map((airport) => {
                return {
                    key: airport.airportCode,
                    text: `${airport.airportCode} ${airport.airportName}`,
                };
            });
            this.airportControl.setItems(keyPairs);
        } else {
            this.airportControl.setItems([]);
            const errors = errorList(result.errors);
            $(this.control).find(".airport-search-error").append(errors);
        }
    }
}
