/*
    题目描述：
    从上到下按层打印二叉树，同一层结点从左至右输出。每一层输出一行。
 */

/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function Print(pRoot)
{
    // write code here
    if(pRoot === null) return [];
    let result = [];
    let queue = [];

    queue.push(pRoot);

    while(queue.length > 0) {
        let temp = [];
        let len = queue.length;
        for(let i = 0; i < len; i++) {
            let node = queue.shift();
            temp.push(node.val)
            if(node.left) {
                queue.push(node.left);
            }
            if(node.right) {
                queue.push(node.right);
            }
        }
        result.push(temp)
    }
    return result;
}