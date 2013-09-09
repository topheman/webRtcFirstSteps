define(['custom/remResizer','utils/requestAnimFrame'],function(remResizer,undefined) {

    var flowerLight;

    flowerLight = {
        init: function() {
            
            var canvas = document.getElementById('flower'),
                canvasOriginalWidth = getComputedStyle(canvas).width,
                canvasOriginalHeight = getComputedStyle(canvas).height,
                ctx = canvas.getContext('2d'),
                ratio = 1,
                draw;
        
            console.log(canvasOriginalWidth,canvasOriginalHeight);
        
            draw = function(){
//                canvas.width = canvas.width;
                console.log('toto');
                ctx.fillStyle = "black";
                ctx.lineWidth	= 1;
                ctx.beginPath();
                ctx.moveTo(0*ratio,0*ratio);
                ctx.lineTo(310*ratio,230*ratio);
                ctx.stroke();
                requestAnimFrame(draw);
            };
            
            remResizer.init(canvas,function(e,infos){
                ratio = parseInt(infos.height)/parseInt(canvasOriginalHeight);
                canvas.width = parseInt(infos.width);
                canvas.height = parseInt(infos.height);
                console.log(infos.width,infos.height,infos.currentFontSize,infos.originalFontSize,ratio);
            });
            
            draw();
            
            //test mode without background colors, only borders
            if(location.search.indexOf('test') > -1){
                (function(){
                    var divs = document.getElementsByTagName('div'),i;
                    for(i=0;i<divs.length;i++){
                        divs[i].style.background = "transparent";
                        if(window.getComputedStyle(divs[i]).border.indexOf('0px') > -1){
                            divs[i].style.border = "1px solid black";
                        }
                    }
                })();
            }
        }

    };

    return flowerLight;

});