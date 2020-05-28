/*
 *
 *   INSPINIA - Responsive Admin Theme
 *   version 2.9.3
 *
 */

$(document).ready(function () {


    // Fast fix bor position issue with Propper.js
    // Will be fixed in Bootstrap 4.1 - https://github.com/twbs/bootstrap/pull/24092
   // Popper.Defaults.modifiers.computeStyle.gpuAcceleration = false;


    //// Add body-small class if window less than 768px
    //if (window.innerWidth < 769) {
    //    $('body').addClass('body-small')
    //} else {
    //    $('body').removeClass('body-small')
    //}

    // MetisMenu
    //var sideMenu = $('#side-menu').metisMenu();

    //// Collapse ibox function
    //$('.collapse-link').on('click', function (e) {
    //    e.preventDefault();
    //    var ibox = $(this).closest('div.ibox');
    //    var button = $(this).find('i');
    //    var content = ibox.children('.ibox-content');
    //    content.slideToggle(200);
    //    button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
    //    ibox.toggleClass('').toggleClass('border-bottom');
    //    setTimeout(function () {
    //        ibox.resize();
    //        ibox.find('[id^=map-]').resize();
    //    }, 50);
    //});

    //// Close ibox function
    //$('.close-link').on('click', function (e) {
    //    e.preventDefault();
    //    var content = $(this).closest('div.ibox');
    //    content.remove();
    //});

    //// Fullscreen ibox function
    //$('.fullscreen-link').on('click', function (e) {
    //    e.preventDefault();
    //    var ibox = $(this).closest('div.ibox');
    //    var button = $(this).find('i');
    //    $('body').toggleClass('fullscreen-ibox-mode');
    //    button.toggleClass('fa-expand').toggleClass('fa-compress');
    //    ibox.toggleClass('fullscreen');
    //    setTimeout(function () {
    //        $(window).trigger('resize');
    //    }, 100);
    //});

    //// Close menu in canvas mode
    //$('.close-canvas-menu').on('click', function (e) {
    //    e.preventDefault();
    //    $("body").toggleClass("mini-navbar");
    //    SmoothlyMenu();
    //});

    //// Run menu of canvas
    //$('body.canvas-menu .sidebar-collapse').slimScroll({
    //    height: '100%',
    //    railOpacity: 0.9
    //});

    //// Open close right sidebar
    //$('.right-sidebar-toggle').on('click', function (e) {
    //    e.preventDefault();
    //    $('#right-sidebar').toggleClass('sidebar-open');
    //});

    //// Initialize slimscroll for right sidebar
    //$('.sidebar-container').slimScroll({
    //    height: '100%',
    //    railOpacity: 0.4,
    //    wheelStep: 10
    //});

    //// Open close small chat
    //$('.open-small-chat').on('click', function (e) {
    //    e.preventDefault();
    //    $(this).children().toggleClass('fa-comments').toggleClass('fa-times');
    //    $('.small-chat-box').toggleClass('active');
    //});

    //// Initialize slimscroll for small chat
    //$('.small-chat-box .content').slimScroll({
    //    height: '234px',
    //    railOpacity: 0.4
    //});

    //// Small todo handler
    //$('.check-link').on('click', function () {
    //    var button = $(this).find('i');
    //    var label = $(this).next('span');
    //    button.toggleClass('fa-check-square').toggleClass('fa-square-o');
    //    label.toggleClass('todo-completed');
    //    return false;
    //});

    //// Append config box / Only for demo purpose
    //// Uncomment on server mode to enable XHR calls
    //$.get("skin-config2.html", function (data) {
    //    if (!$('body').hasClass('no-skin-config'))
    //        $('body').append(data);
    //});

    // Minimalize menu
    $('.navbar-minimalize').on('click', function (event) {
        event.preventDefault();
        $("body").toggleClass("mini-navbar");
        SmoothlyMenu();

    });

    //// Tooltips demo
    //$('.tooltip-demo').tooltip({
    //    selector: "[data-toggle=tooltip]",
    //    container: "body"
    //});


    //// Move right sidebar top after scroll
    //$(window).scroll(function () {
    //    if ($(window).scrollTop() > 0 && !$('body').hasClass('fixed-nav')) {
    //        $('#right-sidebar').addClass('sidebar-top');
    //    } else {
    //        $('#right-sidebar').removeClass('sidebar-top');
    //    }
    //});

    //$("[data-toggle=popover]")
    //    .popover();

    //// Add slimscroll to element
    //$('.full-height-scroll').slimscroll({
    //    height: '100%'
    //})
});

