window.GOOGLE = {};

(function(NS) {
  var a = 10;

  function say() {
    console.log('Hello World!');
  }

  NS.A = {
    a,
    say
  };
}(window.GOOGLE));