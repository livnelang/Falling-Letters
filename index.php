<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Falling Letters</title>
    <!--css-->
    <link rel="stylesheet" href="css/main.css">
    <!--js-->
    <script src="js/jquery.min.js"></script>
    <script src="js/particle_explode.js"></script>
    <script src="js/game.js"></script>
</head>
    
<body>
<!-- wrapper  -->
<div id="wrapper">
    <!-- main  -->
    <main id="main">
        <h2 id="game-title">Falling Letters</h2>
        <button class="game_btn" id="start_btn">Start Game</button>
        <!-- langs panel-->
        <div id="langs">
            <button lang="eng" type="button" class="btn btn-default selected_lang">English</button>
            <button lang="heb" type="button" class="btn btn-default">Hebrew</button>
        </div>
        <!--game-over-->
        <div id="game-over">
            <h2>Game Over</h2>
            <div class="player-input">
                <label>Please enter your name</label>
                <input required name="name" type="text">
                <button class="game_btn" id="submit_score">Submit Score</button>
            </div>
        </div>
        <!-- loader-->
        <div class="loader"></div>
        <!--highlights-->
        <div id="highlights">
            <h2>High Score</h2>
            <ul id="scores"></ul>
            <p>Press any key to restart</p>
        </div>
        <!-- game status-->
        <div class="player-panel">
            <div id="game-score">Score: <span id="score">0</span> &nbsp● </div>
            <div id="game-lives">Lives: <span id="lives">3</span></div>
        </div>
    </main>
</div>
</body>
</html>
