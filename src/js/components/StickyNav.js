import $ from 'jquery';
import waypoints from '../../../node_modules/waypoints/lib/noframework.waypoints.min';
import smoothScroll from 'jquery-smooth-scroll';

class StickyNav {
    constructor() {
        // this.lazyImages = $('.lazyload');
        this.siteHeader = $('.header');
        this.siteHeaderLinks = $('.header a');
        this.offCanvas = $('.off-canvas');
        this.offCanvasLinks = $('.off-canvas a');
        this.menuIcon = $('.menu-icon');
        // this.pageSections = $('.page-section');
        // this.waypointTrigger = $('.hero__description')[0];
        this.waypointTrigger = $('#skills')[0];
        this.waypointTrigger2 = $('#contact')[0];
        // this.waypointTrigger = $('.hero__title')[0];
        this.pageSections = $('.section');
        this.waypointTriggerOffset = 80;
        this.createHeaderWaypoint();
        // this.highlightHeaderLinks();
        this.addSmoothScroll();
        // this.refreshWaypoints();
        this.closeOffCanvasAfterClicks();
        this.highlightHeaderLinks();
    }

    addSmoothScroll() {
        var that = this;
        this.siteHeaderLinks.smoothScroll({offset: -that.waypointTriggerOffset});
    }

    createHeaderWaypoint() {
        var that = this;
        new Waypoint({
            element: that.waypointTrigger,
            handler: function(direction) {
                if (direction === 'down') {
                    that.siteHeader.addClass('header--dark');
                    that.menuIcon.addClass('dark');
                } else {
                    that.siteHeader.removeClass('header--dark');
                    that.menuIcon.removeClass('dark');
                }
            },
            offset: that.waypointTriggerOffset
        });
        new Waypoint({
            element: that.waypointTrigger2,
            handler: function(direction) {
                if (direction === 'down') {
                    that.siteHeader.removeClass('header--dark');
                    that.siteHeader.addClass('header--darker');
                    that.menuIcon.removeClass('dark');
                } else {
                    that.siteHeader.addClass('header--dark');
                    that.siteHeader.removeClass('header--darker');
                    that.menuIcon.addClass('dark');
                }
            },
            offset: that.waypointTriggerOffset
        });
    }

    closeOffCanvasAfterClicks() {
        var that = this;
        this.offCanvasLinks.on('click', function() {
            that.offCanvas.foundation('close');
        });
    }

    highlightHeaderLinks() {
        var that = this;
        this.pageSections.each(function() {
            var currentSection = this;
            // console.log(currentSection);

            new Waypoint({
                element: currentSection,
                handler: function(direction) {
                    if (direction === 'down') {
                        // console.log(currentSection);
                        var currentLink = $(currentSection).attr('data-matching-link');
                        that.siteHeaderLinks.removeClass('is-current-link');
                        that.offCanvasLinks.removeClass('is-current-link');
                        var currentLinkElem = $(currentLink);
                        $(currentLink).addClass('is-current-link');
                        $(currentLink + '-offcanvas').addClass('is-current-link');
                        // console.log(currentLinkElem);
                    } 
                    // else {
                    //     if (currentLink === '#skills') {
                    //         $(currentLink).removeClass('is-current-link');
                    //     }
                    // }
                },
                // offset: '18%'
                offset: that.waypointTriggerOffset
            });

            new Waypoint({
                element: (currentSection.nextElementSibling) ? currentSection.nextElementSibling : currentSection,
                handler: function(direction) {
                    if (direction === 'up' && currentSection.nextElementSibling) {
                        // console.log('current:');
                        // console.log(currentSection);
                        // console.log('previous:');
                        // console.log(currentSection.previousElementSibling);
                        // console.log('next:');
                        // console.log(currentSection.nextElementSibling);
                        // console.log(' ');
                        var currentLink = $(currentSection).attr('data-matching-link');
                        that.siteHeaderLinks.removeClass('is-current-link');
                        that.offCanvasLinks.removeClass('is-current-link');
                        // if (currentLink !== '#skills-link') {
                        //     $(currentLink).removeClass('is-current-link');
                        // } else {
                            $(currentLink).addClass('is-current-link');
                            $(currentLink + '-offcanvas').addClass('is-current-link');
                        // }
                    }
                },
                offset: '60%'
            });

            new Waypoint({
                element:$('#skills')[0],
                handler: function(direction) {
                    if (direction === 'up') {
                        $('#skills-link').removeClass('is-current-link');
                        $('#skills-link-offcanvas').removeClass('is-current-link');
                    }
                }
                // ,
                // offset: '60%'
            });
        });
    }
}

export default StickyNav;