interface Serializable<T> {
  deserialize(input: Object): T;
}

class Member implements Serializable<Member> {
  id: number;

  deserialize(input) {
    this.id = input.id;
    return this;
  }
}

class ExampleClass implements Serializable<ExampleClass> {
  mainId: number;
  firstMember: Member;
  secondMember: Member;

  deserialize(input) {
    this.mainId = input.mainId;

    this.firstMember = new Member().deserialize(input.firstMember);
    this.secondMember = new Member().deserialize(input.secondMember);

    return this;
  }
}

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
