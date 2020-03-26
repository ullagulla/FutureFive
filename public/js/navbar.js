$(document).ready(function () {

    $(window).on('mousemove', (e) => {
        
        $('#logo-pupil').css('left', (50 - ((window.innerWidth / 2) - e.pageX) * 0.0007) + "%");
        $('#logo-highlight').css('left', (50 - ((window.innerWidth / 2) - e.pageX) * 0.0005) + "%");
        $('#logo-highlight').css('top', (e.clientY * 0.003) + "%");
        $('#logo-pupil').css('top', -(1 - e.clientY * 0.009) + "%");

    })

    setInterval(() => {
        $('#logo-bg').attr('src', '/img/LOGO_BLINK.png')
        setTimeout(() => {
            $('#logo-bg').attr('src', '/img/LOGO_BG.png')
        }, 150);
    }, 10000);

    //Wishlist modal trigger below

    let wishlistRoute = "/wishlist"
    $("#wishlist-btn").on("click", function(){
        $("#wishlistModal").load(wishlistRoute)
    })

})