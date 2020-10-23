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
    this.bindToElements()
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




}


export const timer = new Timer();