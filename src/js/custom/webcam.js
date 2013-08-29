define(['vendor/adapter'], function(undefined) {

    var webcam;

    webcam = {
        init: function() {

            var constraints = {audio: false, video: true};
            var video = document.querySelector("video");

            function successCallback(stream) {
                window.stream = stream; // stream available to console
                if (window.URL) {
                    video.src = window.URL.createObjectURL(stream);
                } else {
                    video.src = stream;
                }
                video.play();
            }

            function errorCallback(error) {
                console.log("navigator.getUserMedia error: ", error);
            }

            getUserMedia(constraints, successCallback, errorCallback);
        }

    };

    return webcam;

});