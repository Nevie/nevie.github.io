import {RequestsType} from "../models/RequestsTypes";

export class PutRequest {
    static async executeQuery(query, args = {}) {
        const requestArgs = {
            ...args,
            method: RequestsType.PUT
        };
        let response = await fetch(query, requestArgs);
        return response.ok ? response.json() : Promise.reject(response.status);
    }
}