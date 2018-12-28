interface Serializable<T> {
  deserialize(input: object): T;
}

export class Employee implements Serializable<Employee>{
  id: number;
  firstName: string;
  lastName: string;

  deserialize(input): Employee {
    this.id = input.id;
    this.firstName = input.firstName;
    this.lastName = input.lastName;

    return this;
  }
}
