define(['custom/remResizer'],function(remResizer) {

    var flowerLight;

    flowerLight = {
        init: function() {
            remResizer.init(document.getElementById('flower'));
            
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