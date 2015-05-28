 $(document).ready(function() {
        var socket = io.connect(window.location.href);
        socket.on('serialEvent', function (data) {
          var displayData=data.value.slice(3, data.value.length);
          $("#datatext").html(displayData)
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
            
            default: return
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
         
         
          
          
          
				});
                
/* Event handler for button click */
      
        $("#StartBtn").click(function() {
          $("#start").hide();
          $("#LCD").show();
       });

function sendData(data) {
  socket.emit('navigation',data)
};


$(document).on("keydown", function(event) {
    switch(event.which) {
      case 13:  //OK
      case 39: // Right arrow
        sendData(3);   
      break;
      
      case 38: sendData(1);    //up
      break;
      
      case 40: sendData(2);    //down
      break;
      
      case 37:
      case 27:
        sendData(4);
      break;
      
      case 49: sendData(5);  //1
      break;
        
      case 50: sendData(6);  //2
      break;
      
      default: return;
    }
  event.preventDefault();
})

        
                    
        $("#DisconnectBtn").click(function() {
          $("#start").show();
          $("#LCD").hide();
        });
        
        $("#btn1").click(function() {
          sendData(5);  
        });
        
        $("#btn2").click(function() {
          sendData(6);  
        });
        
        $("#btnUp").click(function() {
          sendData(1);  
        });
        
        $("#btnDown").click(function() {
          sendData(2);
        });
        
        $("#btnOK").click(function() {
          sendData(3);  
        });
        
        $("#btnESC").click(function() {
          sendData(4);  
        });

      });
       
