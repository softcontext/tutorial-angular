(function () {
    var user = {
        id: 1,
        name: 'Tom',
        show: function () {
            console.log("Id is " + this.id + " and Name is " + this.name);
        }
    };
    function proceed(user) {
        user.show();
    }
    proceed(user);
}());
