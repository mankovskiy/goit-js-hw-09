// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  input: document.querySelector('#datetime-picker'),
  button: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
refs.button.setAttribute('disabled', 'disabled');
refs.button.addEventListener('click', onStart);

let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      refs.button.setAttribute('disabled', 'disabled');
      Notify.failure('"Please choose a date in the future"');
    }
    if (selectedDates[0] > options.defaultDate) {
      refs.button.removeAttribute('disabled');
    }
  },
};

const initFlatpickr = flatpickr(refs.input, options);

function onStart() {
  refs.button.setAttribute('disabled', 'disabled');
  timerId = setInterval(() => {
    const checkDate = initFlatpickr.selectedDates[0];
    const currentTime = Date.now();
    const deltaTime = checkDate - currentTime;
    const remainingTime = convertMs(deltaTime);
    currentInterface(remainingTime);
    console.log(deltaTime);
    if (deltaTime < 1000) {
      clearInterval(timerId);
      Notify.success('"Время вышло!!!"');
    }
  }, 1000);
}

function currentInterface({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
