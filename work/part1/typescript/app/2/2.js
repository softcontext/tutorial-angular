function speak2(food) {
    console.log("Our " + food.name + " has " + food.calories + " calories.");
}
var ice_cream = {
    name: "ice cream",
    calories: 200,
    print: function () {
    }
};
speak2(ice_cream);
