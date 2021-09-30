console.log("Primzahlen:");

const isPrime = function(number){
  if (number==0||number==1) return false;
  for(let i = 2; i*i < number; i++ ){if(number%i==0) return false;}
  return true;
}

console.log("2: " + isPrime(2));
console.log("15: " + isPrime(15));
console.log("17: " + isPrime(17));
