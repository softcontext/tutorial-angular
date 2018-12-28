var Member = /** @class */ (function () {
    function Member() {
    }
    Member.prototype.deserialize = function (input) {
        this.id = input.id;
        return this;
    };
    return Member;
}());
var ExampleClass = /** @class */ (function () {
    function ExampleClass() {
    }
    ExampleClass.prototype.deserialize = function (input) {
        this.mainId = input.mainId;
        this.firstMember = new Member().deserialize(input.firstMember);
        this.secondMember = new Member().deserialize(input.secondMember);
        return this;
    };
    return ExampleClass;
}());
var json = {
    mainId: 42,
    firstMember: {
        id: 1337
    },
    secondMember: {
        id: -1
    }
};
var instance = new ExampleClass().deserialize(json);
console.log(instance);
// ExampleClass {
//   mainId: 42,
//   firstMember: Member { id: 1337 },
//   secondMember: Member { id: -1 } }
