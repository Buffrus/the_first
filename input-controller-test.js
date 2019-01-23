let testTarget = document.getElementById('testDiv')

let testObject = {
  "left": {
    keys: [37,65],
    enabled: false
  },
  "right": {
    keys: [39,68]
  },
}

let testObject2 = {
  "left": {
    keys: [39,100],
    enabled: false
  },
  "right": {
    keys: [39,68],
    enabled: false
  },
}

let a = new InputController(testObject, testTarget);

console.log(a.actionsToBind);
a.bindActions = testObject2;
console.log(a.actionsToBind);