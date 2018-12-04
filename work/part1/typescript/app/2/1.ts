var burger: string = 'hamburger',     // String
  calories = 300,           // Numeric
  tasty: boolean = true;            // Boolean

function speak(food: string, energy: number): void {
  console.log("Our " + food + " has " + energy + " calories.");
}

speak(burger, calories);
