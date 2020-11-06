$(".card-toggle").on("click", function(){
	
	// Card toggle state 	
	$(".card-toggle").removeClass("active");
	$(this).addClass("active");
	
	var isAnimating = false;
	
	if( !isAnimating ){
		isAnimating = true;
		
		$(".card").find(".card-content").css("z-index",0);
		$(".card").removeClass("active");

		var that = $(this);

		$(this).siblings().css("z-index",1);

		setTimeout(function(){
			that.parent().toggleClass("active").find(".card-content").on("transitionend", function(){
				isAnimating = false;
			});	;
			
		},10);
	} else {
		return;
	}
});

$("input,textarea").blur(function(){
	if( $(this).val() ){
		$(this).parent().addClass("filled");
	} else {
		$(this).parent().removeClass("filled");
	}
});

$(".contact").on("click",function(){
	$(".contact-form").toggleClass("active");
});
$(".contact-form .close").on("click",function(e){
	e.preventDefault();
	$(".contact-form").toggleClass("active");
});
$(".contact-form input[type=submit]").on("click",function(e){
    e.preventDefault();
	//now send this data and clear values of contact form
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText == "200") {
                alertbox.show("Message sent!");
                //clear values based on above response
                $("#email").val("");
                $("#name").val("");
                $("#message").val("");
            	$(".contact-form").toggleClass("active");
            }
            else {
                alertbox.show(this.responseText);
            }
            return;
        }
    };
    xhttp.open("POST", "https://nso.vikesh.me/email.php?email="+encodeURIComponent($("#email").val())+"&name="+encodeURIComponent($("#name").val()), true);
    xhttp.send($("#message").val());
});

// The main class
var AlertBox = function(id, option) {
  this.show = function(msg) {
    if (msg === ''  || typeof msg === 'undefined' || msg === null) {
      throw '"msg parameter is empty"';
    }
    else {
      var alertArea = document.querySelector(id);
      var alertBox = document.createElement('DIV');
      var alertContent = document.createElement('DIV');
      var alertClose = document.createElement('A');
      var alertClass = this;
      alertContent.classList.add('alert-content');
      alertContent.innerText = msg;
      alertClose.classList.add('alert-close');
      alertClose.setAttribute('href', '#');
      alertBox.classList.add('alert-box');
      alertBox.appendChild(alertContent);
      if (!option.hideCloseButton || typeof option.hideCloseButton === 'undefined') {
        alertBox.appendChild(alertClose);
      }
      alertArea.appendChild(alertBox);
      alertClose.addEventListener('click', function(event) {
        event.preventDefault();
        alertClass.hide(alertBox);
      });
      if (!option.persistent) {
        var alertTimeout = setTimeout(function() {
          alertClass.hide(alertBox);
          clearTimeout(alertTimeout);
        }, option.closeTime);
      }
    }
  };

  this.hide = function(alertBox) {
    alertBox.classList.add('hide');
    var disperseTimeout = setTimeout(function() {
      alertBox.parentNode.removeChild(alertBox);
      clearTimeout(disperseTimeout);
    }, 500);
  };
};

var alertbox = new AlertBox('#alert-area', {
  closeTime: 5000,
  persistent: false,
  hideCloseButton: false
});