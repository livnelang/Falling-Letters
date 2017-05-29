window.onload = function() {
    loadGame();
};

function loadGame() {
    document.getElementById('start_btn').addEventListener('click', function startIt(elm) {
        fadeOut(elm.currentTarget);
        var letters_game = new LettersGame();
    });
}

/**
 * LettersGame Object,
 * will be acting as the game manager/regulator
 * @constructor
 */
function LettersGame() {
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
    this.attachKeyPress = attachKeyPress;

    this.attachKeyPress();
    this.setCounterInterval();

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
        var x = (Math.random() * 360);
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
            console.log('fall interval_id: ', falling_letter.interval);
            function frame() {
                if (pos == 576) {
                    console.log('clear interval_id: ', falling_letter.interval);
                    falling_letter.clearMove(falling_letter.interval);
                    missedLetter();
                } else {
                    pos++;
                    letter.style.top = pos + 'px';
                }
            }
        }

        function missedLetter() {
            if(!gameOn) {
                return;
            }
            main.className = 'hit';
            setTimeout(function() {
                main.classList.remove('hit');
            }, 1000);

            misses--;
            livesElement.innerText = misses;
            main.removeChild(falling_letter);
            if(misses == 0) {
                gameOver();
                // remove all other characters
                main.querySelectorAll('.falling-letter').forEach(function(missed) {
                    main.removeChild(missed);
                });

            }

        }
    }

    //End game and show screen
    function gameOver() {
        gameOn = false;
        //Could use Web Animations API here, but showing how you can use a mix of Web Animations API and CSS transistions
        document.getElementById('game-over').style.display = 'block';
    }


    /**
     * attachKeyPress function,
     * triggers the pressed key and checks if this letter is on
     * out letters array
     * @param evt
     */
    function attachKeyPress() {
        document.addEventListener("keypress", function (evt) {
            evt = evt || window.event;
            var charCode = evt.keyCode || evt.which;
            var charStr = String.fromCharCode(charCode);

            // if letter exists
            if(letters_array[charStr]) {
                letters_array[charStr].clearMove();
                main.removeChild(letters_array[charStr]);
                delete letters_array[charStr];
            }
        });
    }

    function setupNextLetter() {
        if (gameOn) {
            createLetter();
            setTimeout(function() {
                setupNextLetter();
            }, timeOffset);
        }
    }
    setupNextLetter();
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