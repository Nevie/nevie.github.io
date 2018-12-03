import {RequestsType} from "../models/RequestsTypes.js";
import {GetDataModel} from "../services/GetDataModel";
import {GetRequest} from "./GetRequest";

export class Factory {
    static requestService(requestsType) {
        let service;
        switch (requestsType) {
            case RequestsType.GET:
            case RequestsType.POST:
            case RequestsType.PUT:
            default:
                service = new GetDataModel(GetRequest.executeQuery);
        }
        return service;
    }
}