// ES5版本

function Animal() {
    this.body = 'body';
}

Animal.prototype.move = function() {
    console.log('moving');
}

function Man(name) {
    Animal.apply(this, arguments);
    this.name = name;
}

var f = function() {};

f.prototype = Animal.prototype;

Man.prototype = new f();

Man.prototype.sing = function() {
    console.log('sing');
}


// ES6版本

class Animal {
    constructor() {
        this.body = 'body';
    }
    move() {
        console.log('moving');
    }
}

class Man extends Animal {
    constructor(name) {
        super();
        this.name = name;
    }

    sing() {
        console.log('singing');
    }
}
