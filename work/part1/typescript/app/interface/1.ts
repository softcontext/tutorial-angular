(function() {
  interface User {
    id: number;
    name: string;
    show(): void;
  }
  
  let user: User = {
    id: 1,
    name: 'Tom',
    show(): void {
      console.log(`Id is ${this.id} and Name is ${this.name}`);
    }
  };
  
  function proceed(user: User): void {
    user.show();
  }
  
  proceed(user);
}());
