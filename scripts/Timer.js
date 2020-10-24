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
const MAX_MINUTES_VALUE = 60;
const MAX_SECONDS_VALUE = 60;

class Timer {
constructor(){
this.displayHours = null;
this.displayMinutes = null;
this.displaySeconds = null;
this.optionEdit = null;
this.optionPlay = null;
this.optionRefresh = null;
this.alarm = null;

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
: this.displayHours.value;

this.displayMinutes.value > MAX_MINUTES_VALUE
? this.displayMinutes.value = MAX_MINUTES_VALUE
: this.displayMinutes.value;

this.displaySeconds.value > MAX_SECONDS_VALUE
? this.displaySeconds.value = MAX_SECONDS_VALUE
: this.displaySeconds.value;
}

toggleEditIcon(){
    this.optionEdit.classList.toggle('button__edit--is-edit');
}

}


export const timer = new Timer();