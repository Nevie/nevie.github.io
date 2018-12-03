export class GetRequest{
    static async executeQuery(query) {
        let response = await fetch(query);
        return response.ok ? response.json() : Promise.reject(response.statusText);
    }
}


