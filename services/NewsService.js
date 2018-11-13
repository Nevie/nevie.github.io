//const apiKey="6a047c3c1bc14dae8aa1f9cb4c3ade31";
import {Error} from "../view/Error.js";

const apiKey = "efb168365ee44a1dae2892cab1746f77";

export class NewsService {
    getData(url) {
        const path = url + 'apiKey=' + apiKey;
        return fetch(path)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    Error.drawDataError();
                }
            })
            .catch(function (error) {
                Error.drawDataError();
            });
    }
}