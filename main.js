class CircleColumn {
  constructor(length, num) {
    let box = document.createElement("div");
    box.setAttribute('class', 'circleColumn')
    for (let i = 0; i < length; i++) {
      let circle = document.createElement("div");
      circle.setAttribute('class', 'circle')
      if (i < num) {
        circle.setAttribute('class', 'circle glowed')
      }
      box.appendChild(circle)
    }
    this.elem = box
  }
}


var rNums = []
var rDials = []
for (let i = 0; i < 5; i++) {
  rNums.push(randint(1, 6))
}
for (let i = 0; i < 3; i++) {
  rDials.push(randint(1, 36) * 10)
}
const c1cR = document.querySelector("#container1 .containerRight")
for (let i = 0; i < 5; i++) {
  let circleColumn = new CircleColumn(5, rNums[i]);
  c1cR.appendChild(circleColumn.elem)
}
const hiddenSecret = document.querySelectorAll(".hiddenSecret")
for (let i = 0; i < 3; i++) {
  hiddenSecret[i].innerHTML = rDials[i]
}



const navToContainer = {
  "Home": "container1",
  "About me": "container2",
  "My interest": "container3",
  "My projects": "container4",
  "Contact me": "container5"
}
const lis = document.querySelectorAll("header ul li")
for (let each of lis) {
  each.addEventListener('click', (e) => {
    location.replace(`#${navToContainer[e.currentTarget.innerHTML]}`)
  })
}

const coinFoundNotif = new Notification("resource/images/ryanGosling.jpg", "Congratulations! You found it!")
const keyFoundNotif = new Notification("resource/images/key.svg", "Woho! You found the key!")
const noCoinNotif = new Notification("resource/images/block.svg", "Uh, you need something circular to open the screws.")
const noKeyNotif = new Notification("resource/images/block.svg","Nuh uh, you need a key to open the lock.")


const ball = document.querySelector(".ball")
let rClick = randint(5, 11) + 1
let bClicked = 0
ball.addEventListener('click', () => {
  let divs = document.querySelectorAll(".ball>div")
  bClicked++;
  if (bClicked > rClick) {
    divs[0].style.transform = "translate(-100%,0)"
    divs[1].style.transform = "translate(0,-100%)"
    ball.style.transform = "scale(2)";
    ball.style.top = "50%"
    ball.style.left = "50%";
  }
  else {
    ball.style.top = `${randint(1,101)}%`
    ball.style.left = `${randint(1,101)}%`
  }
  if (rClick + 2 <= bClicked) {
    divs[1].style.display = "none";
    divs[0].style.transform = "translate(0,0)";
    keyFoundNotif.show()
  }
  if (keyFoundNotif.viewed) {
    bClicked = 0;
    ball.style.transform = "scale(1.1)"
  }
})
ball.click()


const rgImage = document.querySelector("#container2 .containerRight")
rgImage.addEventListener('click', () => {
  coinFoundNotif.show()
})

var openedScrews = []

function hideWithDelay(element, time) {
  setTimeout(() => { element.style.display = "none" }, time * 1000)
}

function fall(element, time) {
  element.style.animation = `fallAndDisappear ${time}s linear 1`
  setTimeout(() => { element.style.display = "none" }, time * 1000)
}

function show(element,time){
  setTimeout(()=>{
  element.style.display = "flex"
  element.style.animation = `comeFromTop ${time}s linear 1`},time*2000)
}

const screw = document.querySelectorAll(".screw")
const panels = document.querySelectorAll(".panel")


for (let each of screw) {
  each.addEventListener('click', (e) => {
    if (!checkIn(e.currentTarget.id, openedScrews) && coinFoundNotif.viewed) {
      e.currentTarget.style.animation = "untightenAndFall 5s linear 1";
      openedScrews.unshift(e.currentTarget.id)
      hideWithDelay(e.currentTarget, 5)
      if (openedScrews.length >= 4) {
        setTimeout(() => { fall(document.querySelector("#panel1"), 5) }, 5000)
        show(panels[1],5)
      }
    }
    else if (!coinFoundNotif.viewed) {
      noCoinNotif.show();
    }
  })
}

const dials = document.querySelectorAll(".dial")
const dialVal = [0, 0, 0]
for (let each of dials) {
  each.addEventListener('click', (e) => {
    index = Number(e.currentTarget.id[4]) - 1;
    dialVal[index] += 10;
    if (dialVal[index] > 350) {
      dialVal[index] = 0
    }
    e.currentTarget.style.transform = `rotate(${dialVal[index]}deg)`
    document.querySelector(`#${e.currentTarget.id}>div`).innerHTML = dialVal[index];
    if (equateArray(rDials, dialVal)) {
      setTimeout(() => { fall(document.querySelector("#panel2"), 3); show(panels[2],5) }, 2000)
    }
  })
}

const input = document.querySelector("#panel3 input")
input.addEventListener('input', () => {
  let user = input.value;
  if (equateArray(rNums, getDigits(user))) {
    fall(document.querySelector("#panel3"), 5)
    show(panels[3],5)
  }
})



const lock = document.querySelector(".lock")
lock.addEventListener('click',()=>{
  if (keyFoundNotif.viewed){
    fall(document.querySelector("#panel4"),5)
    clearInterval(interval)
    show(panels[4],5)
  }
  else{
    noKeyNotif.show()
  }
})

const time = document.querySelector("#time");
var secs = 0;
let interval = setInterval(() => {
  secs++;
  time.innerHTML = secs;
}, 1000)

const projectBoxes = document.querySelectorAll(".projectBox");
for (let each of projectBoxes){
  each.addEventListener('click',(e)=>{
    let id = e.currentTarget.id;
    window.open(`https://its-meash.github.io/itsMeAsh/projects/${id}/index.html`,"_blank")
  })
}
