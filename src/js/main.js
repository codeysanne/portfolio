import $ from 'jquery';
import whatInput from 'what-input';
import StickyNav from './components/StickyNav';
// import SendMail from './components/SendMail';
import GreenSockAnimations from './components/GreenSockAnimations';

window.$ = $;

import Foundation from 'foundation-sites';

$(document).foundation(
    // {
        // offcanvas: {
        //     close_on_click : true
        // }
    // }
);

var stickyNav = new StickyNav();
// var sendMail = new SendMail();
var greenSockAnimations = new GreenSockAnimations($('.work__project'), '30%');