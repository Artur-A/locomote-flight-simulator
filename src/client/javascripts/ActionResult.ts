type ActionResult<T> = { type: "success", value: T } | { type: "error", errors: string[] };

export default ActionResult;
