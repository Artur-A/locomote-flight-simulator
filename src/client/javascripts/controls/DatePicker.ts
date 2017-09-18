import * as $ from "jquery";

interface IDatePickerProps {
    stubId: string;
    minDate?: Date;
}
export default class DatePicker {
    private datepicker;
    private readonly control: JQuery.Node[];

    constructor(readonly props: IDatePickerProps) {
        this.control = $.parseHTML(
            `<div class="input-group date" id="${props.stubId}">
                <input type="text" class="form-control" />
                <span class="input-group-addon">
                    <span class="fa fa-calendar"></span>
                </span>
            </div>`);
    }

    public render() {
        const self = this;
        $().ready(() => {
            $(`#${self.props.stubId}`).replaceWith($(self.control));
            self.datepicker = ($(`#${self.props.stubId}`) as any).datetimepicker({
                defaultDate: self.props.minDate,
                format: "DD.MM.YYYY",
                keepOpen: true,
                minDate: self.props.minDate,
            });
        });
    }

    public getDate(): Date | undefined {
        return this.datepicker !== undefined ? this.datepicker.data("DateTimePicker").date().toDate() : undefined;
    }
}
