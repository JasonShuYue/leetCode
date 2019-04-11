/*
    题目描述：
        给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。
        百度百科中最近公共祖先的定义为：“对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，
    满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”

    例如，给定如下二叉树:  root = [3,5,1,6,2,0,8,null,null,7,4]

    思路：
        「递归法」，终止条件：当前节点为null || 当前节点等于p || 当前节点为q,找到节点p或者q任意一个，如果p在当前节点的左子树，
    q在当前节点的右子树，则当前节点root就是我们要找的最近公共节点。如果p和q都在左子树（右子树），那么我们只用递归搜索右子树
    （左子树），直到p和q在不同的子树中。
 */

var lowestCommonAncestor = function(root, p, q) {

    // 终止条件
    if(root === null || root === p || root === q) return root;

    let left = lowestCommonAncestor(root.left, p, q); // 看看左子树是否有p或者q
    let right = lowestCommonAncestor(root.right, p, q); // 看看右子树是否有p或者q

    if(left === null) { // 如果左子树为空，则都在右子树
        return right;
    } else if(right === null) { // 如果右子树为空，则都在左子树
        return left;
    } else {
        return root;
    }
}