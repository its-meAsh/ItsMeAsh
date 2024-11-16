// CLASSES

class Notification {
  constructor(image, message) {
    let box = document.createElement("div")
    let imgBox = document.createElement('div')
    let msgBox = document.createElement("div")
    box.append(imgBox, msgBox)
    let img = document.createElement('img');
    img.setAttribute('src', image)
    imgBox.append(img)
    msgBox.innerHTML = message
    this.box = box;
    this.viewed = false;
  }
  show() {
    if (!this.viewed) {
      document.body.append(this.box);
      this.viewed = true
      this.box.setAttribute('class', 'notifBox viewing');
      setTimeout(() => { document.body.removeChild(this.box) }, 5000)
    }
  }
}


// FUNCTIONS

function checkIn(element,array){
  for (let each of array){
    if (each == element){
      return true
    }
  }
  return false
}

function equateArray(a1,a2){
  for (let i = 0; i<a1.length;i++){
    if (a1[i] != a2[i]){
      return false
    }
  }
  return true
}

function getDigits(number){
  let array = []
  while (number>0){
    r = number%10;
    number = Math.floor(number/10)
    array.unshift(r)
  }
  return array
}

function random(l,u){
  return Math.random()*(u-l)+l
}

function randint(l,u){
  return Math.floor(random(l,u))
}

function choice(array){
  return array[randint(0,array.length)]
}

function matrixAdd(arr1,arr2){
  for (let i = 0; i<arr1.length; i++){
    for (let j = 0; j<arr1[i].length;j++){
      arr2[i][j] = arr1[i][j] + arr2[i][j];
    }
  }
  return arr2;
}

function matrixMake(r,c,v){
  let array = [];
  for (let i = 0; i<r;i++){
    array.push([]);
    for (let j = 0; j<c;j++){
      array[i].push([v])
    }
  }
  return array
}

function randColor(){
  let hexArray = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];
  let color = "#";
  for (let i = 0; i<6;i++){
    color+=choice(hexArray);
  }
  return color
}