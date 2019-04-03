/*
    题目描述：
        地上有一个m行和n列的方格。一个机器人从坐标0,0的格子开始移动，
    每一次只能向左，右，上，下四个方向移动一格，但是不能进入行坐标和列坐标的数位之和大于k的格子。
    例如，当k为18时，机器人能够进入方格（35,37），因为3+5+3+7 = 18。但是，它不能进入方格（35,38），
    因为3+5+3+8 = 19。请问该机器人能够达到多少个格子？

    思路：
        考察的是「回溯思想」。
        情况一：我一开始的想法就是遍历对每个小格子进行判断是否符合要求，单独写一个「isOk」函数来判断「行坐标和列坐标的数位之和大于k」，
    这个限制条件。（但是有bug）就是如果「只有一行或者一列」的时候，遇到第一个不合适的坐标就要终止函数。
        情况二：在「情况一」的基础上，增加了「只有一行或者一列」的处理，就是正确结果了。
        情况三：
            (1) 从(0,0)开始走，每成功走一步，就把当前坐标的visited标记为true,然后从当前坐标向四个方向进行探索，
                返回 1 + 4个方向探索值之和
            (2) 探索时的标准是：
                1）当前坐标还在矩阵内
                2）当前节点未被访问过
                3）当前节点满足「limit」限制


 */


// 情况一: 有bug，在「只有一行或者一列」的时候出错
function movingCount(threshold, rows, cols) {
    let result = 0; // 用于记录符合要求的坐标数
    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < cols; j++) {
            // 遍历每行每列的坐标
            if(isOk(i, j, threshold)) {
                result += 1;
            }
        }
    }
    return result;
}

// 情况二: 「判断函数不变」, 但是在遍历的时候考虑「只有一列或者只有一列」的情况
function movingCount(threshold, rows, cols) {
    let result = 0; // 用于记录符合要求的坐标数
    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < cols; j++) {
            // 遍历每行每列的坐标
            if(rows === 1 || cols === 1) { // 当是「只有一行或者一列」的时候，遇到第一个不符合要求的坐标就返回结果
                if(isOk(i, j, threshold)) {
                    result += 1;
                } else {
                    return result;
                }
            } else {
                if(isOk(i, j, threshold)) {
                    result += 1;
                }
            }
        }
    }
    return result;
}

// 判断函数，判断当前坐标是否符合要求
function isOk(rows, cols, threshold) {
    let value = rows.toString() + cols.toString();

    let sum = value.split('').reduce((a, b) => {
        return parseInt(a) + parseInt(b);
    })

    return sum < threshold ? true : false;
}

// 情况三:

function movingCount(threshold, rows, cols) {
    let visited = [];
    //初始化visited二维数组，全部置为「false」
    for(let i = 0; i < rows; i++) {
        visited[i] = [];
        for(let j = 0; j < cols; j++) {
            visited[i][j] = false;
        }
    }
}

function moveCount(threshold, rows, cols, row, col, visited) {
    if(row < 0 || row >= rows || col < 0 || col >= cols || !isOk(row, col) || visited[row][col] === true) {
        return 0;
    }
    visited[row][col] = true;
    return 1 + moveCount(threshold, rows, cols, row - 1, col, visited)
            + moveCount(threshold, rows, cols, row + 1, col, visited)
            + moveCount(threshold, rows, cols, row, col + 1, visited)
            + moveCount(threshold, rows, cols, row, col - 1, visited)
}


