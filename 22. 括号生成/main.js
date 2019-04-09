/*
    题目描述：
            给出 n 代表生成括号的对数，请你写出一个函数，使其能够生成所有可能的并且有效的括号组合。
        例如，给出 n = 3，生成结果为：

            [
              "((()))",
              "(()())",
              "(())()",
              "()(())",
              "()()()"
            ]

    思路：
        「回溯算法」，给出n, 那么数组长度是2*n（就是2*n个格子），如果是暴力枚举，每个格子可以放「(」或者「)」，那么时间复杂度O(2^2n)
    但是我们可以在这个基础上优化（剪枝），就是为了找到符合要求的组合，
        （1）必然是左右括号各n个（这是第一条枝，也是递归的终止条件）。
        （2）如果「局部不合法」了，直接终止，进行下一轮判断。比如第一个符号就是「)」

 */

var generateParenthesis = function(n) {
    let list = [];

    _gen(0, 0, n, '');

    return list;

    function _gen(left, right, n, result) {
        // left: 左括号个数
        // right: 右括号个数
        // result: 当前括号组合
        if(left === n && right === n) {
            // 终止条件，然后把组合好的结果放到list数组中
            list.push(result);
            return;
        }

        if(left < n) { // 左括号个数没到n
            _gen(left + 1, right, n, result + '(');
        }

        if(right < n && right < left) { // 右括号个数没有到n，还多一个判断，「右括号个数要小于左括号个数」
            _gen(left, right + 1, n, result + ')');
        }
    }
}
