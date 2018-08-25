import { TweenMax, CSSPlugin, Back } from 'gsap/TweenMax';
import waypoints from '../../../node_modules/waypoints/lib/noframework.waypoints.min';
import $ from 'jquery';

class GreenSockAnimations {
    // constructor(elems, offset, fromOptions, toOptions) {
    constructor(elems, offset) {
        this.itemsToReveal = elems;
        this.offsetPercentage = offset;
        // this.fromOptions = fromOptions;
        // this.toOptions = toOptions;
        // this.tl = new TimelineLite();
        this.hideInitially();
        this.animateProjects();
    }

    hideInitially() {
        // this.itemsToReveal.addClass('gsap-item');
        console.log('.gsap-item class added');
        var that = this;
        // this.itemsToReveal.each(function() {
            
        // });
        TweenMax.set(that.itemsToReveal, {x: -100, autoAlpha: 0});
    }

    animateProjects() {
        var that = this;
        this.itemsToReveal.each(function() {
            var currElem = this;
            new Waypoint({
                element: currElem,
                handler: function(direction) {
                    console.log('waypoint triggered');
                    console.log('currElem: ', currElem);
                    if (direction === 'down') {

                        // TweenMax.fromTo($(currElem), 1, 
                        TweenMax.to($(currElem), 0.6, 
                        // TweenLite.fromTo(currElem, 1, 
                        // that.tl.staggerFromTo(currElem, 1, 
                        {
                            autoAlpha: 1,
                            x: 0,
                            onStart: function() {
                                console.log('greensock started');
                            },
                            ease: Back.easeOut.config(1.4)
                        });
                        // event.stopPropagation();
                    }
                },
                offset: that.offsetPercentage
            });
        });
    }
}

export default GreenSockAnimations;