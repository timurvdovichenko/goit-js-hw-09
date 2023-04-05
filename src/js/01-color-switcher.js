const refs = {
  buttonStart: document.querySelector('button[data-start]'),
  buttonStop: document.querySelector('button[data-stop]'),
  body: document.body,
};

refs.buttonStart.addEventListener('click', startChangeColor);
refs.buttonStop.addEventListener('click', stopChangeColor);

let intervalID = null;

refs.buttonStop.setAttribute('disabled', true);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function startChangeColor(evt) {
  if (intervalID === null) {
    refs.body.style.backgroundColor = getRandomHexColor();
    intervalID = setInterval(() => {
      refs.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  }
  refs.buttonStart.setAttribute('disabled', true);
  refs.buttonStop.removeAttribute('disabled');
}

function stopChangeColor() {
  clearInterval(intervalID);
  intervalID = null;
  refs.buttonStart.removeAttribute('disabled');
  refs.buttonStop.setAttribute('disabled', true);
}
