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

function getFreq(array){
  let note = {}
  for (let each of array){
    if (!checkIn(each,Object.keys(note))){
      note[each] = 0;
    }
    note[each]++;
  }
  return note
}


function decToHex(num){
  let decToHexMap = {
    0:"0",1:"1",2:"2",3:"3",4:"4",5:"5",6:"6",7:"7",8:"8",9:"9",10:"A",11:"B",12:"C",13:"D",14:"E",15:"F"
  };
  let hex = ""
  while ( num > 0){
    let r = num%16;
    hex=(decToHexMap[r]+hex);
    num = Math.floor(num/16);
  }
  return hex
}

function fillZero(text,length){
  let len = text.length
  for (let i = 0; i<length-len;i++){
    text = "0"+text;
    console.log(text,i)
  }
  return text
}

function randHex(length){
  let hexArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
  let hex = "";
  for (let i = 0; i < length; i++) {
    hex += choice(hexArray);
  }
  return hex
}

function randColor() {
  let color = `#${randHex(6)}`
  return color
}

function hexToDec(hex){
  let hexToDecMap = {
    "0":0,"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"A":10,"B":11,"C":12,"D":13,"E":14,"F":15
  };
  let sum = 0;
  for (let i = 0; i<hex.length;i++){
    sum+=(16**(hex.length-1-i))*(hexToDecMap[hex[i]])
  }
  return sum
    }
