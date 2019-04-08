/*
    题目描述：
        如何得到一个数据流中的中位数？如果从数据流中读出奇数个数值，那么中位数就是所有数值排序之后位于中间的数值。
    如果从数据流中读出偶数个数值，那么中位数就是所有数值排序之后中间两个数的平均值。我们使用Insert()方法读取数据流，
    使用GetMedian()方法获取当前读取数据的中位数。

    思路：
        每次GetMedian时，先排序，然后如果arr长度是奇数，则返回中间那个数字，如果是偶数则返回中间2个数的平均值。
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