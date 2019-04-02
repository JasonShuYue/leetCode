/*
    题目描述：
    写一个函数，求两个整数之和，要求在函数体内不得使用+、-、*、/四则运算符号。

    思路：
        1. 用按位「与运算」来确定两数的进位1的位置，结果需要左移1位，表示进位后的结果，记为carry。
        2. 用按位「异或运算」来确定两数不需要进位1的位置，结果表示非进位符相加的结果, 记为sum。
        3. 将sum赋值给num1，carry赋值给num2，重复第1，2步，直到num2为0(表示不再有进位)
 */

function sum(num1, num2) {
    let sum, carry;
    while(num2 !== 0) {
        sum = num1 ^ num2;
        carry = (num1 & num2) << 1;
        num1 = sum;
        num2 = carry
    }
    return num1;
}

console.log(sum(3,5))


