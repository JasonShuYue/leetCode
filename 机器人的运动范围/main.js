
/**
 *  题目描述：
 *      地上有一个m行和n列的方格。一个机器人从坐标0,0的格子开始移动，每一次只能向左，右，上，下四个方向移动一格，
 *  但是不能进入行坐标和列坐标的数位之和大于k的格子。 例如，当k为18时，机器人能够进入方格（35,37），因为3+5+3+7 = 18。
 *  但是，它不能进入方格（35,38），因为3+5+3+8 = 19。请问该机器人能够达到多少个格子？
 *
 *  思路：
 *      「回溯法」
 *
 * **/

function movingCount(threshold, rows, cols)
{
    // write code here
    var visited = [];
    for(var i = 0; i < rows; i++) {
        visited[i] = [];
        for(var j = 0; j < cols; j++) {
            visited[i][j] = false;
        }
    }
    return moveCount(threshold, rows, cols, 0, 0, visited)

}

function moveCount(threshold, rows, cols, row, col, visited) {
    if(row < 0 || col < 0 || row >= rows || col >= cols || visited[row][col]) {
        return 0;
    }

    if(!isOk(row, col, threshold)) {
        return 0;
    }

    visited[row][col] = true;

    return 1 + moveCount(threshold, rows, cols, row - 1, col, visited)
        + moveCount(threshold, rows, cols, row + 1, col, visited)
        + moveCount(threshold, rows, cols, row, col - 1, visited)
        + moveCount(threshold, rows, cols, row, col + 1, visited)
}

function isOk(row, col, threshold) {
    var str = row.toString() + col.toString();
    var arr = str.split('');
    var res = arr.reduce(function(a, b) {
        return Number(a) + Number(b)
    })
    return res > threshold ? false : true;
}