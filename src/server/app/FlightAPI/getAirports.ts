import * as rp from "request-promise";

export default async function getAirports(city: string) {
  return rp(
  {
    headers: { Accept: "application/json"},
    json: true,
    qs: {q: city || ""},
    uri: "http://node.locomote.com/code-task/airports",
  });
}

