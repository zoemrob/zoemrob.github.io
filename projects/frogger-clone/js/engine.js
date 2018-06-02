/**
 * @description Manages canvas functionality. Creates game loop which runs
 * until player wins.
 * @param {object} settings
 * @param global
 */
const Engine = function(settings, global = this) {
    const doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d');
    let lastTime;

    canvas.width = settings.width;
    canvas.height = settings.height;
    doc.body.appendChild(canvas);

    /**
     * @description sets smooth consistent time delta between updates,
     * requests animation frame if game is not won, else calls winGame
     */
    function main() {
        const now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        // Update enemy objects, set winStatus true|false
        const winStatus = update(dt);
        render();

        // reassign lastTime to current time
        lastTime = now;

        // continue to animate, unless game is won
        if (winStatus !== true) {
            win.requestAnimationFrame(main);
        } else {
            winGame();
        }
    }

    /**
     * @description - sets winModal fields, makes visible,
     * - sets appropriate event listeners
     */
    function winGame () {
        const winModal = document.getElementById('js-win-modal'),
            winDiff = document.getElementById('js-win-difficulty'),
            winPlayAgain = document.getElementById('js-play-again'),
            winDeaths = document.getElementById('js-win-deaths');

        winDiff.innerText = settings.difficulty;
        winDeaths.innerText = player.deaths.toString();
        winPlayAgain.addEventListener('click', replay);
        document.addEventListener('keyup', keyReplay);
        document.removeEventListener('keyup', input);
        winModal.classList.remove('hidden');
    }

    /**
     * @description sets time interval before calling main()
     */
    function init() {
        lastTime = Date.now();
        main();
    }

    /**
     * @description updates canvas and enemy movement, checks win status
     * @param {number} dt - time delta
     */
    function update(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        return player.checkWin();
    }

    /**
     * @description - sets number of rows and columns from constructor settings
     * - follows pattern of 1 water, x stone, 2 grass
     * - re-renders enemies and player
     */
    function render() {
        const numRows = settings.rows,
            numCols = settings.cols;

        let rowImages = ['images/water-block.png'],
            // subtract 3 because water and grass are constant
            stoneRows = numRows - 3,
            row, col;

        // add appropriate amount of stone-rows based on difficulty.
        do {
            rowImages.push('images/stone-block.png');
            stoneRows--;
        } while (stoneRows > 0);

        // add grass rows
        rowImages.push('images/grass-block.png', 'images/grass-block.png');

        // Before drawing, clear existing canvas
        ctx.clearRect(0,0,canvas.width,canvas.height);

        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }
        renderEntities();
    }

    /**
     * @description Renders enemies and player
     */
    function renderEntities() {
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });
        player.render();
    }

    /**
     * @description callback wrapper for eventListener
     * @param {KeyboardEvent} e
     */
    function input (e) {
        e.preventDefault();
        player.handleInput(e.key);
    }

    /**
     * Load resources, if they are already loaded, call init
     */
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png'
    ]);
    if (Resources.isReady()) {
        init();
    } else {
        Resources.onReady(init);
    }

    global.ctx = ctx;
    document.addEventListener('keyup', input);
};
