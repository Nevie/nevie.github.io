import {RequestsType} from "../models/RequestsTypes";

export class PostRequest {
    static async executeQuery(query, args = {}) {
        const requestArgs = {
            ...args,
            method: RequestsType.POST
        };
        let response = await fetch(query, requestArgs);
        return response.ok ? response.json() : Promise.reject(response.status);
    }
}