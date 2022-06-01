const refs = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

let timerId = null;

refs.start.addEventListener('click', onPushStartColor);
refs.stop.addEventListener('click', onPushStopColor);

refs.stop.disabled = true;

function onPushStartColor() {
  disabledStarBtn();
  changeColor();

  timerId = setInterval(changeColor, 1000);
}

function onPushStopColor() {
  disabledStopBtn();
  clearInterval(timerId);
}

function disabledStarBtn() {
  if ((refs.start.disabled = true)) {
    refs.stop.disabled = false;
  }
}

function disabledStopBtn() {
  if ((refs.stop.disabled = true)) {
    refs.start.disabled = false;
  }
}

function changeColor() {
  refs.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
