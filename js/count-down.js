let countdownTitle = '';
let countdownDate = '';
let countdownValue;
let countdownActive;
let savedCountdown;

// Populate Countdown / Complete UI
class CountDown {
  constructor() {
    this._init();
  }

  _init() {
    this.displayControls = new DisplayControls();
    this._restorePreviousCountdown();
  }

  // On load, check Local Storage
  _restorePreviousCountdown() {
    // Get countdown from localStorage if available
    if (localStorage.getItem('countdown')) {
      savedCountdown = JSON.parse(localStorage.getItem('countdown'));
      countdownTitle = savedCountdown.title;
      countdownDate = savedCountdown.date;
      countdownValue = new Date(countdownDate).getTime();
      this.updateDOM();
    }
  }

  updateDOM() {
    countdownActive = setInterval(() => {
      // Calculate left time
      const time = this._calculateTime();
      // If the countdown has ended, show complete
      this._showCountDownResult(time);
    }, 1000);
  }

  _calculateTime() {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const now = new Date().getTime();

    const distance = countdownValue - now;
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    const time = { distance, days, hours, minutes, seconds };
    return time;
  }

  _showCountDownResult(time) {
    // If the countdown has ended, show complete
    if (time.distance < 0) {
      this._showComplete();
    } else {
      // Else, show the countdown in progress, Populate Countdown
      this._showCountdown(time);
    }
  }

  // If the countdown has ended, show complete
  _showComplete() {
    const completeElInfo = document.getElementById('complete-info');
    completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;

    clearInterval(countdownActive);

    // Display Complete Element
    this.displayControls.displayCompleteEl();
  }

  _showCountdown(time) {
    const countdownElTitle = document.getElementById('countdown-title');
    const timeElements = document.querySelectorAll('span');

    countdownElTitle.textContent = `${countdownTitle}`;
    timeElements[0].textContent = `${time.days}`;
    timeElements[1].textContent = `${time.hours}`;
    timeElements[2].textContent = `${time.minutes}`;
    timeElements[3].textContent = `${time.seconds}`;

    // Display Countdown Element
    this.displayControls.displayCountdownEl();
  }

  // Take Values from Form Input
  setCountdown(e) {
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    savedCountdown = {
      title: countdownTitle,
      date: countdownDate,
    };

    // Check for valid date
    if (countdownDate === '') {
      alert('Please select a date for the countdown');
    } else if (countdownTitle === '') {
      alert('Please input title');
    } else {
      // Store Local Storage
      localStorage.setItem('countdown', JSON.stringify(savedCountdown));
      // Get number version of current Date, updateDOM
      countdownValue = new Date(countdownDate).getTime();
      this.updateDOM();
    }
  }

  // Reset All Values
  reset() {
    // Stop the countdown
    clearInterval(countdownActive);

    // Reset values
    this._resetValues();

    // Hide Countdowns, show Input
    this.displayControls.displayInputContainer();
  }

  _resetValues() {
    // Reset values
    countdownTitle = '';
    countdownDate = '';
    // countdownValue = Date;
    localStorage.removeItem('countdown');
  }
}
