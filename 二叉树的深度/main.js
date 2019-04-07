/*
    题目描述：
        输入一棵二叉树，求该树的深度。从根结点到叶结点依次经过的结点（含根、叶结点）形成树的一条路径，最长路径的长度为树的深度。
 */


/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */

// 非递归法：用层次遍历
function TreeDepth(pRoot)
{
    // write code here
    if(pRoot === null) return 0;
    let queue = [];
    let count = 0;
    queue.push(pRoot)

    while(queue.length > 0) {
        let len = queue.length;
        count++;

        for(let i = 0; i < len; i++) {
            let node = queue.shift();
            if(node.left !== null) {
                queue.push(node.left);
            }
            if(node.right !== null) {
                queue.push(node.right);
            }
        }
    }

    return count;
}

// 递归法
function TreeDepth(pRoot)
{
    // write code here
    if(pRoot === null) return 0;

    let left = TreeDepth(pRoot.left);
    let right = TreeDepth(pRoot.right);

    return Math.max(left, right) + 1;
}