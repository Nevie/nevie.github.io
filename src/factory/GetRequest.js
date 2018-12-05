import {RequestsType} from "../models/RequestsTypes";

export class GetRequest {
    static async executeQuery(query, args = {}) {
        const requestArgs = {
            ...args,
            method: RequestsType.GET
        };
        let response = await fetch(query, requestArgs);
        return response.ok ? response.json() : Promise.reject(response.statusText);
    }
}


