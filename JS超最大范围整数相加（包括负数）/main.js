function add(a, b) {

    let fz = 1; // 此变量判断两者是相加还是相减，1表示相加，0表示相减
    let minus = 1; // 这个变量是为了判断'-'号是在a上，还是在b上， 1表示在a上，0表示在b上
    let finalFz = 1; // 这个变量是为了判断最后的值是否带'-'；

    if(a.indexOf('-') >= 0) {
        a = a.slice(1);
        fz = !fz;
        minus = 1;
    }

    if(b.indexOf('-') >= 0) {
        b = b.slice(1);
        fz = !fz;
        minus = 0;
    }

    let len1 = a.length;
    let len2 = b.length;
    let len = len1 <= len2 ? len2 : len1;
    let max = a, min = b; // 初始化max，min


    // 补位0
    for(let i = 0; i < Math.max(len1, len2) - Math.min(len1, len2); i++) {
        if(len1 < len2) {
            a = '0' + a;
        } else {
            b = '0' + b;
        }
    }
    console.log(a)
    console.log(b)
    console.log('-------')

    let arr = new Array(len).fill(0);

    if(fz) { // 如果为「加法」
        a = a.split('').reverse();
        b = b.split('').reverse();
        for(let i = 0; i < len; i++) {
            let value = parseInt(a[i]) + parseInt(b[i]) + arr[i];
            if(value > 9) {
                value -= 10;
                arr[i+1] = 1;
            }
            arr[i] = value;
        }
        return arr.reverse().join('');
    } else {
        // 如果为「减法」
        // 先判断两个字符串的大小
        // console.log(a)
        // console.log(b)

        a = a.split('');
        b = b.split('');
        for(let i = 0; i < len; i++) {
            if(a[i] > b[i]) {
                max = a;
                min = b;
                break;
            }
            if(a[i] < b[i]) {
                max = b;
                min = a;
                break;
            }
        } //经过这次循环就找出a，b的大小，就算两者相等，我们在初始化的时候也默认设置了max和min

        if(max === a && minus === 1) {
            finalFz = 1; // 表示'-'在max上
        } else {
            finalFz = 0;
        }

        max = max.reverse();
        min = min.reverse();

        for(let i = 0; i < len; i++) {
            let value = parseInt(max[i]) - parseInt(min[i]) + arr[i];
            if(value < 0) {
                value += 10;
                arr[i + 1] = -1;
            }
            arr[i] = value;
        }
        let final = arr.reverse().join('');
        console.log(final)

        // 我们先把头部的0去除，这里其实应该用「正则」更方便，只不过暂时不会
        while(final.indexOf('0') === 0) {
            let index = final.indexOf('0');
            final = final.slice(index + 1);
        }
        if(final === '') {
            // 如果为空则表明，final之前全部是'0';
            return '0';
        } else {
            return finalFz ? '-' + final : final;
        }
    }
}

let a = '-399873';
let b = '399872';


console.log(add(a, b))