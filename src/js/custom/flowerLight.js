define(['custom/remResizer'],function(remResizer) {

    var flowerLight;

    flowerLight = {
        init: function() {
            remResizer.init(document.getElementById('flower'));
        }

    };

    return flowerLight;

});