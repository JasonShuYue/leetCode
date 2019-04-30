
// 手动实现一个Promise类，并且有「then」，「race」，「all」， 「resolve」，「reject」， 「catch」功能

function Promise(executor) {

    let self = this;

    // 初始化status
    self.status = 'pending';
    // 初始化value
    self.value = undefined;

    // 初始化订阅事件
    self.onResolvedCallBacks = [];
    self.onRejectedCallBacks = [];

    // 此函数将Promise实例的状态由「pending」转为「fulfilled」
    function resolve(value) {
        if(self.status === 'pending') {
            setTimeout(function() {
                self.status = 'fulfilled';
                self.value = value;
                self.onResolvedCallBacks.forEach(fn => {
                    fn(self.value);
                })
            }, 0)
        }
    }

    // 此函数将Promise实例的状态由「pending」转为「rejected」
    function reject(reason) {
        if(self.status === 'pending') {
            setTimeout(function() {
                self.status = 'rejected';
                self.value = reason;

                self.onRejectedCallBacks.forEach(fn => {
                    fn(self.value);
                })
            }, 0);
        }
    }

    try {
        executor(resolve, reject);
    } catch(e) {
        reject(e);
    }

}


Promise.prototype.then = function(onFulFilled, onRejected) {
    // 不传值的话默认是一个返回原值的函数
    onFulFilled = typeof onFulFilled === 'function' ? onFulFilled : function(val) { return val; };
    onRejected = typeof onRejected === 'function' ? onRejected : function(err) { throw err; };

    let self = this;

    if(self.status === 'fulfilled') {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                try {
                    let x = onFulFilled(self.value);
                    if(x instanceof Promise) {
                        x.then(resolve);
                    } else {
                        resolve(x)
                    }
                } catch(e) {
                    reject(e)
                }
            }, 0);
        });
    }

    if(self.status === 'rejected') {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                try {
                    let x = onRejected(self.value);
                    if(x instanceof Promise) {
                        x.then(resolve);
                    } else {
                        resolve(x)
                    }
                } catch(e) {
                    reject(e)
                }
            }, 0);
        });
    }

    if(self.status === 'pending') {
        return new Promise(function(resolve, reject) {

            self.onResolvedCallBacks.push(function(val) {
                try {
                    let x = onFulFilled(val);
                    if(x instanceof Promise) {
                        x.then(resolve);
                    } else {
                        resolve(x);
                    }
                } catch(e) {
                    reject(e);
                }
            });

            self.onRejectedCallBacks.push(function(val) {
                try {
                    let x = onRejected(val);
                    if(x instanceof Promise) {
                        x.then(resolve);
                    } else {
                        resolve(x);
                    }
                } catch(e) {
                    reject(e);
                }
            });

        })
    }
}

Promise.prototype.catch = function(onRejected) {
    return this.then(null, onRejected);
}

Promise.all = function(promises) {
    return new Promise(function(resolve, reject) {
        let count = 0;
        let result = [];

        for(let i = 0; i < promises.length; i++) {
            promises[i].then(function(val) {
                result.push(val);
                if(count++ === promises.length) {
                    resolve(result);
                }
            }, err => {
                reject(err);
            })
        }
    });
}

Promise.race = function(promises) {
    return new Promise(function(resolve, reject) {
        for(let i = 0; i < promises.length; i++) {
            promises[i].then(resolve, reject);
        }
    })
}

Promise.resolve = function(val) {
    return new Promise(function(resolve, reject) {
        resolve(val);
    })
}

Promise.reject = function(err) {
    return new Promise(function(resolve, reject) {
        reject(err);
    })
}

