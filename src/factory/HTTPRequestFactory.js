import {RequestsType} from "../models/RequestsTypes.js";
import {GetRequest} from "./GetRequest";
import {PostRequest} from "./PostRequest";
import {PutRequest} from "./PutRequest";

export class HTTPRequestFactory {
    static requestService(requestsType) {
        let service;
        switch (requestsType) {
            case RequestsType.GET:
                service = GetRequest.executeQuery;
                break;
            case RequestsType.POST:
                service = PostRequest.executeQuery;
                break;
            case RequestsType.PUT:
                service = PutRequest.executeQuery;
                break;
        }
        return service;//new Proxy(obj, handler);
    }
}