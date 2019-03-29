/**
 * @param {number} n
 * @return {string[][]}
 */

function solveNQueens(n) {
    let result = new Array(n); // result下表表示「行」，它的值表示「列」

    function callQueen(row) { // 调用方式：callQueen(0)
        if(row === n) {
            console.log(result); // 51,52题的输出要求是在这里修改。
            return;
        }

        for(let column = 0; column < n; column++) {
            if(isOk(row, column)) { // 判断当前(row, column)值是否符合要求
                result[row] = column;   // 符合要求就赋值到result数组中
                callQueen(row + 1); // 然后进入下一行的判断
            }
        }
    }

    function isOk(row, column) { // 判断当前(row，column)值是否可以放「皇后」
        let leftUp = column - 1, rightUp = column + 1;
        for(let i = row - 1; i >= 0; i--) { // 逐行向上考察
            if(result[i] === column) return false; // 当前列上有「皇后」吗？
            if(leftUp >= 0) {
                if(result[i] === leftUp) return false; // 左上角有「皇后」吗？
            }
            if(rightUp < n) {
                if(result[i] === rightUp) return false; // 右上角有「皇后」吗？
            }
            leftUp--;
            rightUp++;
        }
        return true;
    }

    callQueen(0);
}

solveNQueens(4)