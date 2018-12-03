import {RequestsType} from "../models/RequestsTypes.js";
import {GetDataModel} from "../services/GetDataModel";
import {GetRequest} from "./GetRequest";
import {PostRequest} from "./PostRequest";
import {PutRequest} from "./PutRequest";
import {PostDataModel} from "../services/PostDataModel";
import {PutDataModel} from "../services/PutDataModel";

export class Factory {
    static requestService(requestsType) {
        let service;
        switch (requestsType) {
            case RequestsType.GET:
                service = new GetDataModel(GetRequest.executeQuery);
                break;
            case RequestsType.POST:
                service = new PostDataModel(PostRequest.executeQuery);
                break;
            case RequestsType.PUT:
                service = new PutDataModel(PutRequest.executeQuery);
                break;
        }
        return service;
    }
}