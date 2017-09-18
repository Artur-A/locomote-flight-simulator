import * as $ from "jquery";
import flightSearch from "./api/flightSearch";
import getAirports from "./api/getAirports";
import Search from "./components/search";

$().ready(() => {
    const control = $.parseHTML(
        `<div class="container-fluid flight-search-container">
            <h4 class="text-center">Where do you want to go?</h4>
            <div id="search_stub"></div>
        </div>`);
    $("#main_stub").replaceWith($(control));
    const search = new Search({flightSearch, getAirports, stubId: "search_stub"});
    search.render();
});

