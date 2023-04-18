import { Notify } from 'notiflix';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      // console.log(new Date());

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

const refs = {
  form: document.querySelector('form'),
};

refs.form.addEventListener('submit', onSubmitForm);

function onSubmitForm(evt) {
  evt.preventDefault();

  //disable button
  refs.form.lastElementChild.disabled = true;

  const { delay, step, amount } = evt.target.elements;

  // console.log(new Date());
  // set delay to create promises
  let totalDelay = delay.valueAsNumber - step.valueAsNumber;

  if (delay.valueAsNumber < 0 || step.valueAsNumber < 0 || amount.valueAsNumber <= 0) {
    Notify.info(`Please enter number greater or equal zero`);
    return;
  } else {
    // cycle for create promises
    for (let i = 1; i <= amount.valueAsNumber; i += 1) {
      totalDelay += step.valueAsNumber;
      createPromise(i, totalDelay)
        .then(({ position, delay }) => {
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          console.log(`❌ Rejected promise ${position} in ${delay}ms`);
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }
  }

  // enable button until total timeout will pass
  setTimeout(() => {
    refs.form.lastElementChild.disabled = false;
  }, totalDelay);
}
