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
function isSymmetrical(pRoot)
{
    // write code here
    if(pRoot === null) return true;


    return judge(pRoot.left, pRoot.right);
}

function judge(left, right) {
    if(left === null && right === null) return true;
    if(right === null || left === null) return false;
    if(left.val !== right.val) return false;

    return judge(left.left, right.right) && judge(left.right, right.left);
}

