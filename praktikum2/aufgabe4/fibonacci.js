const fib_rek = function(n){
  if(n==0) return 0;
  if(n==1) return 1;
  if(n>1) return fib_rek(n-1) + fib_rek(n-2);
}

const fib_for = function(n){
  g = (1+Math.sqrt(5))/2;
  return Math.round((g**n)/Math.sqrt(5));
}

console.log("Rekursiv: Fibonacci Folge von 0-10: ");
console.log("0: " + fib_rek(0));
console.log("1: " + fib_rek(1));
console.log("2: " + fib_rek(2));
console.log("3: " + fib_rek(3));
console.log("4: " + fib_rek(4));
console.log("5: " + fib_rek(5));
console.log("6: " + fib_rek(6));
console.log("7: " + fib_rek(7));
console.log("8: " + fib_rek(8));
console.log("9: " + fib_rek(9));
console.log("10: " + fib_rek(10));


console.log("\nFormel: Fibonacci Folge von 0-10: ");
console.log("0: " + fib_for(0));
console.log("1: " + fib_for(1));
console.log("2: " + fib_for(2));
console.log("3: " + fib_for(3));
console.log("4: " + fib_for(4));
console.log("5: " + fib_for(5));
console.log("6: " + fib_for(6));
console.log("7: " + fib_for(7));
console.log("8: " + fib_for(8));
console.log("9: " + fib_for(9));
console.log("10: " + fib_for(10));

console.log("\nZeit zur Berechnung bei n=30: ")
console.time("Zeit mit rekursiver Funktion: ");
console.log("30: " + fib_rek(30));
console.timeEnd("Zeit mit rekursiver Funktion: ");
console.time("Zeit mit Formel: ");
console.log("30: " + fib_for(30));
console.timeEnd("Zeit mit Formel: ");
