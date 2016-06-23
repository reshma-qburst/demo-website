var counter = 0;
var images;
var modalImg;
var titleText;
var descText;
var nextElem;
var prevElem;

function init_map(lat,long,content,addr){
	if(addr == 'address1'){
		setActiveClass("1","active");
		setActiveClass("2","");
		setActiveClass("3","");
	}else if(addr == 'address2'){
		setActiveClass("2","active");
		setActiveClass("1","");
		setActiveClass("3","");
	}else{
		setActiveClass("3","active");
		setActiveClass("1","");
		setActiveClass("2","");
	}
	var mapOptions = {
			zoom:10,
			center:new google.maps.LatLng(parseFloat(lat),parseFloat(long)),
			mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById('gmap_canvas'), mapOptions);
	marker = new google.maps.Marker({
		map: map,position: new google.maps.LatLng(parseFloat(lat),parseFloat(long))
	});
	infowindow = new google.maps.InfoWindow({
		content: content
	});
	google.maps.event.addListener(marker, 'click', function(){
		infowindow.open(map,marker);
	});
	infowindow.open(map,marker);
}

function setActiveClass(div,className){
	document.getElementById("addTextDiv"+div).setAttribute("class","addTextDiv "+className);
}

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
	
	for (var k = 0; k < images.length; k++) {
		   images[k].onclick = function(){

		   	var newId = this.id;
		   	newId = newId.split('-');
		   	counter = parseInt(newId[1]);

			modal.style.display = "block";

		   	nextElem = document.getElementById("next");
		   	prevElem = document.getElementById("previous");

			if(document.getElementById("titleTextNew"))
			   	document.getElementById("titleTextNew").setAttribute("id","titleText");
			if(document.getElementById("img01New"))
			   	document.getElementById("img01New").setAttribute("id","img01");
			if(document.getElementById("captionNew"))
			   	document.getElementById("captionNew").setAttribute("id","caption");

			if(counter == 0){
				disablePrev();
			} else if(counter == images.length-2){
				disableNext();
				enablePrev();
			}else{
				enableNext();
				enablePrev();
			}

			modalImg.setAttribute("class","modal-content");
			titleText.setAttribute("class","title-content");
		   	modalImg.src = this.src;
		   	modalImg.alt = this.alt;
		   	titleText.innerHTML = this.title;
		   	descText.innerHTML = this.nextElementSibling.innerHTML;
		}
	}
}

function slidePrev(){
	counter = counter - 1;
	if(images[0].src == images[counter].src){
		disablePrev();
		setContent();
	}else{
		enableNext();
		if(counter >= 0){
			setContent();
		}else {
			counter = images.length - 2;
		}
	}
}

function slideNext(){
	counter += 1;
	if(counter == images.length-2){
		disableNext();
		setContent();
	}else{
		enablePrev();
		if(counter < images.length - 1){
			setContent();
		}else {
			counter = 0;
		}
	}
}
function setContent() {
	modalImg.src = images[counter].src;
	descText.innerHTML = images[counter].nextElementSibling.innerHTML;
	titleText.innerHTML = images[counter].title;
}