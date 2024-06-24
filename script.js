const timeRemaining = document.querySelector('.time-remaining');
const runBtn = document.querySelector('.run-btn');
let interval;
const allAtribs = document.querySelectorAll('.atrib');

allAtribs.forEach((atrib) => {
  atrib.onclick = (e) => {
    document.querySelectorAll('.atrib').forEach((atrib) => atrib.className = 'atrib atrib-inactive');
    e.target.className = 'atrib atrib-active';
  }
});

const formatClockNumber = (n) => `${n>9?n:'0'+n}`;

const subtractTime = (currentTime) => {
  const [hours, minutes, seconds] = currentTime.split(':').map((number) => Number(number));
  const newSeconds = seconds - 1;
  const newMinutes = newSeconds >= 0 ? minutes : minutes - 1;
  const newHours = newMinutes >= 0 ? hours : hours - 1;
  return `${formatClockNumber(newHours>=0?newHours:0)}`
    + `:${formatClockNumber(newMinutes>=0?newMinutes:59)}`
    + `:${formatClockNumber(newSeconds>=0?newSeconds:59)}`;
};

const addTime = (currentTime) => {
  const [hours, minutes, seconds] = currentTime.split(':').map((number) => Number(number));
  const newSeconds = seconds + 1;
  const newMinutes = newSeconds > 59 ? minutes + 1 : minutes;
  const newHours = newMinutes > 59 ? hours + 1: hours;
  return `${formatClockNumber(newHours)}`
    + `:${formatClockNumber(newMinutes<=59?newMinutes:0)}`
    + `:${formatClockNumber(newSeconds<=59?newSeconds:0)}`;
};

const addSelectedAtribTime = () => {
  const selectedAtribSpan = document.querySelector('.atrib.atrib-active .atrib-time');
  selectedAtribSpan.innerText = addTime(selectedAtribSpan.innerText);
};

const subtractTimeRemaining = () => {
  timeRemaining.innerText = subtractTime(timeRemaining.innerText);
};

runBtn.onclick = () => {
  if (runBtn.innerText === 'Start') interval = setInterval(() => {
    subtractTimeRemaining();
    addSelectedAtribTime();
  }, 1000);
  else clearInterval(interval);
  runBtn.innerText = runBtn.innerText === 'Start' ? 'Pause' : 'Start';
};
