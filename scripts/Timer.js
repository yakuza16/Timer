const cssClassModifiers = {
  alarmModifier: "button__alarm--is-active",
  editModifier: "button__edit--is-edit",
  stopModifier: "button--is-stop",
};

const { alarmModifier, editModifier, stopModifier } = cssClassModifiers;

const domElementsId = {
  alarmBtnId: "alarm",
  editBtnId: "edit",
  hoursInputId: "hours",
  minutesInputId: "minutes",
  playStopBtnId: "play",
  refreshBtnId: "refresh",
  secondsInputId: "seconds",
};

const {
  hoursInputId,
  minutesInputId,
  secondsInputId,
  editBtnId,
  playStopBtnId,
  refreshBtnId,
  alarmBtnId,
} = domElementsId;

let isEditable = true;
let isTimerOn = false;
const MAX_HOURS_VALUE = 99;
const MAX_MINUTES_VALUE = 60;
const MAX_SECONDS_VALUE = 59;
const PLUS_ONE_SECOND = 1;

let interval;

class Timer {
  constructor() {
    this.displayHours = null;
    this.displayMinutes = null;
    this.displaySeconds = null;
    this.optionEdit = null;
    this.optionPlay = null;
    this.optionRefresh = null;
    this.alarm = null;
    this.alarmSound = new Audio("./assets/clockRing.mp3");
    this.choosenHours = null;
    this.choosenMinutes = null;
    this.choosenSeconds = null;
  }

  initialize() {
    this.bindToElements();
    this.displaySeconds.focus();
    this.disableButton(this.optionPlay);
    this.addListeners();
  }

  bindToElements() {
    this.displayHours = document.getElementById(hoursInputId);
    this.displayMinutes = document.getElementById(minutesInputId);
    this.displaySeconds = document.getElementById(secondsInputId);
    this.optionEdit = document.getElementById(editBtnId);
    this.optionPlay = document.getElementById(playStopBtnId);
    this.optionRefresh = document.getElementById(refreshBtnId);
    this.alarm = document.getElementById(alarmBtnId);
  }

  addListeners() {
    this.optionEdit.addEventListener("click", () => this.setTimer());
    this.optionPlay.addEventListener("click", () => this.startTimer());
    this.optionRefresh.addEventListener("click", () => this.refreshTimer());
    this.alarm.addEventListener("click", () => this.restartTimer());
  }

  setTimer() {
    this.checkValues();
    this.onOffInputs(isEditable, isTimerOn);
    isEditable = !isEditable;
    if (isEditable === false && isTimerOn === false) {
      this.enableButton(this.optionPlay);
    } else if (isEditable === true) {
      isTimerOn = false;
      clearInterval(interval);
      this.removeCssModifier(this.optionPlay, stopModifier);
      this.disableButton(this.optionPlay);
    }
  }

  startTimer() {
    this.toggleCssModifier(this.optionPlay, stopModifier);
    isTimerOn = !isTimerOn;

    if (isTimerOn === true) {
      this.count();
    } else if (isTimerOn === false) {
      clearInterval(interval);
    }
  }

  count() {
    interval = setInterval(() => {
      this.displaySeconds.value--;
      this.displaySeconds.value < 10
        ? (this.displaySeconds.value = `0${this.displaySeconds.value}`)
        : this.displaySeconds.value;

      if (this.displaySeconds.value <= 0) {
        if (this.displayMinutes.value > 0) {
          this.displayMinutes.value--;
          this.displayMinutes.value < 10
            ? (this.displayMinutes.value = `0${this.displayMinutes.value}`)
            : this.displayMinutes.value;
          this.displaySeconds.value = MAX_SECONDS_VALUE;
        } else if (
          this.displaySeconds.value <= 0 &&
          this.displayHours.value <= 0
        ) {
          this.displaySeconds.value = "00";
          clearInterval(interval);
          this.ringAlarm();
        }
      }

      if (this.displayMinutes.value <= 0) {
        if (this.displayHours.value > 0) {
          this.displayHours.value--;
          this.displayHours.value < 10
            ? (this.displayHours.value = `0${this.displayHours.value}`)
            : this.displayHours.value;
          this.displayMinutes.value = MAX_MINUTES_VALUE;
        } else {
          this.displayMinutes.value = "00";
          this.displayHours.value = "00";
        }
      }
    }, 1000);
  }

  ringAlarm() {
    this.disableButton(this.optionRefresh);
    this.disableButton(this.optionEdit);
    this.disableButton(this.optionPlay);
    this.removeCssModifier(this.alarm, alarmModifier);
    this.alarmSound.play();
  }

  restartTimer() {
    isTimerOn = false;
    this.removeCssModifier(this.optionPlay, stopModifier);
    this.disableButton(this.optionPlay);
    this.enableButton(this.optionRefresh);
    this.enableButton(this.optionEdit);

    this.choosenHours = null;
    this.choosenMinutes = null;
    this.choosenSeconds = null;
    this.alarm.classList.add(alarmModifier);
    this.alarmSound.pause();
  }

  onOffInputs(isEditable) {
    const inputs = [
      this.displayHours,
      this.displayMinutes,
      this.displaySeconds,
    ];
    if (isEditable === true) {
      inputs.forEach((input) => this.disableButton(input));
      this.toggleCssModifier(this.optionEdit, editModifier);
    } else if (isEditable === false) {
      inputs.forEach((input) => this.enableButton(input));
      this.toggleCssModifier(this.optionEdit, editModifier);
    }
  }

  checkValues() {
    this.displayHours.value > MAX_HOURS_VALUE
      ? (this.displayHours.value = MAX_HOURS_VALUE)
      : this.displayHours.value;

    this.displayMinutes.value > MAX_MINUTES_VALUE
      ? (this.displayMinutes.value = MAX_MINUTES_VALUE)
      : this.displayMinutes.value;

    this.displaySeconds.value > MAX_SECONDS_VALUE
      ? (this.displaySeconds.value = MAX_SECONDS_VALUE + PLUS_ONE_SECOND)
      : this.displaySeconds.value;

    this.choosenHours = this.displayHours.value;
    this.choosenMinutes = this.displayMinutes.value;
    this.choosenSeconds = this.displaySeconds.value;
  }

  refreshTimer() {
    this.displayHours.value = this.choosenHours;
    this.displayMinutes.value = this.choosenMinutes;
    this.displaySeconds.value = this.choosenSeconds;
  }

  disableButton(element) {
    element.setAttribute("disabled", true);
  }

  enableButton(element) {
    element.removeAttribute("disabled");
  }

  toggleCssModifier(element, cssModifier) {
    element.classList.toggle(cssModifier);
  }

  removeCssModifier(element, cssModifier) {
    element.classList.remove(cssModifier);
  }
}

export const timer = new Timer();
