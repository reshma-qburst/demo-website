var counter = 0;
var images;
var modalImg;
var titleText;
var descText;
var nextElem;
var prevElem;
var modal;

var xmlhttp = new XMLHttpRequest();
xmlhttp.overrideMimeType("application/json");
xmlhttp.open('GET', 'gallery-item.json', true);
xmlhttp.onreadystatechange = function () {
          if (xmlhttp.readyState == 4 && xmlhttp.status == "200") {
         	displayGallery(JSON.parse(xmlhttp.responseText));
          }
    };
xmlhttp.send(null);

function disableNext(){
	setAttribute(nextElem,"class","disabled");
	setAttribute(nextElem,"onclick","");
}
function disablePrev(){
	setAttribute(prevElem,"class","disabled");
	setAttribute(prevElem,"onclick","");
	enableNext();
}
function setAttribute(elem,type1,type2){
	elem.setAttribute(type1,type2);
}
function enablePrev(){
	setAttribute(prevElem,"class","previous");
	setAttribute(prevElem,"onclick","slidePrev('previous')");
}
function enableNext(){
	setAttribute(nextElem,"class","next");
	setAttribute(nextElem,"onclick","slideNext('next')");
}
function displayGallery(galleryArray){
	var output='';
	for (i in galleryArray) {
	    output += 	"<div class='responsive'><div class='img'>"
	     			+"<img id='image-"+i+"' src='"+galleryArray[i].src+"' alt='"+galleryArray[i].alt+"' title='"+galleryArray[i].title+"' width='300' height='200'>"
	        		+"<div style='display:none;'>"+galleryArray[i].desc+"</div>"
	        		+"<div class='title'>"+galleryArray[i].title+"</div>"
	        		+"</div></div>";
	        		document.getElementById("banner-img-wrapper").innerHTML = output;
	}

	images = document.getElementsByTagName('img');
	modalImg = document.getElementById("img01");
	titleText = document.getElementById("titleText");
	descText = document.getElementById("caption");
	modal = document.getElementById('myModal');
		
	for (var k = 0; k < images.length; k++) {
		images[k].onclick = function(){
		   	var newId = this.id;
		   	newId = newId.split('-');
		   	counter = parseInt(newId[1]);
			modal.style.display = "block";
		   	nextElem = document.getElementById("next");
		   	prevElem = document.getElementById("previous");
			setId();
			setAttribute(modalImg,"class","modal-content");
			setAttribute(titleText,"class","title-content");
			setModalContent();
		}
	}
}
function slidePrev(){
	counter -= 1;
	setModalContent();
	if(counter >= 0){
		enableNext();
		setContent();
	}else {
		counter = images.length - 2;
	}
}
function slideNext(){
	counter += 1;
	setModalContent();
	if(counter < images.length - 1){
		enablePrev();
		setContent();
	}else {
		counter = 0;
	}
}
function setContent() {
	modalImg.src = images[counter].src;
	modalImg.alt = images[counter].alt;
	descText.innerHTML = images[counter].nextElementSibling.innerHTML;
	titleText.innerHTML = images[counter].title;
}
function setModalContent(){
	if(counter == 0){
		disablePrev();
	} else if(counter == images.length-2){
		disableNext();
		enablePrev();
	}else{
		enableNext();
		enablePrev();
	}
	setContent();
}
function closeModal(){
	if(titleText)
		titleText.setAttribute("id","titleTextNew");
	if(modalImg)
		modalImg.setAttribute("id","img01New");
	if(descText)
		descText.setAttribute("id","captionNew");
		setAttribute(document.getElementById("img01New"),"class","");
		setAttribute(document.getElementById("titleTextNew"),"class","");
		prevElem.setAttribute("class","");
		nextElem.setAttribute("class","");
		setTimeout(function() {
			modal.style.display = "none";
		}, 500);
}
function setId() {
	if(document.getElementById("titleTextNew"))
		setAttribute(document.getElementById("titleTextNew"),"id","titleText");
	if(document.getElementById("img01New"))
	   	setAttribute(document.getElementById("img01New"),"id","img01");
	if(document.getElementById("captionNew"))
	   setAttribute(document.getElementById("captionNew"),"id","caption");
}
