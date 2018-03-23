import {
  stop,
  animate,
  Promise,
  isAnimating,
  finish
} from "liquid-fire";

export default function typo(properties, opts) {
  function getComputedStyle2( dom ) {
        var style;
        var returns = {};
        // FireFox and Chrome way
        if(window.getComputedStyle){
            style = window.getComputedStyle(dom, null);
            for(var i = 0, l = style.length; i < l; i++){
                var prop = style[i];
                var val = style.getPropertyValue(prop);
                returns[prop] = val;
            }
            return returns;
        }
        // IE and Opera way
        if(dom.currentStyle){
            style = dom.currentStyle;
            for(var prop in style){
                returns[prop] = style[prop];
            }
            return returns;
        }
        // Style from style attribute
        if(style === dom.style){
            for(var prop in style){
                if(typeof style[prop] != 'function'){
                    returns[prop] = style[prop];
                }
            }
            return returns;
        }
        return returns;
    };

  stop(this.oldElement);
  stop(this.newElement);

  let firstStep = animate(this.oldElement, getComputedStyle2(this.newElement[0]), opts);

  return firstStep.then(() => {
    return animate(this.newElement, {opacity: 1}, {duration: 0});
  });
}
