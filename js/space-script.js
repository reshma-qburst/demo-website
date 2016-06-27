var dateToday;
var today = new Date; // get current date
var fields = [];
var outputHistory='';
var previousValue;
window.onload = function() {
  loadProjectOptions();
  loadActivityTypes();
  showDate();
  showNoHistory();
};

var xmlhttpResp = new XMLHttpRequest();
xmlhttpResp.overrideMimeType("application/json");
xmlhttpResp.open('GET', 'js/project-options.json', true);
xmlhttpResp.onreadystatechange = function () {
          if (xmlhttpResp.readyState == 4 && xmlhttpResp.status == "200") {
         	loadProjectOptions(JSON.parse(xmlhttpResp.responseText));
          }
    };
xmlhttpResp.send(null);

function loadProjectOptions(projectList){
	var output='';
	for (i in projectList) {
		output += "<option id='"+projectList[i].id+"' value='"+projectList[i].value+"' ></option>";
		document.getElementById("projectList").innerHTML = output;
	}
}

var xmlhttpActivityResp = new XMLHttpRequest();
xmlhttpActivityResp.overrideMimeType("application/json");
xmlhttpActivityResp.open('GET', 'js/activity-type.json', true);
xmlhttpActivityResp.onreadystatechange = function () {
          if (xmlhttpActivityResp.readyState == 4 && xmlhttpActivityResp.status == "200") {
         	loadActivityTypes(JSON.parse(xmlhttpActivityResp.responseText));
          }
    };
xmlhttpActivityResp.send(null);

function loadActivityTypes(activityList){
	var output='';
	for (j in activityList) {
		output += "<option value='"+activityList[j].id+"'>"+activityList[j].value+"</option>"
		document.getElementById("activityType").innerHTML = output;
	}
}

function showDate() {
	var datesArray = [];
	var first = today.getDate();
	dateToday = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
	var outputDate='';
	for(var i=0; i<8; i++){		
		var day = new Date(today.setDate(first-i));
		datesArray.push(day.getDate()+'/'+(day.getMonth()+1)+'/'+day.getFullYear());
	}
	for(var k=7;k>=0;k--){
		if(k>0)
			outputDate += "<option value='"+k+"'>"+datesArray[k]+"</option>";
		else
			outputDate += "<option value='"+k+"' selected>"+datesArray[k]+"</option>";
	}
	document.getElementById("postedFor").innerHTML = outputDate;
}

function validateFields(){
	if(document.getElementById("project").value == ""){
		var projectId = document.getElementById("projectError");
		showError(projectId);
	}else if(document.getElementById("activityType").value == ""){
		var activityId = document.getElementById("activityTypeError");
		showError(activityId);
	}else if(document.getElementById("message").value == ""){
		var messageId = document.getElementById("messageError");
		showError(messageId);
	}
}

function onFieldChange(id,idError){
	if(document.getElementById(id).value != ""){
		document.getElementById(idError).style.display = "none";
	}else{
		document.getElementById(idError).style.display = "block";
	}
}

function showError(id){
	id.style.display = "block";
	id.setAttribute("class","invalid");
	id.innerHTML = "This field may not be empty";
}

var op=0;
function saveDailyStatus(){
	validateFields();
	var e = document.getElementById("activityType");
	var e1 = document.getElementById("project");
	var e2 = document.getElementById("postedFor");
	var e3 = document.getElementById("message");
	var e4 = document.getElementById("timeSpent");
	var e5 = document.getElementById("timeSpent_1");
	
	if(e.options[e.selectedIndex].text != 'Select'){
		fields.push(e.options[e.selectedIndex].text);
		fields.push(e1.value);
		fields.push(e2.options[e2.selectedIndex].text);
		fields.push(e3.value);
		fields.push(e4.options[e4.selectedIndex].text+":"+e5.options[e5.selectedIndex].text);

		if(e2.options[e2.selectedIndex].text != null){
			calculateDate(fields,e2.options[e2.selectedIndex].text,e2.selectedIndex,e2,e4.options[e4.selectedIndex].text);
		}
		if(e4.options[e4.selectedIndex].text != null){
			calculateTime(e4,e4.options[e4.selectedIndex].text,e2.options[e2.selectedIndex].text,fields);
		}

		outputHistory = "";
		document.getElementById("nohistory").style.display = "none";
		if(op<fields.length){
			outputHistory += "<div class='well padding-10 animated fadeInUp fadeInBottom' data-animate='fadeInUp'>"
				+"<form class='smart-form'><div class='row padding-top-10 breakWord'><div class='col col-2 dailyStatusHistoryContainer'>"
				+"<span>end-of-day</span><br><span>"+fields[op+2]+"</span><br><br>"
				+"<span><small id='postedOn'>Posted on: "+dateToday+" </small></span><br>"
				+"<span><small id='postedTime'>"+today.getHours()+":"+today.getMinutes()+":"+today.getSeconds()+"</small><span></span></span></div>"
				+"<div class='col col-8 dailyStatusHistoryContainer'>"
				+"<span><strong>"+fields[op+3]+"</strong></span><br>"
				+"</div><div class='col col-2'><span>"+fields[op+4]+" hour(s)</span><br>"
				+"<span>"+fields[op]+"</span><br><br><span></span><span>"+fields[op+1]+"</span><br></div></div></form></div>";

				previousValue = fields[op+2];
				document.getElementById("history").innerHTML += outputHistory;
				op += 5;
		}
	}
}

function showNoHistory(){
	if(fields.length == 0){
		outputHistory += "<div class='well padding-10 animated fadeInUp fadeInBottom' data-animate='fadeInUp'>" 
						+"<form class='smart-form'><div class='row padding-top-10'>"
						+"<p class='center'><strong>No daily status history available</strong></p></div></form></div>";
		document.getElementById("nohistory").innerHTML = outputHistory;
	}
}
function calculateTime(e,selectedTime,date,arrayHistory){
	var textToFind;
	if(previousValue == date && selectedTime<8){
		textToFind = 0;
	}else if(selectedTime < 8) {
		textToFind = 8-selectedTime;
	}
	for (var i = 0; i < e.options.length; i++) {
	    if (e.options[i].text === "0"+textToFind) {
	        e.selectedIndex = i;
	        break;
	    }
	}
}
function calculateDate(arrayHistory,selectedDate,index,e,time){
	if(index == 7 || index == 7 && time <8){
		e.selectedIndex = index;
	}else if(time<8){
		e.selectedIndex = index;
	}else{
		e.selectedIndex = index+1;
	}
}