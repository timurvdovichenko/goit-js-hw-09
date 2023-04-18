// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// import Notiflix, { Loading } from 'notiflix';
import { Notify } from 'notiflix';

const refs = {
  dateSelectInputForm: document.querySelector('#datetime-picker'),
  buttonStartTimer: document.querySelector('button[data-start]'),
  daysTimer: document.querySelector('.value[data-days]'),
  hoursTimer: document.querySelector('.value[data-hours]'),
  minutesTimer: document.querySelector('.value[data-minutes'),
  secondsTimer: document.querySelector('.value[data-seconds]'),
  timerDiv: document.querySelector('.timer'),
};

refs.buttonStartTimer.setAttribute('disabled', true);

// refs.daysTimer.classList = 'flatpickr-weekdays';
refs.timerDiv.style.display = 'flex';
refs.timerDiv.style.margin = '50px';
refs.timerDiv.style.gap = '50px';
refs.timerDiv.style.justifyContent = 'center';
refs.timerDiv.style.alignItems = 'center';
refs.timerDiv.style.fontSize = '35px';
refs.daysTimer.style.fontWeight = '600';
refs.hoursTimer.style.fontWeight = '600';
refs.minutesTimer.style.fontWeight = '600';
refs.secondsTimer.style.fontWeight = '600';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const TIMER_INTERVAL = 1000;
    // let idIterval = null;
    function onStartTimer() {
      refs.buttonStartTimer.disabled = true;

      let setDateInderval = selectedDates[0] - Date.now();

      let idIterval = setInterval(() => {
        if (setDateInderval > 0) {
          setDataToTimer(convertMs(setDateInderval));
          //   console.log(idIterval);
        } else {
          Notify.info("Time's up. Choose another date");
          refs.buttonStartTimer.disabled = false;
          clearInterval(idIterval);
          return;
        }
      }, TIMER_INTERVAL);
      //   flatpicker.clear();
      flatpicker.destroy();
    }

    // if (selectedDates[0] - Date.now() > 0) {
    //   //   console.log('Date in Future');
    //   refs.buttonStartTimer.disabled = false;
    //   Notify.success('You selected a date in the future');
    //   refs.buttonStartTimer.addEventListener('click', onStartTimer);
    // } else {
    //   Notify.failure('Please choose a date in the future');
    //   refs.buttonStartTimer.disabled = true;
    //   return;
    // }

    const promise = new Promise((resolve, reject) => {
      if (selectedDates[0] - Date.now() > 0) {
        resolve(
          (refs.buttonStartTimer.disabled = false),
          Notify.success('You selected a date in the future'),
          refs.buttonStartTimer.addEventListener('click', onStartTimer),
        );
      } else {
        reject(
          Notify.failure('Please choose a date in the future'),
          (refs.buttonStartTimer.disabled = true),
        );
      }
    });
    console.log(
      promise
        .then(() => {
          console.log('Promise success');
        })
        .catch(() => {
          console.log('Promise Fail');
        }),
    );
  },
};

let flatpicker = flatpickr(refs.dateSelectInputForm, options);

// console.log(flatpicker);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function setDataToTimer({ days, hours, minutes, seconds }) {
  //   refs.daysTimer.textContent = days;
  refs.daysTimer.textContent = addLeadingZero(days);
  refs.hoursTimer.textContent = addLeadingZero(hours);
  refs.minutesTimer.textContent = addLeadingZero(minutes);
  refs.secondsTimer.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
