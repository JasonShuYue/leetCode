

Function.prototype.bind = function(context, ...bindArgs) {
    context = context || window;
    // this是调用bind的原函数
    const func = this;

    if(typeof func !== 'function') {
        throw new TypeError('not a function');
    }

    // bind返回一个绑定this的函数
    return function(...callArgs) {
        let args = bindArgs.concat(callArgs);
        if(this instanceof func) {
            // 意味着是通过new调用的，而new的优先级高于bind
            return new func(...args);
        }
        return func(...args);
    }
}

// 通过隐式绑定实现
Function.prototype.call = function(context, ...callArgs) {
    context = context || window;
    context.func = this;
    if(typeof context.func !== 'function') {
        throw new TypeError('not a function');
    }

    let result = context.func(...callArgs);
    delete context.func;
    return result;
}

Function.prototype.apply = function(context, ...callArgs) {
    context = context || window;
    context.func = this;
    if(typeof context.func !== 'function') {
        throw new TypeError('not a function');
    }

    let result = context.func(...callArgs);
    delete context.func;
    return result;
}