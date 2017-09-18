import * as rp from "request-promise";

export default async function getAirlines() {
  return rp(
    {
      headers: { Accept: "application/json"},
      json: true,
      uri: "http://node.locomote.com/code-task/airlines",
    });
}
