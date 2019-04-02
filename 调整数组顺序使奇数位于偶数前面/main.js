/*
    题目描述：
    输入一个整数数组，实现一个函数来调整该数组中数字的顺序，
    使得所有的奇数位于数组的前半部分，所有的偶数位于数组的后半部分，
    并保证奇数和奇数，偶数和偶数之间的相对位置不变。

    思路：我的第一想法是「稳定排序」，因为说「保证奇数和奇数，偶数和偶数之间的相对位置不变」，所以考虑了「插入排序」，
    但是中间会有一个判断条件，就是遍历后半段元素的时候，如果是偶数就过，目的就是「把后半段元素中的奇数放到前半段合适的位置」
 */


function NumberOf1Between1AndN_Solution(n)
{
    // write code here
    let result = 0;
    for(let i = 1; i <= n; i++) {
        let string = i.toString();
        while(string.indexOf('1') >= 0) {
            result += 1;
            let index = string.indexOf('1');
            string = string.slice(index + 1);
        }
    }

    return result;
}