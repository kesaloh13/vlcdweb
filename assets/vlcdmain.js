 $(document).ready(function() {
        var socket = io.connect(window.location.href);
        socket.on('serialEvent', function (data) {
          $("#datatext").html(data.value)
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
       
