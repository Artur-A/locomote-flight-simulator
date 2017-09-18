import * as $ from "jquery";

// tslint:disable-next-line:no-namespace
declare namespace google.maps {
}

interface IGoogleCityAutocompleteProps {
    name: string;
    onCitySelect?: (city: string) => void;
    placeholder: string;
    stubId: string;
}
export default class GoogleCityAutocomplete {
    private control: JQuery.Node[];
    private autocomplete: any;
    private state: { city?: string } = { city: undefined };

    constructor(public readonly props: IGoogleCityAutocompleteProps) {
        this.control = $.parseHTML(
            `<input type="text" class="form-control"
                        id="${props.name}_input"
                        placeholder="${props.placeholder}">`);
    }

    public render() {
        const self = this;
        $().ready(() => {
            if ($(`#${self.props.stubId}`).length) {
                $(`#${self.props.stubId}`).replaceWith($(self.control));
                try {
                    self.autocomplete = new google.maps.places.Autocomplete(
                        $(this.control).get(0) as HTMLInputElement,
                        {types: ["(cities)"]});
                    // when the user selects an address from the dropdown
                    google.maps.event.addListener(self.autocomplete, "place_changed", self.onChange.bind(self));
                }catch (e) {
                    console.log("Google autocomplete loading failed");
                    console.log(e);
                }
            }
        });
    }

    public text() {
        return $(this.control).text();
    }

    public city(): string | undefined {
        return this.state.city;
    }

    public dispose() {
        this.autocomplete.removeListener("place_changed", this.onChange);
    }

    private onChange() {
        const self = this;
        self.state.city = undefined;
        const place = self.autocomplete.getPlace();
        if (place && place.address_components) {
            const localities = place.address_components
            .filter((ac) => ac.types && ac.types.indexOf("locality") >= 0);
            if (localities.length > 0) {
                const cityName = localities[0].long_name;
                self.state.city = cityName;
                if (self.props.onCitySelect !== undefined) {
                    self.props.onCitySelect(cityName);
                }
            }
        }
    }
}
