/*
    题目描述：
        给定一个二叉树和其中的一个结点，请找出中序遍历顺序的下一个结点并且返回。注意，
    树中的结点不仅包含左右子结点，同时包含指向父结点的指针。

    思路：
        （1）如果当前结点为null，则返回null
        （2）如果当前节点有「右子树」，那么下一个结点就是右子树中的最左叶子结点，
        （3）如果当前节点没有「右子树」，那么就判断当前节点的「父节点」的左孩子是不是当前节点，如果不是则递归往上找，直到找到。
 */


/*function TreeLinkNode(x){
    this.val = x;
    this.left = null;
    this.right = null;
    this.next = null;
}*/

function GetNext(pNode)
{
    // write code here

    // 情况一：
    if(pNode === null) return null;

    // 情况二：
    if(pNode.right !== null) {
        let root = pNode.right;
        while(root.left !== null) {
            root = root.left;
        }
        return root;
    }

    // 情况三：
    while(pNode.next !== null) {
        if(pNode.left === pNode) {
            return pNode.next;
        }
        pNode = pNode.next;
    }

}