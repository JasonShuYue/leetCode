/*
    题目描述：
        编写一个函数，输入是一个无符号整数，返回其二进制表达式中数字位数为 ‘1’ 的个数.

    思路：
        运用一个技巧「X & (X - 1)」,可以使得X转化的二进制数中最后一个'1'删除，比如本来是「0110」转换为「0100」
 */


var hammingWeight = function(n) {
    let count = 0;
    while(n !== 0) {
        count++;
        n = n & (n - 1);
    }
    return count;
}

