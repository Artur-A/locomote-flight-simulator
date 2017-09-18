import * as $ from "jquery";

export default function errorList(errors: string[]): JQuery.Node[] {
    return $.parseHTML(
        `<div class="error-list">
            ${ errors.map((error) => `
                <div class="alert alert-danger" role="alert">
                    <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
                    ${error}
                </div>`).join("")}
        </div>`);
}
