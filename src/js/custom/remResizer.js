define(function(){
    
    var remResizer;
    
    /**
     * Returns the font-size of the <html> element (set in px @mandatory)
     * @param {Object} options
     *      @baseFontSize in rem @optional
     * @returns {Number}
     */
    function getBaseFontSize(options){
        var baseFontSize,
            htmlElement;
        if(options && options.baseFontSize){
            baseFontSize = options.baseFontSize;
        }
        else{
            htmlElement = document.getElementsByTagName("html")[0];
            baseFontSize = htmlElement.style['fontSize'] !== "" ? htmlElement.style['fontSize'] : window.getComputedStyle(htmlElement)['fontSize'];
            if(!baseFontSize){
                throw new Error("No font-size specified for the <html> tag (or in baseFontSize options)");
            }
        }
        if(baseFontSize.indexOf('px') < 0){
            throw new Error("Only px supported for <html> tag or baseFontSize");
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
    function getWindowSize(){
        return{
            "width" : window.innerWidth,
            "height" : window.innerHeight
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
        
        init: function(targetElement, options){
            
            var originalFontSize = getBaseFontSize(options),
                currentFontSize = originalFontSize,
                originalWindowSize = getWindowSize(),
                originalTargetElementSize = getElementSize(targetElement),
                currentTargetElementSize = originalTargetElementSize,
                ratio = getRatio(originalWindowSize,originalTargetElementSize),
                htmlelement = document.getElementsByTagName("html")[0],
                resizer;
        
            htmlelement.style.fontSize = (ratio*originalFontSize)+"px";
        
            console.log('remResizer.init()',ratio);
            
        }
        
    };
    
    return remResizer;
    
});