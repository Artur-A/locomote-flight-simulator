import { Response } from "express";

const requestPromiseToExpress = (pm: Promise<any>, res: Response) => {
    pm
    .then((json) => res.status(200).json(json))
    .catch((err) => console.log(err));
};

export default requestPromiseToExpress;
