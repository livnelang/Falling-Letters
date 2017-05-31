<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Woobi Game Exercise</title>
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
        <!--game-over-->
        <div id="game-over">
            <h2>Game Over</h2>
            <div class="player-input">
                <label>Please enter your name</label>
                <input name="name" type="text">
                <button class="game_btn" id="submit_score">Submit Score</button>
            </div>
        </div>
        <!--highlights-->
        <div id="highlights">
            <h2>High Score</h2>
            <ul id="scores"></ul>
        </div>
        <div class="player-panel">
            <div id="game-score">Score: <span id="score">0</span> &nbsp● </div>
            <div id="game-lives">Lives: <span id="lives">3</span></div>
        </div>
    </main>
</div>
</body>
</html>
