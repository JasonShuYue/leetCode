/*
    题目描述：
        请设计一个函数，用来判断在一个矩阵中是否存在一条包含某字符串所有字符的路径。路径可以从矩阵中的任意一个格子开始，
    每一步可以在矩阵中向左，向右，向上，向下移动一个格子。如果一条路径经过了矩阵中的某一个格子，则之后不能再次进入这个格子。
    例如 a b c e s f c s a d e e 这样的3 X 4 矩阵中包含一条字符串"bcced"的路径，但是矩阵中不包含"abcb"路径，因为字符串
    的第一个字符b占据了矩阵中的第一行第二个格子之后，路径不能再次进入该格子。

    思路：「回溯法」
    （1）给定一个visited数组，作为「标志数组」，如果visited[i][j] = 1，表示此坐标已经被访问，则不能再次访问。
    （2）遍历每行和每列，先找到一个与path字符串的第一个元素相匹配的矩阵元素，进入find
    （3）根据i和j先确定一维数组的位置，因为「matrix」是一维数组。
    （4）确定递归终止条件：越界，当前找的矩阵值不等于数组对应位置的值，已经走过的，这三类情况，都直接返回「false」，说明这条路不通。
    （5）若「k === path.length - 1」，表示已经匹配到path的最后一位了，返回「true」。在此之前，如果当前坐标的值符合要求，则把当前的
        visited[i][j]置为1，表示已经走过。
    （6）递归不断地寻找周围的格子是否符合要求，只要有一个格子符合要求，就继续从这个「符合要求的格子」向四周寻找符合要求的格子，
        直到「k === path.length - 1」或者「不符合要求」就停止了。
    （7）如果第（6）步未执行，则表示第（5）步找的「符合要求的格子」其实是不成功的，就要还原下第（5）步中的visited[i][j],变为0，然后进行
        下一轮判断。

 */

function hasPath(matrix, rows, cols, path) {
    // 初始化visited
    let visited = [];
    for(let i = 0; i < rows; i++) {
        visited[i] = [];
        for(let j = 0; j < cols; j++) {
            visited[i][j] = 0;
        }
    }

    // 遍历每行每列的坐标，看看是否符合要求
    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < cols; j++) {
            if(find(matrix, rows, cols, i, j, path, 0, visited)) { // 从0开始判断，这个0表示path字符串的位数。
                return true;
            }
        }
    }

    return false;
}

function find(matrix, rows, cols, i, j, path, k, visited) {
    // matrix: 矩阵字符串， rows: 行数， cols: 列数
    // i：当前坐标行数， j: 当前坐标列数， path: 目标匹配字符串
    // k：当前匹配到目标字符串的位数， visited：记录是否访问过的标志数组

    let index = i * cols + j;
    // 越界、当前找的矩阵值不等于数组对应位置的值、已经走过的，三种「不符合要求」的情况
    if(i < 0 || i >= rows || j < 0 || j >= cols || matrix[index] !== path[k] || visited[i][j] === 1) {
        return false;
    }

    if(k === path.length - 1) {
        return true;
    }

    visited[i][j] = 1;

    if(
        find(matrix, rows, cols, i - 1, j, path, k + 1, visited) || // 向上寻找
        find(matrix, rows, cols, i + 1, j, path, k + 1, visited) || // 向下寻找
        find(matrix, rows, cols, i, j - 1, path, k + 1, visited) || // 向左寻找
        find(matrix, rows, cols, i, j + 1, path, k + 1, visited)    // 向右寻找
    ) {
        return true;
    }

    // 如果当前k开始进行的探索的路径不符合要求，则依次把探索过的坐标，重新定义为「未走过」，即visited[i][j] = 0
    visited[i][j] = 0;

    // 否则返回false
    return false;
}

