/*
    题目描述：
        实现Pow(x, n)

    思路：
        (1)用库函数，「Math.pow」
        (2)暴力循环法
        (3)求Pow(x,n)，我们可以先求 y = Pow(x, n / 2), 然后最后y*y，这里对n「一分为二」就要考虑「奇偶数」.

 */

function myPow(x, n) {
    // 先处理边界问题
    if(n === 0) return 1;
    if(n === 1) return x;
    if(n < 0) return 1 / myPow(x, -n);

    if(n % 2) {
        return x * myPow(x * x, (n - 1) / 2);
    } else {
        return myPow(x * x, n / 2);
    }
}

