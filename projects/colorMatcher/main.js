const colorBoxesEl = document.querySelectorAll(".colorBox");
const colorCodesEl = document.querySelectorAll(".colorCode");
const controlBoxesEl = document.querySelectorAll(".controlBox")
const controlInputsEl = document.querySelectorAll(".controlBox>input");
const hintBoxesEl = document.querySelectorAll(".hintBox");
const resultSpanEl = document.querySelector("#resultSpan");
const controlButtonsEl = document.querySelectorAll('.controlButton');
var questColor, r, g, b, a, hints, hintsUsed;
var advanced = false;

for (let element of controlInputsEl) {
  element.addEventListener('input', (e) => {
    if (e.currentTarget.id == "rRange") {
      r = e.currentTarget.value;
    }
    else if (e.currentTarget.id == "gRange") {
      g = e.currentTarget.value;
    }
    else if (e.currentTarget.id == "bRange") {
      b = e.currentTarget.value;
    }
    else if (e.currentTarget.id == "aRange") {
      a = e.currentTarget.value;
    }
    changeColor()
  })
}

function changeColor() {
  let hex = `#${fillZero(decToHex(r),2)}${fillZero(decToHex(g),2)}${fillZero(decToHex(b),2)}`;
  if (advanced) {
    hex += fillZero(decToHex(a), 2)
  }
  colorCodesEl[1].innerHTML = hex;
  colorBoxesEl[1].style.backgroundColor = hex;
}

function reset() {
  document.querySelector(".colorRow").style.gap = "5vh"
  questColor = [randHex(2), randHex(2), randHex(2), "FF"];
  questColor[3] = advanced ? randHex(2) : "FF"
  colorBoxesEl[0].style.backgroundColor = `#${questColor.join("")}`;
  r = controlInputsEl[0].value;
  g = controlInputsEl[1].value;
  b = controlInputsEl[2].value;
  a = controlInputsEl[3].value;
  controlBoxesEl[3].style.display = advanced ? "flex" : "none"
  colorCodesEl[0].innerHTML = advanced ? "#????????" : "#??????"
  hints = advanced ? 2 : 1;
  hintsUsed = 0;
  for (let each of hintBoxesEl) {
    each.style.visibility = (hints <= 0) ? "hidden" : "visible"
  }
  changeColor()
}

for (let each of hintBoxesEl) {
  each.addEventListener('click', (e) => {
    if (e.currentTarget.id == "rHint") {
      controlInputsEl[0].value = hexToDec(questColor[0])
      r = controlInputsEl[0].value
    }
    else if (e.currentTarget.id == "gHint") {
      controlInputsEl[1].value = hexToDec(questColor[1])
      g = controlInputsEl[1].value
    }
    else if (e.currentTarget.id == "bHint") {
      controlInputsEl[2].value = hexToDec(questColor[2])
      b = controlInputsEl[2].value
    }
    else if (e.currentTarget.id == "aHint") {
      controlInputsEl[3].value = hexToDec(questColor[3])
      a = controlInputsEl[3].value
    }
    hints--;
    hintsUsed++;
    for (let every of hintBoxesEl) {
      every.style.visibility = (hints <= 0) ? "hidden" : "visible"
    }
    changeColor()
  })
}


controlButtonsEl[1].addEventListener('click', () => {
  reset()
})

controlButtonsEl[2].addEventListener('click', () => {
  advanced = !advanced;
  controlButtonsEl[2].style.backgroundColor = advanced ? "green" : "red";
  a = 255;
  controlInputsEl[3].value = a;
  reset();
})

controlButtonsEl[3].addEventListener('click', () => {
  reset()
  document.querySelector(".controls").style.display = "flex";
  document.querySelector(".options").style.display = "flex";
  document.querySelector(".results").style.display = "none";
})

controlButtonsEl[0].addEventListener('click', () => {
  let deltaR = Math.abs(r - hexToDec(questColor[0]))
  let deltaG = Math.abs(g - hexToDec(questColor[1]))
  let deltaB = Math.abs(b - hexToDec(questColor[2]))
  let deltaA = Math.abs(a - hexToDec(questColor[3]))
  let percentage = 100 * (deltaR + deltaG + deltaB + deltaA) / (255 * (advanced ? 4 : 3))
  resultSpanEl.innerText = `You were ${100-percentage}% accurate `;
  resultSpanEl.innerText += (hintsUsed == 0) ? "." : `using ${hintsUsed} hint(s).`
  document.querySelector(".controls").style.display = "none";
  document.querySelector(".options").style.display = "none";
  document.querySelector(".results").style.display = "flex";
  colorCodesEl[0].innerText = `#${questColor[0]+questColor[1]+questColor[2]+(advanced ? questColor[3] : "")}`
  document.querySelector(".colorRow").style.gap = "0"
})


reset()