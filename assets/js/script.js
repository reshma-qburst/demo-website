var xmlhttp = new XMLHttpRequest();
xmlhttp.overrideMimeType("application/json");
xmlhttp.open('GET', 'gallery-item.json', true);
xmlhttp.onreadystatechange = function () {
          if (xmlhttp.readyState == 4 && xmlhttp.status == "200") {
         	displayGallery(JSON.parse(xmlhttp.responseText));
          }
    };
xmlhttp.send(null);


var countPrev = 0;
var countNext = 0;

function disableNext(){
	document.getElementById("next").setAttribute("class","disabled");
	document.getElementById("next").setAttribute("onclick","");
	document.getElementById("previous").setAttribute("class","previous");
	document.getElementById("previous").setAttribute("onclick","slidePrev('previous')");
}
function disablePrev(){
	document.getElementById("previous").setAttribute("class","disabled");
	document.getElementById("previous").setAttribute("onclick","");
	document.getElementById("next").setAttribute("class","next");
	document.getElementById("next").setAttribute("onclick","slideNext('next')");
}
function enableArrows(){
	document.getElementById("next").setAttribute("class","next");
	document.getElementById("next").setAttribute("onclick","slideNext('next')");
	document.getElementById("previous").setAttribute("class","previous");
	document.getElementById("previous").setAttribute("onclick","slidePrev('previous')");
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

	var images = document.getElementsByTagName('img');
	var modalImg = document.getElementById("img01");
	var titleText = document.getElementById("titleText");
	var descText = document.getElementById("caption");
	
	for (var k = 0; k < images.length; k++) {

		   images[k].onclick = function(){

		   	var newId = this.id;
		   	newId = newId.split('-');
		   	countNext = parseInt(newId[1]);

		   	var arrayLength = images.length;
		   	countPrev = arrayLength - 1;
		   	if(images[arrayLength-2].src != this.src){
		   		countPrev = parseInt(newId[1]);
		   	}

		   		modal.style.display = "block";
				if(document.getElementById("titleTextNew"))
				   	document.getElementById("titleTextNew").setAttribute("id","titleText");
				if(document.getElementById("img01New"))
				   	document.getElementById("img01New").setAttribute("id","img01");
				if(document.getElementById("captionNew"))
				   	document.getElementById("captionNew").setAttribute("id","caption");
				if(images[0].src == this.src){
					disablePrev();
				} else if(images[arrayLength-2].src == this.src){
					disableNext();
				}else{
					enableArrows();
				}

				document.getElementById("img01").setAttribute("class","modal-content");
				document.getElementById("titleText").setAttribute("class","title-content");
		   		modalImg.src = this.src;
		   		modalImg.alt = this.alt;
		   		titleText.innerHTML = this.title;
		   		descText.innerHTML = this.nextElementSibling.innerHTML;
		}
	}
}

function slidePrev(){
	
	var images = document.getElementsByTagName('img');
	if(images[0].src == images[countPrev].src){
		disablePrev();
	}else{
		document.getElementById("next").setAttribute("class","next");
		document.getElementById("next").setAttribute("onclick","slideNext('next')");
		if(countPrev > 0){
			document.getElementById("img01").src = images[countPrev-1].src;
			document.getElementById("caption").innerHTML = images[countPrev-1].nextElementSibling.innerHTML;
			document.getElementById("titleText").innerHTML = images[countPrev-1].title;
			countPrev --;
			countNext = countPrev+1;
		}else {
			countPrev = images.length - 2;
		}
	}
}

function slideNext(){
	countNext += 1;
	var imagesArray = document.getElementsByTagName('img');
	if(imagesArray[imagesArray.length-1].src == imagesArray[countNext].src){
		disableNext();
	}else{
		document.getElementById("previous").setAttribute("class","previous");
		document.getElementById("previous").setAttribute("onclick","slidePrev('previous')");
		if(countNext < imagesArray.length - 1){
			document.getElementById("img01").src = imagesArray[countNext].src;
			document.getElementById("caption").innerHTML = imagesArray[countNext].nextElementSibling.innerHTML;
			document.getElementById("titleText").innerHTML = imagesArray[countNext].title;
			countPrev = countNext+1;
		}else {
			countNext = 0;
		}
	}
}