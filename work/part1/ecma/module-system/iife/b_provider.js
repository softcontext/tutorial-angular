(function(NS) {
  var a = 20;

  function say() {
    console.log('Hello Angular!');
  }

  NS.B = {
    a,
    say
  };
}(window.GOOGLE));