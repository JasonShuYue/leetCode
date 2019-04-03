// 类型判断

// 判断target类型的时候，单单用「typeof」是不够的，这其实不是bug，本质原因是JS的万物皆对象的理论。所以我们要区别对待不同类型：

// 第一类：null，使用「typeof」会返回「'object'」,我们直接用「String()」来返回判断结果
// 第二类：number, string, boolean, undefined, function,可以直接用「typeof」来判断
// 第三类：Date，RegExp, Object, Error, Array,这些可以用「Object.prototype.call(obj)」来判断，调用这个方法后会返回
// 形如[object xxx]的字符串

function type(obj) {
    // 先把第三类的各种类型集成一个hash
    let arr = ['Date', 'RegExp', 'Object', 'Array', 'Error'];
    let hash = {};
    arr.map(item => {
        let key = '[object '+ item +']';
        hash[key] = item.toLowerCase();
    });

    // 第一类：null
    if(obj === null) return String(obj);

    // 第二类：number, string, boolean, undefined, function
    if(typeof obj !== 'object') {
        return typeof obj;
    } else {
        // 第三类：如果用typeof显示都是「object」,其中主要是考察Array和Object
        let type = Object.prototype.toString.call(obj);
        return hash[type];
    }
}


let obj = new RegExp();

console.log(type(obj))
