function shiftDown(arr, i, length) { // 下沉函数，这个函数的目的就是为了把arr[i]放到合适位置
    // arr:原数组
    // i: 当前父节点的下表
    // length: 原数组长度

    let left = 2*i + 1;
    let right = 2*i + 2;
    let maxIndex = i;

    if(left < length && arr[left] > arr[maxIndex]) {
        maxIndex = left;
    }
    if(right < length && arr[right] > arr[maxIndex]) {
        maxIndex = right;
    }

    if(maxIndex !== i) {
        [arr[i], arr[maxIndex]] = [arr[maxIndex], arr[i]];
        shiftDown(arr, maxIndex, length);
    }
}

function heapSort(arr) {
    let len = arr.length;

    // 建堆
    for(let i = Math.floor(len / 2); i >= 0; i--) {
        shiftDown(arr, i, len);
    }

    // 堆排序,每次建堆后，最大的元素都会在顶，然后和最后一个元素交换位置，
    // 然后递归减少length长度，直到为1
    for(let j = 0; j < len; j++) {
        [arr[0], arr[len - 1 - j]] = [arr[len - 1 - j], arr[0]];
        shiftDown(arr, 0, len - 2 - j );
    }
    console.log(arr)

    return arr;
}

let arr = [1,4,3,6,5]

heapSort(arr)