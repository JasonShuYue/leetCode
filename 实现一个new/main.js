
// 手动实现一个new关键字功能的函数_new(func, args) -> new fun(args);
function _new(func, ...args) {
    if(typeof func !== 'function') {
        throw new TypeError('not a function');
    }

    let obj = Object.create(func.prototype); // 以func的原型对象创建一个新对象。
    let result = func.call(obj, ...args);
    if(result !== null && (typeof result === 'object' || typeof result === 'string')) {
        return result;
    }
    return obj;
}