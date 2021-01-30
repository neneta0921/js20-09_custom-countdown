class DisplayControls {
  constructor() {
    this.inputContainer = document.getElementById('input-container');
    this.countdownEl = document.getElementById('countdown');
    this.completeEl = document.getElementById('complete');
    this._init();
  }

  _init() {
    this.displayInputContainer();
  }

  displayInputContainer() {
    this.countdownEl.hidden = true;
    this.completeEl.hidden = true;
    this.inputContainer.hidden = false;
  }

  displayCountdownEl() {
    this.countdownEl.hidden = false;
    this.completeEl.hidden = true;
    this.inputContainer.hidden = true;
  }

  displayCompleteEl() {
    this.countdownEl.hidden = true;
    this.completeEl.hidden = false;
    this.inputContainer.hidden = true;
  }
}
