document.addEventListener('DOMContentLoaded', () => {
  // new Main();
  const main = new Main();
});

class Main {
  constructor() {
    this._init();
  }

  _init() {
    this._setDate();
    this.countDown = new CountDown();
    this._addEvent();
  }

  _setDate() {
    // Set Date Input Min with Today's Date
    const today = new Date().toISOString().split('T')[0];
    const dateEl = document.getElementById('date-picker');
    dateEl.setAttribute('min', today);
  }

  _addEvent() {
    // Event Listeners
    const countdownForm = document.getElementById('countdownForm');
    const countdownBtn = document.getElementById('countdown-button');
    const completeBtn = document.getElementById('complete-button');

    countdownForm.addEventListener('submit', (event) => this.countDown.setCountdown(event));
    countdownBtn.addEventListener('click', () => this.countDown.reset());
    completeBtn.addEventListener('click', () => this.countDown.reset());
  }
}
