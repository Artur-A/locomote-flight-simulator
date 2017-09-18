import ActionResult from "../ActionResult";

export default async function getJson<T>(uri: string): Promise<ActionResult<T>> {
    try {
        const result: Response = await fetch(uri);
        if (result.status === 200) {
            const json = await result.json();
            return { type: "success", value: json } ;
        } else {
            return { type: "error", errors: ["An error occured. Please try refresh the page."]};
        }
    } catch (e) {
        console.error(e);
        return { type: "error", errors: ["An error occured. Please try refresh the page."]};
    }
}
