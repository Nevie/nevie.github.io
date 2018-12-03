export function traceMethodCalls(obj) {
    let handler = {
        get(target, propKey, receiver) {
            const origMethod = target[propKey];
            return function (...args) {
                let result = origMethod.apply(this, args);
                console.log(propKey + JSON.stringify(args));
                return result;
            };
        }
    };
    return new Proxy(obj, handler);
}