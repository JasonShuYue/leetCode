function typeJudge(obj) {
    let classTypes = ['Date', 'Error', 'RegExp', 'Object', 'Array'];
    let hash = {};
    classTypes.map(item => {
        let key = '[object '+ item +']';
        hash[key] = item.toLowerCase();
    });

    if(obj === null) {
        return String(obj);
    } else if(typeof obj !== 'object') {
        return typeof obj;
    } else {
        return hash[Object.prototype.toString.call(obj)];
    }
}
