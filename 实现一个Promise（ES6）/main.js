

// 实现一个「判断是否为函数」的方法

function isFunction(obj) {
    return typeof obj === 'function' ? true : false;
}

class MyPromise {

    constructor(executor) {

        if(!isFunction(executor)) {
            throw new Error('MyPromise must accept a function as a parameter');
        }

        // 添加状态
        this.status = 'pending';

        // 添加值
        this.value = undefined;

        // 添加成功回调函数
        this._fulfilledQueues = [];

        // 添加失败回调函数
        this._rejectedQueues = [];

        try {
            executor(this._resolve.bind(this), this._reject.bind(this));
        } catch(e) {
            this._reject(e);
        }

    }

    // 添加resolve时执行的函数，我们依次提取成功或者失败任务队列当中的函数开始执行，并清空队列，
    // 从而实现「then」方法的多次调用
    _resolve(val) {
        const run = () => {
            if(this._status === 'pending') {

                // 依次执行成功队列中的回调函数，并清空队列
                const runFulfilled = (value) => {
                    let cb;
                    while(cb = this._fulfilledQueues.pop()) {
                        cb(value);
                    }
                };

                // 依次执行失败队列中的回调函数，并清空队列
                const runRejected = (err) => {
                    let cb;
                    while(cb = this._rejectedQueues.pop()) {
                        cb(err);
                    }
                };

                // 如果「resolve」的参数为「MyPromise」对象，则必须等待该「MyPromise」对象状态改变后，
                // 当前「MyPromise」的状态才会改变，且状态取决于参数「MyPromise」对象的状态
                if(val instanceof MyPromise) {
                    val.then(val => {
                        this._status = 'fulfilled';
                        this._value = val;

                        runFulfilled(val);
                    }, err => {
                        this._value = err;
                        this._status = 'rejected';

                        runRejected(err);
                    });
                } else {
                    this._value = val;
                    this._status = 'fulfilled';
                    runFulfilled(val);
                }




            }
        }

        // 为了支持同步的「MyPromise」，这里采用异步调用
        setTimeout(() => {
            run();
        }, 0);
    }

    _reject(err) {
        if(this.status === 'pending') {

            const run = () => {
                this._status = 'rejected';
                this._value = err;

                let cb;

                while(cb = this._rejectedQueues.shift()) {
                    cb(err)
                }
            }

            setTimeout(() => run(), 0);

        }
    }


    // then方法返回一个MyPromise对象，且新的MyPromise对象的状态是由当前「then」方法回调函数执行的状况以及「返回值」决定的
    // 例如：「then」的参数是否为一个函数、执行回调函数是否出错、返回值是否为「MyPromise」对象
    then(onFulfilled, onRejected) {
        const {_status, _value} = this;


        // 返回一个MyPromise对象
        return new MyPromise((onFulfilledNext, onRejectedNext) => {

            // 封装一个成功时执行的函数
            let fulfilled = (val) => {
                try {
                    if(!isFunction(onFulfilled)) {
                        // 如果val不是函数，则忽略当前的「onFulfilled」
                        onFulfilledNext(val);
                    } else {
                        let res = onFulfilled(val);
                        if(res instanceof MyPromise) {
                            // 如果当前回调函数(onFulfilled)返回一个MyPromise对象，必须等待其状态改变后，再执行下一个回调函数
                            res.then(onFulfilledNext, onRejectedNext);
                        } else {
                            onFulfilledNext(val);
                        }
                    }
                } catch(e) {
                    onRejected(e);
                }
            }

            // 封装一个失败时执行的函数
            let rejected = (err) => {
                try {
                    if(!isFunction(onRejected)) {
                        onRejectedNext(err);
                    } else {
                        let res = onRejected(err);
                        if(res instanceof MyPromise) {
                            // 如果当前回调函数(onRejected)返回一个MyPromise对象，必须等待其状态改变后，再执行下一个回调函数
                            res.then(onFulfilledNext, onRejectedNext);
                        } else {
                            onRejectedNext(res);
                        }
                    }
                } catch(e) {
                    onRejectedNext(e);
                }
            }

            switch(_status) {
                case 'pending':
                    this._fulfilledQueues.push(fulfilled);
                    this._rejectedQueues.push(rejected);
                    break;
                case 'fulfilled':
                    fulfilled(_value);
                    break;
                case 'rejected':
                    rejected(_value);
                    break;
            }

        });
    }

    // 相当于调用「then」方法，但只传入「Rejected」状态的回调函数
    catch(onRejected) {
        return this.then(undefined, onRejected);
    }

    // 静态「resolve」方法
    static resolve(value) {
        // 如果参数是「MyPromise」的实例，直接返回这个实例
        if(value instanceof MyPromise) return value;
        return new MyPromise(resolve => resolve(value));
    }

    // 添加静态「reject」方法
    static reject(value) {
        return new MyPromise((resolve, reject) => reject(value));
    }

    // 添加静态「all」方法
    static all(list) {
        return new MyPromise((resolve, reject) => {
            let values = [];
            let count = 0;

            for(let [i, p] of list.entries()) {
                // 数组参数如果不是「MyPromise」实例，先调用MyPromise.resolve
                this.resolve(p).then(res => {
                    values[i] = res;
                    count++;
                    // 所有状态都变成「fulfilled」时返回的「MyPromise」状态就变成「fulfilled」
                    if(list.length === count) {
                        resolve(values);
                    }
                }, err => {
                    reject(err)
                })
            }
        })
    }

    // 添加静态「race」方法
    static race(list) {
        return new MyPromise((resolve, reject) => {
            for(let p of list) {
                // 只要有一个实例率先改变状态，新的「MyPromise」的状态就改变
                this.resolve(p).then(res => {
                    resolve(res)
                }, err => {
                    reject(err)
                })
            }
        })
    }

    // 添加「finally」方法， 不管「MyPromise」对象最后的状态如何，都会执行操作
    finally(cb) {
        return this.then(
            value => MyPromise.resolve(cb()).then(() => value),
            reason => MyPromise.reject(cb()).then(() => {throw reason})
        )
    };
}