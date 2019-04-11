/*
    题目描述：
        给定一个非负整数 num。对于 0 ≤ i ≤ num 范围中的每个数字 i ，计算其二进制数中的 1 的数目并将它们作为数组返回。

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

