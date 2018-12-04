interface Food {
  name: string;
  calories: number;
  print(): void;
}

function speak2(food: Food): void {
  console.log("Our " + food.name + " has " + food.calories + " calories.");
}

var ice_cream = {
  name: "ice cream",
  calories: 200,
  print: function () {
      
  }
}

speak2(ice_cream);
