function fibonacci(n) {
  if(n==0) return 0;
  if(n==1) return 1;
  if(n>1) return fibonacci(n-1) + fibonacci(n-2);
}

function findTag(str) {
    if (str === null || typeof str !== 'string') return '';
    const openPos = str.indexOf('<');
    const closePos = str.indexOf('>');
    if (openPos === -1 || closePos === -1 || openPos > closePos) return '';
    return str.substring(openPos + 1, closePos);
}

function equal(a, b) {
    if (a === b) return true;
    if (typeof a === 'object' && typeof b === 'object') {
        if ((a === null || b === null)) return false;
        let aKeys = Object.keys(a);
        let bKeys = Object.keys(b);
        if (aKeys.length === bKeys.length) {
            for (key of aKeys) {
                if (a[key] !== b[key] || !bKeys.includes(key)) {
                  return false;}
            }
            return true;
        }
        return false;
    }
    return false;
}

if (typeof Object.beget !== 'function') {
    Object.beget = function (o) {
    let F = function () {
    };
    F.prototype = o;
    return new F();
    }
}

let person = {age: 12}

let employee = Object.beget(person);

console.log("Print age of employee-object: ", employee.age);

module.exports = { findTag, fibonacci, equal }
