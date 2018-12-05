export class BaseView {
    events = new Map();

    subscribe(eventName, callback) {
        this.events.set(eventName, callback);
    }

    dispatch(eventName, ...args) {
        const callback = this.events.get(eventName);
        if (callback) {
            callback(...args);
        }
    }

    draw(){};
}