const refs = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

let timerId = null;

refs.start.addEventListener('click', onPushStartColor);

refs.stop.addEventListener('click', () => {
  clearInterval(timerId);
});

function onPushStartColor() {
  timerId = setInterval(changeColor, 1000);
  console.log(timerId);
}

function changeColor() {
  refs.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
