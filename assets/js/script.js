var xmlhttp = new XMLHttpRequest();
xmlhttp.overrideMimeType("application/json");
xmlhttp.open('GET', 'gallery-item.json', true);
xmlhttp.onreadystatechange = function () {
          if (xmlhttp.readyState == 4 && xmlhttp.status == "200") {
         	updateMe(JSON.parse(xmlhttp.responseText));
          }
    };
xmlhttp.send(null);

function updateMe(galleryArray){
	var output='';
	for (i in galleryArray) {
	    output += 	"<div class='responsive'><div class='img'>"
	     			+"<img src='"+galleryArray[i].src+"' alt='"+galleryArray[i].alt+"' title='"+galleryArray[i].title+"' width='300' height='200'>"
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
		   		modal.style.display = "block";
				if(document.getElementById("titleTextNew"))
				   	document.getElementById("titleTextNew").setAttribute("id","titleText");
				if(document.getElementById("img01New"))
				   	document.getElementById("img01New").setAttribute("id","img01");
				if(document.getElementById("captionNew"))
				   	document.getElementById("captionNew").setAttribute("id","caption");
				document.getElementById("previous").setAttribute("class","previous");
				document.getElementById("next").setAttribute("class","next");
				document.getElementById("img01").setAttribute("class","modal-content");
				document.getElementById("titleText").setAttribute("class","title-content");
		   		modalImg.src = this.src;
		   		modalImg.alt = this.alt;
		   		titleText.innerHTML = this.title;
		   		descText.innerHTML = this.nextElementSibling.innerHTML;
		}
	}
}

var j = 0;
function swipe(id){
	
	var images = document.getElementsByTagName('img');
	document.getElementById("img01").src = images[j].src;
	document.getElementById("caption").innerHTML = images[j].nextElementSibling.innerHTML;
	document.getElementById("titleText").innerHTML = images[j].title;

	if(j < images.length - 2){
		j++; 
	}
	else {
		j = 0;
		if(id=='next'){
			if(document.getElementById("img01").src == images[0].src){
				console.log('first image' + images[0].src);
			}
			document.getElementById("next").setAttribute("class","disabled");
			document.getElementById("next").setAttribute("onclick","");

			document.getElementById("previous").setAttribute("class","previous");
			document.getElementById("previous").setAttribute("onclick","swipe('previous')");
		}else{
			if (document.getElementById("img01").src == images[images.length - 2].src){
				document.getElementById("previous").setAttribute("class","disabled");
				document.getElementById("previous").setAttribute("onclick","swipe('previous')");

				document.getElementById("next").setAttribute("class","next");
				document.getElementById("next").setAttribute("onclick","swipe('next')");
			}
		}
	}
}