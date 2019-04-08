/*
    题目描述：
        请实现一个函数，用来判断一颗二叉树是不是对称的。注意，如果一个二叉树同此二叉树的镜像是同样的，定义其为对称的。

    思路：
        （1）递归法：每次判断左右子树，如果左右子树的根节点的值不同，直接返回false，然后递归判断「左子树的左子树」和「右子树的右子树」
    ，「左子树的右子树」和「右子树的左子树」。
        （2）非递归法：

 */

/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */

var root = {
    val: 6,
    left: {
        val: 5,
        left: {
            val: 4,
            left: null,
            right: null
        },
        right: {
            val: 3,
            left: null,
            right: null
        }
    },
    right: {
        val: 2,
        left: null,
        right: {
            val: 1,
            left: null,
            right: null
        }
    }
}

// 1.深度优先遍历（BST）

// 递归法：
//     （1）若二叉树为空，算法结束
//     （2）访问根节点
//     （3）前序遍历根节点的左子树
//     （4）前序遍历根节点的右子树

var result = [];

function DST(root) {
    if(root === null) return null;
    result.push(root.val);
    if(root.left !== null) DST(root.left);
    if(root.right !== null) DST(root.right);
}

// 非递归法
//     （1）初始化一个栈，将根节点压入栈
//     （2）当栈不为空的时候，循环执行第（3）（4）步
//     （3）出栈取得一个节点，访问该节点
//     （4）若该节点的「右子节点」不为空，则将此节点的「右子节点」入栈。若该节点的「左子节点」不为空，则将此节点的「左子节点」入栈。

function DST(root) {
    if(root === null) return null;
    let stack = [];
    let result = [];

    stack.push(root)

    while(stack.length > 0) {
        let node = stack.pop();
        result.push(node.val);
        if(node.right !== null) {
            stack.push(node.right);
        }
        if(node.left !== null) {
            stack.push(node.left);
        }
    }
    return result;
}

console.log(DST(root))