define(['vendor/headtrackr.min'], function(headtrackr) {

    var headtracking;

    headtracking = {
        init: function() {
            var videoInput = document.getElementById('inputVideo'),
                canvasInput = document.getElementById('inputCanvas'),
                canvasOverlay = document.getElementById('overlayCanvas'),
                overlayContext = canvasOverlay.getContext('2d'),
                slider = document.getElementById('slider'),
                htracker;

            htracker = new headtrackr.Tracker({calcAngles : true, ui : false, headPosition : false});
            htracker.init(videoInput, canvasInput);
            htracker.start();			
            // for each facetracking event received draw rectangle around tracked face on canvas

            document.addEventListener("facetrackingEvent", function( event ) {
                    // clear canvas
                    overlayContext.clearRect(0,0,320,240);
                    // once we have stable tracking, draw rectangle
                    if (event.detection == "CS") {
                            console.log(event.x,event.y,event.angle,event.width, event.height);
                            showBox(event, overlayContext);
                            slideTilt(event, slider);
                    }
            });
            
            showBox = function (event, overlayContext){
                overlayContext.translate(event.x, event.y)
                overlayContext.rotate(event.angle-(Math.PI/2));
                overlayContext.strokeStyle = "#00CC00";
                overlayContext.strokeRect((-(event.width/2)) >> 0, (-(event.height/2)) >> 0, event.width, event.height);
                overlayContext.rotate((Math.PI/2)-event.angle);
                overlayContext.translate(-event.x, -event.y);
            }
            
            slideTilt = function(event, slider){
                var sliderValue = slider.value;
                if(event.angle > 1.37 && event.angle < 1.77){
                    return false;
                }
                if(event.angle < Math.PI/2 && sliderValue < 100){
                    slider.value++;
                }
                else if(event.angle > Math.PI/2 && sliderValue > 0){
                    slider.value--;
                }
            }
            
        }
    };

    return headtracking;

});