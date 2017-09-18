import * as $ from "jquery";
import IKeyText from "../IKeyText";

interface ISelectProps {
    items: IKeyText[];
    stubId: string;
    onSelect?: (key: string) => void;
}
export default class Select {
    private readonly control: JQuery.Node[];

    constructor(private readonly props: ISelectProps) {
        this.control = $.parseHTML(
            `<select class="form-control">
                ${this.htmlItemsOrEmptyOne(props.items)}
            </select>`);
    }

    public getSelectedKey(): string | undefined {
        const val = ($(this.control).val() || "-").toString();
        return val === "-" ? undefined : val;
    }

    public render() {
        const self = this;
        $().ready(() => {
            $(`#${self.props.stubId}`).replaceWith($(self.control));
            self.bindSelectionChange();
        });
    }

    public setItems(items: IKeyText[]) {
        $(this.control).html("");
        $(this.control).html(this.htmlItemsOrEmptyOne(items));
        if (items.length > 0) {
            $(this.control).val(items[0].key);
        }
        this.bindSelectionChange();
    }

    private bindSelectionChange() {
        $(this.control).change(() => {
            const val = ($(this).val() || "-").toString();
            if (this.props.onSelect !== undefined && val !== "-") {
                this.props.onSelect(val);
            }
        });
    }

    private emptyItem() {
        return this.htmlItem({ key: "-", text: "-"});
    }

    private htmlItem(item: IKeyText) {
        return `<option value="${item.key}">${item.text}</option>`;
    }

    private htmlItemsOrEmptyOne(items: IKeyText[]): string {
        return items.length === 0
            ? this.emptyItem()
            : items.map(this.htmlItem).join("");
    }
}
