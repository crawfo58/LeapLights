var ws;
var num=0;

// Support both the WebSocket and MozWebSocket objects
if ((typeof(WebSocket) == 'undefined') &&
  (typeof(MozWebSocket) != 'undefined')) {
WebSocket = MozWebSocket;
}

// Create the socket with event handlers
function connectToWebSocket() {
// Create and open the socket
ws = new WebSocket("ws://localhost:6437/v6.json");

// On successful connection
ws.onopen = function(event) {

  var enableMessage = JSON.stringify({enableGestures: true});
  ws.send(enableMessage); // Enable gestures
  var backgroundMessage = JSON.stringify({background: true});
  ws.send(backgroundMessage); // Get frames in background
  console.log("open");
};

// On message received
var controller = leap.loop({enableGestures=true}, function(frame) {
    alert("ahh");
    var colors=["white","yellow","orange","red"];
    var obj = JSON.parse(frame.data);
    var str = JSON.stringify(obj, undefined, 2);
    if(obj.gestures.length > 0){
      frame.gestures.forEach(function(gesture){
        if(gesture.type == 'swipe'){
          num+=1;
          document.body.style.backgroundColor = colors[num];
        }
      })
    }
    if(obj.id){
        console.log("Frame data for " + obj.id);
    } else {
        console.log("message " + event.data);
    }

});


// On socket close
ws.onclose = function(event) {
  ws = null;
  console.log("close");
}

// On socket error
ws.onerror = function(event) {
  console.log("error");
};
}

connectToWebSocket();
