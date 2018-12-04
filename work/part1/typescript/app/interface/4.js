(function () {
    var UserFactory = {
        getInstance: function (construct, name, age) {
            // Cannot use 'new' with an expression 
            // whose type lacks a call or construct signature.
            return new construct(name, age);
        }
    };
    var User = /** @class */ (function () {
        function User(name, age) {
            this.name = name;
            this.age = age;
            this.name = name;
            this.age = age;
        }
        User.prototype.show = function () {
            console.log("Name: " + this.name + ", Age: " + this.age);
        };
        return User;
    }());
    var user = UserFactory.getInstance(User, "Tom", 56);
    user.show();
}());
(function () {
    var UserFactory = {
        getInstance: function (construct, name, age) {
            // Cannot use 'new' with an expression 
            // whose type lacks a call or construct signature.
            // return new construct(name, age);
        }
    };
    var User = /** @class */ (function () {
        function User(name, age) {
            this.name = name;
            this.age = age;
            this.name = name;
            this.age = age;
        }
        User.prototype.show = function () {
            console.log("Name: " + this.name + ", Age: " + this.age);
        };
        return User;
    }());
    // let user = UserFactory.getInstance(User, "Tom", 56);
    // user.show();
}());
(function () {
    var UserFactory = {
        getInstance: function (construct, name, age) {
            return new construct(name, age);
        }
    };
    var User = /** @class */ (function () {
        function User(name, age) {
            this.name = name;
            this.age = age;
            this.name = name;
            this.age = age;
        }
        User.prototype.show = function () {
            console.log("Name: " + this.name + ", Age: " + this.age);
        };
        return User;
    }());
    var user = UserFactory.getInstance(User, "Tom", 56);
    user.show();
}());
