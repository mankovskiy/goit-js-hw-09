import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  button: document.querySelector('button'),
};
const formData = {};

refs.form.addEventListener('input', onFormInput);
refs.form.addEventListener('submit', onFormSubmit);

function onFormInput(e) {
  e.preventDefault();
  formData[e.target.name] = Number(e.target.value);
}

function onFormSubmit(e) {
  e.preventDefault();
  Promise.all(arrayPromise(formData));
}

function arrayPromise({ delay, step, amount }) {
  const array = [];
  let delayTime = delay;
  for (let position = 1; position <= amount; position += 1) {
    delayTime += step;

    array.push(
      createPromise(position, delayTime)
        .then(({ position, delay }) => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })

        .catch(({ position, delay }) => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        }),
    );
  }
  return array;
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
        // Fulfill
      } else {
        reject({ position, delay });
        // Reject
      }
    }, delay);
  });
}
