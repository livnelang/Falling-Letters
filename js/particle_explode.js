// // click event listener
// $('body').on('click', function(e) {
//     explode(e.pageX, e.pageY);
// });

// explosion construction
function explode(x, y) {
    var particles = 15,
    // explosion container and its reference to be able to delete it on animation end
        explosion = document.createElement("div");
        explosion.className += "explosion";

    // put the explosion container into the body to be able to get it's size
    document.body.append(explosion);

    // position the container to be centered on click
    explosion.style.left =  x - explosion.offsetWidth/ 2;
    explosion.style.top = y - explosion.offsetHeight/ 2;

    for (var i = 0; i < particles; i++) {
        // positioning x,y of the particle on the circle (little randomized radius)
        var x = (explosion.offsetWidth / 2) + rand(80, 150) * Math.cos(2 * Math.PI * i / rand(particles - 10, particles + 10)),
            y = (explosion.offsetHeight / 2) + rand(80, 150) * Math.sin(2 * Math.PI * i / rand(particles - 10, particles + 10)),
            color = rand(0, 255) + ', ' + rand(0, 255) + ', ' + rand(0, 255), // randomize the color rgb
        // particle element creation (could be anything other than div)
            elm = document.createElement("div");
            elm.className += "particle";
            elm.style.backgroundColor = color;
            elm.style.top = y + 'px';
            elm.style.left = x + 'px';

            // elm = $('<div class="particle" style="' +
            //     'background-color: rgb(' + color + ') ;' +
            //     'top: ' + y + 'px; ' +
            //     'left: ' + x + 'px"></div>');

            // if (i == 0) { // no need to add the listener on all generated elements
            //     // css3 animation end detection
            //     elm.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
            //         explosion.remove(); // remove this explosion container when animation ended
            //     });
            // }
        explosion.append(elm);
    }
}

// get random number between min and max value
function rand(min, max) {
    return Math.floor(Math.random() * (max + 1)) + min;
}