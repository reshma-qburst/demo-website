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
	var myOptions = {
			zoom:10,
			center:new google.maps.LatLng(parseFloat(lat),parseFloat(long)),
			mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById('gmap_canvas'), myOptions);
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
	var i;
	for (i = 0; i < images.length; i++) {
		   images[i].onclick = function(){
		   		modal.style.display = "block";
		   		modalImg.src = this.src;
		   		modalImg.alt = this.alt;
		   		titleText.innerHTML = this.title;
		   		descText.innerHTML = this.nextElementSibling.innerHTML;
		}
	}
}