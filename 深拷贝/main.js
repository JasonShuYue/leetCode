

function deepCopy(obj) {
    let result;

    if(typeof obj === 'object') { // 复杂数据类型
        result = obj.constructor === Array ? [] : {};
        for(let key in obj) {
            result[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
        }
    } else {
        result = obj;
    }
    return result;
}

let a = {
    b: {
        c: {
            d: 123
        }
    },
    say: function() {
        console.log('sing')
    }
};

let a1 = deepCopy(a)
a1.say = function() {
    console.log(123)
};


console.log(a1)