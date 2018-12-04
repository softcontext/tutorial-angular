// Constructor Interface : 
// interface로 constructor의 타입을 지정해 줄 수 있다.
interface IPersonConstructor {
  // Construct Signature
  new(n: string, a: number): Person;
}

const PersonFactory = {
  // interface를 이용해 생성자의 signature를 지정합니다.
  getInstance: function(construct: IPersonConstructor, name: string, age: number) {
    // Cannot use 'new' with an expression 
    // whose type lacks a call or construct signature
    return new construct(name, age);
  }
};

class Person {
  myName: string;
  myAge: number;

  constructor(name: string, age: number) {
    this.myName = name;
    this.myAge = age;
  }

  printInfo() {
    console.log("이름:" + this.myName + ", 나이:" + this.myAge);
  }
}

let obj = PersonFactory.getInstance(Person, "홍길동", 30);
obj.printInfo();