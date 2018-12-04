(function() {
  interface User {
    id: number;
    name: string;
    show(): void;
  }

  class Member implements User {
    id;
    name;
    constructor(id: number, name: string) { }
    show(): void {
      console.log(`Id is ${this.id} and Name is ${this.name}`);
    }
  }

  let member: Member = new Member(1, 'Tom');

  function proceed(user: User): void {
    user.show();
  }

  proceed(member);
}());
