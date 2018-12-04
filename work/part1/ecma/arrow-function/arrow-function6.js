/**
 * 일반 함수를 사용해야 할 때 vs 애로우 함수를 사용해야 할 때
 * 과제 : 결과를 예측하고 왜 그런지 설명하시오.
 */
console.log(this === module.exports); // true

this.title = "title in module.exports";

let foo = {
  title: "title in foo"
};

// method 함수는 메소드명, 익명함수를 파라미터로 받아서
// 동적으로 this가 가리키는 객체에 프로퍼티로 추가한다.
foo.method = function(name, cb) {
  this[name] = cb;
};

foo.method("bar", () => {
  console.log(this.title);
});

foo.bar();