 $(document).ready(function() {
   /*ristretto firmware button codes to send*/           
    var btncode = {
        btn: {
          btn1: 5,
        	btn2: 6,
        	btnUp: 1,
        	btnDown: 2,
        	btnOK: 3,
          datatext: 3,
        	btnESC: 4
        },
        key: {
            13: 3, //OK
            39: 3, //right arrow
            38: 1, //up
            40: 2, //down
            37: 4, //left
            27: 4, //esc
            49: 5, //1
            50: 6 //2
        }
    }

/*Prevent double click*/
  $("*").dblclick(function(e){
    e.preventDefault();
  });
  
/*Code for getting data from the server*/
  var socket = io.connect();
  socket.on('serialEvent', function (data) {
    var displayData=data.value.slice(3, data.value.length);
    $("#datatext").html(displayData);
    var lcdBacklight=data.value[0];
    var lcdStatus=data.value[1];
    var lcdKeypressed=data.value[2];
    
    if (lcdBacklight=="1") {
      $("#panel").css("background", "rgba(0, 0, 0, 0.75)");
    } else
    {
      $("#panel").css("background", "rgba(0, 0, 0, 1)");
    }
    
    switch (lcdStatus) {
      case "0":
        $(".glyphicon.glyphicon-one-fine-dot").css("color", "rgb(102,102,102)");
      break;
      case "1":
        $(".glyphicon.glyphicon-one-fine-dot").css("color", "rgb(255,0,0)");
      break;
      case "2":
        $(".glyphicon.glyphicon-one-fine-dot").css("color", "rgb(255,153,0)");
      break;
      case "3":
        $(".glyphicon.glyphicon-one-fine-dot").css("color", "#77b300");
      break;
      
      default: return;
    } 
   
   switch (lcdKeypressed) {
     case "0": //nix
       $("#btnUp").css("background-color", "#77b300");
       $("#btnDown").css("background-color", "#77b300");
       $("#btnOK").css("background-color", "#77b300");
       $("#btnESC").css("background-color", "#77b300");
       $("#btn1").css("background-color", "#77b300");
       $("#btn2").css("background-color", "#77b300");
     break;
     
     case "1": //Up
     $("#btnUp").css("background-color", "rgb(255,153,0)");
     break;
     
     case "2": //Down
     $("#btnDown").css("background-color", "rgb(255,153,0)");
     break;
     
     case "3": //OK
     $("#btnOK").css("background-color", "rgb(255,153,0)");
     break;
     
     case "4": //ESC
     $("#btnESC").css("background-color", "rgb(255,153,0)");
     break;
     
     case "5": //1
     $("#btn1").css("background-color", "rgb(255,153,0)");
     break;
     
     case "6": //2
     $("#btn2").css("background-color", "rgb(255,153,0)");
     break;
     
     default: return;
   }
  }); //socket io


  /*Code for sending data to the server*/
  /*Sends the keycode via socket io*/     
  function sendData(data) {
    socket.emit('navigation',data)
  }

 /*Events for click or tap on a button*/
 
  /*Send navigation on mousedown or tap*/                    
  $(document).on("vmousedown",function(event){
      switch (event.which) {
        case 0:
        case 1:
        case 2: 
          pressedButton = event.target.id;
          if ($.inArray(pressedButton, btncode.btn)) {
            sendData(btncode.btn[pressedButton]);
            timeout = setInterval(function(){
              sendData(btncode.btn[pressedButton]);
            }, 150);
          }
          break;       
        case 3:
          sendData(btncode.btn.btnESC);
          break;
      }
  });
  
  /*Send data on keypress*/
  $(document).on("keydown",function(event){
      pressedKey=event.which;
      if ($.inArray(pressedKey, btncode.key)) {
      }   sendData(btncode.key[pressedKey]);
      event.preventDefault();
  });
  
  /*Release mouse-tap-key*/
  $(document).on("vmouseup keyup",function(){
      clearInterval(timeout);
      sendData(0);
      return false;
  });
  
  $("#datatext").on( 'DOMMouseScroll mousewheel', function ( event ) {
  if( event.originalEvent.detail > 0 || event.originalEvent.wheelDelta < 0 ) { //alternative options for wheelData: wheelDeltaX & wheelDeltaY
    //scroll down
    sendData(btncode.btn.btnDown);
    sendData(0);
  } else {
    //scroll up
    sendData(btncode.btn.btnUp);
    sendData(0);
  }
  //prevent page fom scrolling
  return false;
});

}); //document ready