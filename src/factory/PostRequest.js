import {RequestsType} from "../models/RequestsTypes";

export class PostRequest{
    static async executeQuery(query,headers, data) {
        let response = await fetch(query,
            {
                headers: headers,
                method: RequestsType.POST,
                body: JSON.stringify(data)
            });
        return response.ok ? response.json() : Promise.reject(response.status);
    }
}