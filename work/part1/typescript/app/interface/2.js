(function () {
    var Member = /** @class */ (function () {
        function Member(id, name) {
        }
        Member.prototype.show = function () {
            console.log("Id is " + this.id + " and Name is " + this.name);
        };
        return Member;
    }());
    var member = new Member(1, 'Tom');
    function proceed(user) {
        user.show();
    }
    proceed(member);
}());
