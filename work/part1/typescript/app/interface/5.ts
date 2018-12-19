interface UserConstructor {
  // construct signature
  new(name: string, age: number): User;
}

const UserFactory = {
  getInstance: function(construct: UserConstructor, name: string, age: number) {
    return new construct(name, age);
  }
};

class User {
  constructor(private name: string, private age: number) {
    this.name = name;
    this.age = age;
  }
  show() {
    console.log(`Name: ${this.name}, Age: ${this.age}`);
  }
}

let user = UserFactory.getInstance(User, "Tom", 56);
user.show();