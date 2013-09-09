define(function(){
    
    var remResizer;
    
    /**
     * Returns the font-size of the <html> element (set in px @mandatory)
     * @returns {Number}
     */
    function getBaseFontSize(){
        var baseFontSize,
            htmlElement = document.getElementsByTagName("html")[0];
    
        baseFontSize = htmlElement.style['fontSize'] !== "" ? htmlElement.style['fontSize'] : window.getComputedStyle(htmlElement)['fontSize'];
        //even if not set by user, should be set by the navigator, but test anyway
        if(!baseFontSize){
            throw new Error("No font-size specified for the <html> tag");
        }
        if(baseFontSize.indexOf('px') < 0){
            throw new Error("Only px supported for <html> tag");
        }
        return parseFloat(baseFontSize);
    }
    
    /**
     * Returns the real width/height in px of an element (via getComputedStyle)
     * @param {DOMElement} element
     * @returns {Object}
     */
    function getElementSize(element){
        return {
            "width" : parseInt(window.getComputedStyle(element)['width']),
            "height" : parseInt(window.getComputedStyle(element)['height'])
        };
    }
    
    /**
     * Returns the size of the window
     * @returns {Object}
     */
    function getWindowSize(element){
        return{
            "width" : element ? element.innerWidth : window.innerWidth,
            "height" : element ? element.innerHeight : window.innerHeight
        };
    }
    
    /**
     * Returns the ratio between the window and the targetElement (taking account viewport boundaries)
     * @param {Object} windowSize
     * @param {Object} targetElementSize
     * @returns {Number}
     */
    function getRatio(windowSize,targetElementSize){
        //window width bigger than element width
        if(windowSize.width/windowSize.height > targetElementSize.width/targetElementSize.height){
            return windowSize.height/targetElementSize.height;
        }
        //window height bigger than element height
        else{
            return windowSize.width/targetElementSize.width;
        }
    }
    
    remResizer = {
        
        /**
         * Resizes your targetElement in full window and adds a resize eventListener that will resize this element by changing the font-size, fitting it to the window (whatever the ratio of your window or element)
         * @param {DOMElement} targetElement
         * @param {Function} resizeCallback function(e,infos) { ... }
         *      * {ResizeEvent} e
         *      * {DomElement} infos.targetElement
         *      * {String} infos.width computed width of infos.targetElement after resize (in px)
         *      * {String} infos.height computed height of infos.targetElement after resize (in px)
         *      * {Number} infos.currentFontSize of the html element (in px)
         *      * {Number} infos.originalFontSize of the html element (in px)
         */
        init: function(targetElement, resizeCallback){
            
            var originalFontSize = getBaseFontSize(),
                originalTargetElementSize = getElementSize(targetElement),
                ratio = getRatio(getWindowSize(),originalTargetElementSize),
                htmlelement = document.getElementsByTagName("html")[0],
                resizer;
            
            resizer = function(e){
                var ratio, currentFontSize;
                ratio = getRatio(getWindowSize(e.target),originalTargetElementSize);
                currentFontSize = ratio*originalFontSize;
                htmlelement.style.fontSize = currentFontSize+"px";
                if(typeof resizeCallback === "function"){
                    var infos = {},
                        computedStyles = getComputedStyle(targetElement);
                    infos.targetElement = targetElement;
                    infos.width = computedStyles.width;
                    infos.height = computedStyles.height;
                    infos.currentFontSize = currentFontSize;
                    infos.originalFontSize = originalFontSize;
                    resizeCallback.call({},e,infos);
                }
            };
            
            //init (will trigger the resizeCallback)
            resizer({target:window});
            
            //add the listener
            window.addEventListener('resize',resizer,false);
            
        }
        
    };
    
    return remResizer;
    
});