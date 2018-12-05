import {RequestsType} from "../models/RequestsTypes.js";
import {GetRequest} from "./GetRequest";
import {PostRequest} from "./PostRequest";
import {PutRequest} from "./PutRequest";

export class HTTPRequestFactory {
    static requestService(requestsType) {
        let requestQuery;
        switch (requestsType) {
            case RequestsType.GET:
                requestQuery = GetRequest.executeQuery;
                break;
            case RequestsType.POST:
                requestQuery = PostRequest.executeQuery;
                break;
            case RequestsType.PUT:
                requestQuery = PutRequest.executeQuery;
                break;
        }
        return requestQuery;
    }
}