/*
    题目描述：
        给定一个二叉搜索树, 找到该树中两个指定节点的最近公共祖先。
        百度百科中最近公共祖先的定义为：“对于有根树 T 的两个结点 p、q，最近公共祖先表示为
    一个结点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。


    思路：
        相比236题，我们可以借用「二叉搜索树」的特性来判断p或者q实在root的左子树还是右子树。
 */

// 递归法
var lowestCommonAncestor = function(root, p, q) {

    if(p.val < root.val && q.val < root.val) {
        return lowestCommonAncestor(root.left, p, q);
    } else if(p.val > root.val && q.val > root.val) {
        return lowestCommonAncestor(root.right, p, q);
    } else {
        return root;
    }
}

// 非递归
var lowestCommonAncestor = function(root, p, q) {
    if(root === null) return null;

    while(root !== null) {
        if(p.val < root.val && q.val < root.val) {
            root = root.left;
        } else if(p.val > root.val && q.val > root.val) {
            root = root.right
        } else {
            return root;
        }
    }
}
