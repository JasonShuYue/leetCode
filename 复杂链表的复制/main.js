/*
    题目描述：
        输入一个复杂链表（每个节点中有节点值，以及两个指针，一个指向下一个节点，另一个特殊指针指向任意一个节点），
    返回结果为复制后复杂链表的head。（注意，输出结果中请不要返回参数中的节点引用，否则判题程序会直接返回空）

    思路：
        （1）复制「原链表」的每一个节点，并插入到其后。
        （2）将复制节点的「随机节点」执行其复制后正确的位置。
        （3）将「原链表」和「复制链表」拆分，然后返回「复制链表」。
 */

var arr = [];

function Insert(num)
{
    // write code here
    arr.push(num);
}
function GetMedian(){
    // write code here
    arr = arr.sort(function(a,b) {
        return a - b;
    });

    let len = arr.length;

    let index = Math.floor((len) / 2);
    let result = len % 2 === 1 ? arr[index] : (arr[index] + arr[index - 1]) / 2;
    return result;
}