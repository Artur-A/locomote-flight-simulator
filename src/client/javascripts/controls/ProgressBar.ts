import * as $ from "jquery";

export default class ProgressBar {
    public readonly control: JQuery.Node[] = $.parseHTML(
        `<div class="text-center">
            <img src="/images/progress-loader.svg">
        </div>`);

    public show() {
        $(this.control).show();
    }

    public hide() {
        $(this.control).hide();
    }
}
