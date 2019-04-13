// on监听事件，off取消事件，trigger触发事件，once只执行一次

class Event {

    constructor() {
        this.handlers = {}; // 记录所有的事件及处理函数
        /**
        *  {
        *       click: [f1, f2],
        *       mouseover: [f3, f5];
        *  }
        *
        **/
    }

    /**
     * on   添加监听事件
     * @param type: 事件类型
     * @param handler: 事件处理函数
     * @param once:
     */
    on(type, handler, once = false) {
        if(!this.handlers[type]) {
            this.handlers[type] = [];
        }

        if(!this.handlers[type].includes(handler)) {
            this.handlers[type].push(handler);
            handler.once = once;
        }
    }

    /**
     * off  取消事件监听
     * @param type, 要取消的事件类型
     * @param handler, 要取消的事件函数
     */
    off(type, handler) {
        if(this.handlers[type]) {
            let index = this.handlers[type].indexOf(handler);
            this.handlers[type].splice(index, 1);
        }
    }

    /**
     * trigger  执行函数
     * @param type: 要执行哪个类型的函数
     * @param data:
     */
    trigger(type, data = {}) {
        if(this.handlers[type]) {
            this.handlers[type].map(fn => {
                fn(data)
                if(fn.once) {
                    this.off(type, fn);
                }
            })
        }
    }

    /**
     * once 只执行一次
     * @param type: 事件类型
     * @param handler: 要执行的函数
     */
    once(type, handler) {
        this.on(type, handler, true);
    }
}