/*
    题目描述：
        班上有 N 名学生。其中有些人是朋友，有些则不是。他们的友谊具有是传递性。如果已知 A 是 B 的朋友，
    B 是 C 的朋友，那么我们可以认为 A 也是 C 的朋友。所谓的朋友圈，是指所有朋友的集合。

        给定一个 N * N 的矩阵 M，表示班级中学生之间的朋友关系。如果M[i][j] = 1，表示已知第 i 个和 j 个学生互为朋友关系，
    否则为不知道。你必须输出所有学生中的已知的朋友圈总数。

    示例：
        输入:
            11110
            11010
            11000
            00000
        输出:
            1

    思路：
        (1) 并查集方法
 */

class UnionFind {
    constructor(n) {
        this.count = n;
        this.id = [];
        this.size = [];
        this.init(this.count);
    }

    init(n) {
        for(let i = 0; i < n; i++) {
            this.id[i] = i;
            this.size[i] = 1;
        }
    }

    find(p) {
        while(p !== this.id[p]) {
            this.id[p] = this.id[this.id[p]];
            p = this.id[p];
        }
        return p;
    }

    union(p,q) {
        let pRoot = this.find(p);
        let qRoot = this.find(q);

        if(pRoot === qRoot) return;

        if(this.size[pRoot] < this.size[qRoot]) {
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


var findCircleNum = function(M) {
    if(!M.length) return 0;

    let n = M.length;

    let uf = new UnionFind(n);

    for(let i = 0; i < n; i++) {
        for(let j = 0; j < n; j++) {
            if(M[i][j] === 1) {
                uf.union(i, j);
            }
        }
    }

    return uf.countAll();
}


let M = [[1,1,0],[1,1,0],[0,0,1]];

console.log(findCircleNum(M))