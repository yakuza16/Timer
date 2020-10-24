const domElementsId = {
hoursInputId: 'hours',
minutesInputId: 'minutes',
secondsInputId: 'seconds',
editBtnId: 'edit',
playStopBtnId: 'play',
refreshBtnId: 'refresh',
alarmBtnId: 'alarm',
}

const {hoursInputId,minutesInputId,secondsInputId,editBtnId,playStopBtnId,refreshBtnId,alarmBtnId} = domElementsId;

let isEditable = true;
let isTimerOn = false;
const MAX_HOURS_VALUE = 99;
const MAX_MINUTES_VALUE = 59;
const MAX_SECONDS_VALUE = 59;

let interval;

class Timer {
constructor(){
this.displayHours = null;
this.displayMinutes = null;
this.displaySeconds = null;
this.optionEdit = null;
this.optionPlay = null;
this.optionRefresh = null;
this.alarm = null;

this.choosenHours = null;
this.choosenMinutes = null;
this.choosenSeconds = null;

}

initialize(){
    this.bindToElements();
    this.optionPlay.setAttribute('disabled', true)
    this.addListeners();
}

bindToElements(){
    this.displayHours = document.getElementById(hoursInputId);
    this.displayMinutes = document.getElementById(minutesInputId);
    this.displaySeconds = document.getElementById(secondsInputId);
    this.optionEdit = document.getElementById(editBtnId);
    this.optionPlay = document.getElementById(playStopBtnId);
    this.optionRefresh = document.getElementById(refreshBtnId);
    this.alarm = document.getElementById(alarmBtnId)
}

addListeners(){
this.optionEdit.addEventListener('click',()=> this.setTimer());
this.optionPlay.addEventListener('click', ()=>this.startTimer());
this.optionRefresh.addEventListener('click', ()=>this.refreshTimer())
}

setTimer(){
    this.checkValues();
    this.onOffInputs(isEditable, isTimerOn)
    isEditable = !isEditable;
    if(isEditable === false && isTimerOn === false){
        this.optionPlay.removeAttribute('disabled')
    } else if(isEditable === true){
        isTimerOn = false;
        this.optionPlay.classList.remove('button--is-stop');
        this.optionPlay.setAttribute('disabled', true)
    }
}

startTimer(){
    this.optionPlay.classList.toggle('button--is-stop');
    isTimerOn = !isTimerOn;

    if(isTimerOn === true){
        this.count()
    } else if(isTimerOn === false){
        clearInterval(interval)
    }
}

count(){
    const indexInterval = setInterval(()=>{
    this.displaySeconds.value --;
    this.displaySeconds.value < 10
    ? this.displaySeconds.value = `0${this.displaySeconds.value}`
    : this.displaySeconds.value;

    if(this.displaySeconds.value <= 0){
        this.displayMinutes.value --;
        this.displayMinutes.value < 10
        ? this.displayMinutes.value = `0${this.displayMinutes.value}`
        :
        this.displayMinutes.value;
        this.displaySeconds.value = MAX_SECONDS_VALUE;
    }

    if(this.displayMinutes.value <= 0){
        this.displayHours.value --;
        this.displayHours.value < 10
        ? this.displayHours.value = `0${this.displayHours.value}`
        : this.displayHours.value;
        this.displayMinutes.value = MAX_MINUTES_VALUE;
    }
  
    },1000);
    interval = indexInterval;
}



onOffInputs(isEditable){
    const inputs = [this.displayHours,this.displayMinutes,this.displaySeconds];
if(isEditable === true){
    inputs.forEach(input => input.setAttribute('disabled', true))
    this.toggleEditIcon();
} else if(isEditable === false){
    inputs.forEach(input => input.removeAttribute('disabled'))
    this.toggleEditIcon();
}
}

checkValues(){
this.displayHours.value > MAX_HOURS_VALUE
? this.displayHours.value = MAX_HOURS_VALUE
: this.displayHours.value < 10 
? this.displayHours.value = `0${this.displayHours.value}`
: this.displayHours.value;

this.displayMinutes.value > MAX_MINUTES_VALUE
? this.displayMinutes.value = MAX_MINUTES_VALUE +1
: this.displayMinutes.value < 10
? this.displayMinutes.value = `0${this.displayMinutes.value}`
: this.displayMinutes.value;

this.displaySeconds.value > MAX_SECONDS_VALUE
? this.displaySeconds.value = MAX_SECONDS_VALUE +1
: this.displaySeconds.value < 10
? this.displaySeconds.value = `0${this.displaySeconds.value}`
: this.displaySeconds.value;


this.choosenHours = this.displayHours.value;
this.choosenMinutes = this.displayMinutes.value;
this.choosenSeconds = this.displaySeconds.value;
}

refreshTimer(){
 this.displayHours.value = this.choosenHours ;
this.displayMinutes.value = this.choosenMinutes;
this.displaySeconds.value = this.choosenSeconds;
}

toggleEditIcon(){
    this.optionEdit.classList.toggle('button__edit--is-edit');
}

}


export const timer = new Timer();