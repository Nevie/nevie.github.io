import {RequestsType} from "../models/RequestsTypes";

export class PutRequest{
  static async executeQuery(query, opts) {
        let response = await fetch(query,{
            method: RequestsType.POST,
            body: JSON.stringify(opts)
        });
        return response.ok ? response.json() : Promise.reject("");
    }
}