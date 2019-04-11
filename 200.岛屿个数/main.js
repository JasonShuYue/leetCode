/*
    题目描述：
        给定一个由 '1'（陆地）和 '0'（水）组成的的二维网格，计算岛屿的数量。一个岛被水包围，
    并且它是通过水平方向或垂直方向上相邻的陆地连接而成的。你可以假设网格的四个边均被水包围。

    示例：
        输入:
            11110
            11010
            11000
            00000
        输出:
            1

    思路：
        (1) 用DFS，着色法，遇到1个'1'就将它四周（上下左右）全部置为'0'
        (2) 并查集方法
 */

// 着色法
var numIslands = function(grid) {

    if(!grid.length) return 0;

    let rows = grid.length;
    let cols = grid[0].length;

    let count = 0;
    for(let i = 0; i < rows; i ++) {
        for(let j = 0; j < cols; j++) {
            if(grid[i][j] === '1') {
                count++;
                find(grid, i, j, rows, cols);
            }
        }
    }
    return count;

    // 如果当前坐标是'1'，则把当前坐标的四周全部置'0'
    function find(grid, i, j, rows, cols) {
        if(i < 0 || j < 0 || i >= rows || j >= cols || grid[i][j] === '0') return;
        grid[i][j] = '0';
        find(grid, i + 1, j, rows, cols);
        find(grid, i - 1, j, rows, cols);
        find(grid, i, j + 1, rows, cols);
        find(grid, i, j - 1, rows, cols);

    }
}

 // 并查集
var numIslands = function(grid) {
    if(!grid.length) return 0;
    let len1 = grid.length;
    let len2 = grid[0].length;

    let uf = new UnionFind(len1 * len2);
    let zeroCount = 0;


    for(let i = 0; i < len1; i ++) {
        for(let j = 0; j < len2; j++) {
                if(grid[i][j] === '1') {
                    let index = i * len2 + j;
                    // 看index的左边和上边的节点，注意越界
                    if(j - 1 >= 0) { // 看左边的坐标
                        if(grid[i][j - 1] === '1') {
                            uf.union(index - 1, index);
                        }
                    }
                    if(i - 1 >= 0) {
                        if(grid[i - 1][j] === '1') {
                            uf.union(index - len2, index);
                        }
                    }
                } else {
                    zeroCount++;
                }
        }
    }
    return uf.countAll() - zeroCount;
}


// 我们先声明一个「并查集」的类

class UnionFind {
    constructor(n) {
        this.count = n;
        this.id = [];
        this.size = [];
        this.init(n);
    }

    // 初始化
    init(n) {
        for(let i = 0; i < n; i++) {
            this.id[i] = i;
            this.size[i] = 1;
        }
    }

    // 查找
    find(p) {
        while(p !== this.id[p]) {
            // p的老大不是自己
            // 依次找老大
            this.id[p] = this.id[this.id[p]];
            p = this.id[p];
        }
        return p;
    }

    // 合并
    union(p, q) {
        // 合并两个节点为一个集合
        // 首先找两个节点的根元素（老大）
        let pRoot = this.find(p);
        let qRoot = this.find(q);

        console.log(pRoot, qRoot)

        if(pRoot === qRoot) return; // 两者的老大相同，证明两者已经在一个集合中。

        if(this.size[pRoot] < this.size[qRoot]) {
            // p集合的长度小于q集合的长度，将p集合并入q
            this.id[pRoot] = qRoot;
            this.size[qRoot] += this.size[pRoot];
        } else {
            this.id[qRoot] = pRoot;
            this.size[pRoot] += this.size[qRoot];
        }
        this.count--;
    }


    countAll() {
        return this.count;
    }

}

let grid1 = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]];
let grid = [["1","1","1"],["0","1","0"],["1","1","1"]];
console.log(numIslands(grid))

