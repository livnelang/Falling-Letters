window.onload = function() {
    loadGame();
};
/**
 * initializes the game for the first time
 */
function loadGame() {
    // attach handler for start game button
    document.getElementById('start_btn').addEventListener('click', function startIt(elm) {
        fadeOut(elm.currentTarget);
        fadeOut(document.getElementById('game-title'));
        var letters_game = new LettersGame(true);
    });
}

/**
 * LettersGame Object,
 * will be acting as the game manager/regulator
 * @constructor
 * @param start- true/false/null
 */
function LettersGame(start) {
    var LETTERS = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    var letters_array = {};
    var gameOn = true;
    var timeOffset = 2000; //interval between letters starting, will be faster over time
    var main = document.getElementById('main');
    var scoreElement = document.getElementById('score');
    var livesElement = document.getElementById('lives');
    scoreElement.innerHTML ="";
    var score = "";
    var misses = livesElement.innerHTML;
    this.setCounterInterval = setCounterInterval;
    var letterTimeout;
    document.addEventListener("keypress", handleKeyPress);
    this.setCounterInterval();
    setupNextLetter();

    // attach handler for submitting your score button
    if(start) {
        document.getElementById('submit_score').addEventListener('click', submitScore);
    }


    /**
     * setCounterInterval function,
     * used to set our counter interval id,
     * and as long as game resumes -> increase the counter
     */
    function setCounterInterval() {
        // set interval counter
        var score_interval = setInterval(counterIncrease, 200);
        function counterIncrease() {
            if(gameOn) {
                score++;
                document.getElementById('score').textContent = score.toString();
            }
            else {
                clearInterval(score_interval);
            }
        }
    }

    //Create a letter element and setup its falling animation, add the animation to the active animation array, and setup an onfinish handler that will represent a miss. 
    function createLetter() {
        var idx = Math.floor(Math.random() * LETTERS.length);
        var x =  Math.floor(Math.random() * 350) + 10;
        var falling_letter = document.createElement('div');
        falling_letter.className += "falling-letter";
        falling_letter.style.left = x + 'px';
        falling_letter.style.top = 20 + 'px';
        falling_letter.textContent = LETTERS[idx];

        falling_letter.clearMove = function() {
            clearInterval(this.interval);
            this.interval = undefined;
        };

        main.appendChild(falling_letter);
        myMove(falling_letter);
        // push into new letters array
        letters_array[LETTERS[idx]] = falling_letter;

        function myMove(letter) {
            var pos = 20;
            falling_letter.interval = setInterval(frame, 10);
            function frame() {
                if (pos == 576) {
                    falling_letter.clearMove(falling_letter.interval);
                    missedLetter(falling_letter);
                } else {
                    pos++;
                    letter.style.top = pos + 'px';
                }
            }
        }

    }

    function missedLetter(falling_letter) {
        if(!gameOn) {
            return;
        }
        main.className = 'hit';
        setTimeout(function() {
            main.classList.remove('hit');
        }, 1000);

        misses--;
        livesElement.innerText = misses;
        if(falling_letter) {
            main.removeChild(falling_letter);
        }
        if(misses == 0) {
            gameOver();
            // remove all other characters
            main.querySelectorAll('.falling-letter').forEach(function(missed) {
                main.removeChild(missed);
            });

        }

    }

    //End game and show screen
    function gameOver() {
        gameOn = false;
        clearTimeout(letterTimeout);
        letterTimeout = undefined;
        // Remove the event handler from the document
        document.removeEventListener("keypress", handleKeyPress);


        //Could use Web Animations API here, but showing how you can use a mix of Web Animations API and CSS transitions
        document.getElementById('game-over').style.display = 'block';
    }


    /**
     * handleKeyPress function,
     * triggers the pressed key and checks if this letter is on
     * out letters array
     * @param evt
     */
    function handleKeyPress(evt) {
            evt = evt || window.event;
            var charCode = evt.keyCode || evt.which;
            var charStr = String.fromCharCode(charCode);

            // if letter exists
            if(letters_array[charStr]) {
                explode(letters_array[charStr].offsetLeft, letters_array[charStr].offsetTop);
                letters_array[charStr].clearMove();
                main.removeChild(letters_array[charStr]);
                delete letters_array[charStr];
            }
            else {
                missedLetter();
            }
    }

    /**
     * anyKeyRestart function,
     * handles key for restart game
     * @param evt
     */
    function anyKeyRestart(evt) {
        // clean highlights + game over + key restart handler
        document.removeEventListener("keypress", anyKeyRestart);
        $('#scores').html('');
        $('#highlights').hide();
        livesElement.innerHTML = 3;
        new LettersGame();
    }

    /**
     * setupNextLetter function,
     * used to create a new letter
     */
    function setupNextLetter() {
        if (gameOn) {
            createLetter();
            letterTimeout = setTimeout(function() {
                setupNextLetter();
            }, timeOffset);
        }
        // otherwise clear setTimeout
        else {
            clearTimeout(letterTimeout);
        }


    }

    /**
     * submitScore function,
     * send player data, and fetch highlights table
     */
    function submitScore() {
        var items = [];
        var player_data = {
            name: $("input[name=name]").val(),
            result: score
        };
        // remove game-over, show spinner
        $('#game-over').hide();
        $('.loader').show();

        // http://localhost:3000/insertRecord   https://falling-letters-ws.herokuapp.com/insertRecord
        // ajax call
        $.post( "http://localhost:3000/insertRecord", player_data)
            .done(function( data ) {
                $.each( data, function( key, val ) {
                    items.push( "<li>"+ val.name + ' ' + val.result + "</li>");
                });
            })
            .fail(function(error_data) {
                $.each( error_data.responseJSON, function( key, val ) {
                    items.push( "<li>"+ val + "</li>");
                });
            })
            .always(function() {
                // register a new click for a restart
                $('#highlights ul').append(items);
                $('.loader').hide();
                $('#highlights').show();
                document.addEventListener("keypress", anyKeyRestart);
            })
    }
}

/**
 * raw fadeout function, for were not using jquery
 * @param el
 */
function fadeOut(el){
    el.style.opacity = 1;

    (function fade() {
        if ((el.style.opacity -= .1) < 0) {
            el.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    })();
}