import { IFlightSearchItem } from "../../api/flightSearch";
import * as moment from "moment";

const toDateTime = (dateTime: string) =>
    `<div class="flight-item-datetime text-center">
        <div>${moment(dateTime).format("DD.MM.YYYY")}</div>
        <div>
            <i class="fa fa-clock-o" aria-hidden="true"></i>
            <span class="flight-item-datetime__time">${moment(dateTime).format("HH:mm")}</span>
        </div>
    </div>`;

const placeAndTime = (airportCode: string, dateTime: string) =>
    `<div class="flight-item-place-and-time">
        ${toDateTime(dateTime)}
        <div class="text-center">${airportCode}</div>
    </div>`;

export default function flightSearchResults(items: IFlightSearchItem[]): JQuery.Node[] {

    return $.parseHTML(`
        <div>
            ${items.map((item) =>
                `<div class="flight-item">
                    <h4 class="flight-item-header">${item.airline.name} / ${item.plane.fullName}</h4>
                    <div>
                        ${placeAndTime(item.start.airportCode, item.start.dateTime)}
                        <i class="fa fa-long-arrow-right fa-3 flight-item-arrow" aria-hidden="true"></i>
                        ${placeAndTime(item.finish.airportCode, item.finish.dateTime)}
                    </div>
                    <div class="flight-item-price">$${item.price}</div>
                </div>`).join("")}
        </div>
    `);
}
