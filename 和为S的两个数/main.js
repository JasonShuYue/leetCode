/*
    题目描述：
        输入一个递增排序的数组和一个数字S，在数组中查找两个数，使得他们的和正好是S，
    如果有多对数字的和等于S，输出两个数的乘积最小的。

    思路：遍历数组，用temp记录两数的乘积，a记录最后两数中「小的那个数」，b记录最后两数中「大的那个数」，两个指针left，right
    每次遍历时，看「第一个数」和「最后一个数」相加是否小于sum，如果小于则可以continue过此次循环，即「剪枝」。否则right指针指向最后一个数，
    依次向左找符合要求的数字，找到后更新temp，a，b，如果没找到则a和b都为undefined，结果为[]，然后返回结果。

 */

function FindNumbersWithSum(array, sum)
{
    // write code here
    let len = array.length;
    let temp = Infinity; // 初始化temp，表示两数的乘积
    let a, b; // a, b记录最后得出的那两个数
    let left, right;    //  两个指针

    for(let i = 0; i < len; i++) {
        left = i; // 左指针
        if(array[left] + array[len - 1] < sum) { // 这是一个「剪枝」操作，如果「当前数 + 最后一个数」都「小于」sum，直接continue
            continue
        } else {
            right = len - 1; // 右指针
            while(left <= right) { // 依次把右指针往左移动，找left和right所指数相加是否为sum
                if(array[left] + array[right] === sum) { // 如果两数相加为sum
                    if(array[left] * array[right] < temp) { // 看看两数乘积是否小于之前的temp，如果小于则更新temp，a，b
                        temp =  array[left] * array[right];
                        a = array[left];
                        b = array[right];
                        break; // 找到后则break此次循环
                    } else {
                        right --;
                    }
                } else {
                    right--;
                }
            }
        }
    }
    if(a || b) {
        return [a, b];
    }
    return [];

}