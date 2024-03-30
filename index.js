const alarmobj = document.getElementsByClassName('alarm')[0];
const tuneobj = document.getElementsByClassName('tune')[0];
const clockobj = document.getElementsByClassName('clock')[0];
const settingobj = document.getElementsByClassName('setting')[0];

function handleClockBtn() {
    alarmobj.style.display = "block";
    tuneobj.style.display = "none";
    clockobj.style.backgroundColor = "green";
    clockobj.style.color = "#ffff";
    settingobj.style.backgroundColor = "#ffff";
    settingobj.style.color = "black";
}
function handleSettingBtn() {
    alarmobj.style.display = "none";
    tuneobj.style.display = "block";
    clockobj.style.backgroundColor = "#ffff";
    clockobj.style.color = "black";
    settingobj.style.backgroundColor = "green";
    settingobj.style.color = "#ffff";
}
function validateInput(obj) {
    
    let inputValue = obj.value;

    // Remove non-numeric characters
    inputValue = inputValue.replace(/[^0-9]/g, '');

    // Update the input value
    obj.value = inputValue;
}


// alarm functionalities
var currentDate;
var year;
var month;
var day;
var hours;
var minutes;
var seconds;
var hr;
var min;

//alarm variable
var alarmActive = false;
var alarmTimeout;
var flag = false;
var audio = new Audio('./audio1.wav');

// header date functionality
const el1 = document.querySelector(".header");
const stopAL = document.getElementById("stopAlarm");
const goEl = document.getElementById("submitAlarm");

function updateDate(){
    currentDate = new Date();
    year = currentDate.getFullYear();
    month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    day = currentDate.getDate().toString().padStart(2, '0');
    hours = currentDate.getHours().toString().padStart(2, '0');
    minutes = currentDate.getMinutes().toString().padStart(2, '0');
    seconds = currentDate.getSeconds().toString().padStart(2, '0');

    // el1.innerHTML = day+"-"+month+"-"+year+" "+hours+":"+minutes+":"+seconds;
    if ((alarmActive) && (hr == hours) && (min == minutes) && (seconds == "00") && (flag)){
        flag = false;
        playAlarm();
        alarmTimeout = setTimeout(stopAlarm, 60000);
    }
}
function setAlarm(){
    hr = document.getElementById("twoDigitInputHr").value;
    min = document.getElementById("twoDigitInputMin").value;
    if (hr==="" || min===""){
        alert('! fill the box first');
        return;
    }
    if ((parseInt(hr, 10) > 23) || (parseInt(hr, 10) < 0) || (parseInt(min, 10)) > 59 || (parseInt(hr, 10) < 0)){
        alert('!pls put correct time input');
        document.getElementById("twoDigitInputHr").value = "";
        document.getElementById("twoDigitInputMin").value = "";
        return;
    }
    alarmActive = true;
    flag = true;
    alert('alarm set Successfully');
    console.log("alarm activated");
}
function playAlarm(){
    audio.play();
    if((stopAL.style.display == "") || (stopAL.style.display == "none")){
        stopAL.style.display = "inline";
    }
    if (goEl.style.display != "none")
        goEl.style.display = "none";
    
    for(var i=0;i<3;++i){
        document.querySelectorAll(".alarm-audio")[i].disabled = true;
    }
    audio.loop = true;
}
function stopAlarm(){
    audio.pause();
    audio.currentTime = 0;
    alarmActive = false;
    flag = false;
    clearTimeout(alarmTimeout);
    // Reset input values
    document.getElementById("twoDigitInputHr").value = "";
    document.getElementById("twoDigitInputMin").value = "";

    if(stopAL.style.display != "none"){
        stopAL.style.display = "none";
    }
    if ((goEl.style.display == "none") || (goEl.style.display == ""))
        goEl.style.display = "inline";
    
    for(var i=0;i<3;++i){
        document.querySelectorAll(".alarm-audio")[i].disabled = false;
    }
}
function tuneSet(obj){
    var file= obj.value;
    audio = new Audio(file);
}
updateDate();
setInterval(updateDate, 1);