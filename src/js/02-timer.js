// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix, { Loading } from 'notiflix';

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

// console.dir(refs.timerDiv.children);

// refs.timerDiv.children[0].className = 'flatpickr-day';
// refs.timerDiv.children[1].className = 'flatpickr-day';
// refs.timerDiv.children[2].className = 'flatpickr-day';
// refs.timerDiv.children[3].className = 'flatpickr-day';
// 1. set refs to input, button 'Start', field (days, hours, minutes, seconds)
// 2. Set to input field DATE check form
// 3. function to start timer

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    function onStartTimer() {
      refs.buttonStartTimer.disabled = true;
      let idIterval = setInterval(() => {
        if (selectedDates[0] - Date.now() > 0) {
          setDataToTimer(convertMs(selectedDates[0] - Date.now()));
          console.log(idIterval);
        } else {
          Notiflix.Notify.info("Time's up. Choose another date");
          refs.buttonStartTimer.disabled = false;
          clearInterval(idIterval);
          return;
        }
      }, 1000);
    }

    if (selectedDates[0] - Date.now() <= 0) {
      // console.log('Date in Past');
      Notiflix.Notify.failure('Please choose a date in the future');
      refs.buttonStartTimer.disabled = true;
      return;
    }

    if (selectedDates[0] - Date.now() > 0) {
      //   console.log('Date in Future');
      refs.buttonStartTimer.disabled = false;
      Notiflix.Notify.success('You selected date in future');
      refs.buttonStartTimer.addEventListener('click', onStartTimer);
    }
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
