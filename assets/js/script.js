
	function updateMe(){
	var output='';
	for (i in galleryArray) {
        output += 	"<div class='responsive'><div class='img'>"
        					+"<img src='"+galleryArray[i].src+"' alt='"+galleryArray[i].alt+"' title='"+galleryArray[i].title+"' width='300' height='200'>"
        					+"<div style='display:none;'>"+galleryArray[i].desc+"</div>"
        					+"<div class='title'>"+galleryArray[i].title+"</div>"
        					+"</div></div>";
    }
    document.getElementById("banner-img-wrapper").innerHTML=output;

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


