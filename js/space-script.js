window.onload = function() {
  loadProjectOptions();
  loadActivityTypes();
  showDate();
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
	var today = new Date; // get current date
	var first = today.getDate(); // First day is the day of the month - the day of the week
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
function checkEmptyFields(){
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
var fields = [];
function saveDailyStatus(){
	checkEmptyFields();
	var e = document.getElementById("activityType");
	var e1 = document.getElementById("project");
	fields.push(e.options[e.selectedIndex].text);
	fields.push(e1.options[e1.selectedIndex].text);
	for(var i=0;i<fields.length;i++){
		console.log(fields[i]);
	}
}