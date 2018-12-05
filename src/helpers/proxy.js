export function traceMethodCalls(obj) {
    const handler = {
        get(target, propKey, receiver) {
            const targetValue = Reflect.get(target, propKey, receiver);
            if (typeof targetValue === 'function') {
                return function (...args) {
                    console.log('CALL', propKey, args);
                    return targetValue.apply(this, args);
                }
            } else {
                return targetValue;
            }
        }
    };
    return new Proxy(obj, handler);
}