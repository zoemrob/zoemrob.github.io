/**
 * @description array of settings based on difficulty selected
 * @type {*[]}
 */
const difficultyConfigs = [
    {
        difficulty: 'Easy',
        width: 505,
        height: 606,
        rows: 6,
        cols: 5,
        enemies: 3,
        enemyPos: [71, 154, 237],
        plyrSrt: {
            x: 203,
            y: 403
        }
    },
    {
        difficulty: 'Medium',
        width: 606,
        height: 689,
        rows: 7,
        cols: 6,
        enemies: 5,
        enemyPos: [71, 154, 237, 320],
        plyrSrt: {
            x: 203,
            y: 486
        }
    },
    {
        difficulty: 'Hard',
        width: 505,
        height: 772,
        rows: 8,
        cols: 5,
        enemies: 6,
        enemyPos: [71, 154, 237, 320, 403],
        plyrSrt: {
            x: 405,
            y: 569
        }
    },
    {
        difficulty: 'Crazy',
        width: 404,
        height: 772,
        rows: 8,
        cols: 4,
        enemies: 6,
        enemyPos: [71, 154, 237, 320, 403],
        plyrSrt: {
            x: 102,
            y: 569
        }
    }
];
// set default difficulty to 'Easy'
let settings = difficultyConfigs[0];

/**
 * @class Template for enemies
 */
class Enemy {

    /**
     * @description returns available enemy positions based on difficulty
     * @return {number[]} - positions available
     */
    static yPositions() {
        return settings.enemyPos;
    };

    /**
     * @description sets initial properties
     * @var this.x - x coord for enemy
     * @var this.y - y coord for enemy, selected based on random yPositions
     * @var this.sprite - image resource
     * @var this.speed - random speed
     */
    constructor () {
        this.x = 1;
        // get random starting location
        this.y = Enemy.yPositions()[Math.floor(Math.random() * Enemy.yPositions().length)];
        this.sprite = 'images/enemy-bug.png';
        //this.speed = Math.floor(Math.random() * (350 - Math.floor(Math.random() * 50)) + 15);
        this.speed = Math.floor(Math.random() * (350 - 75 + 1) + 75);
    }

    /**
     * @description called from Engine.update to increment
     * @param {number} dt - time delta
     */
    update (dt) {
        this.x += this.speed * dt;
        if (this.x >= ctx.canvas.clientWidth) {
            this.recalculate();
        }
        this.checkCollision();
    }

    /**
     * @description draws enemy accessing globally assigned ctx
     */
    render () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    /**
     * @description called every time an enemy exits the canvas
     * allows the enemy speed to be re-calculated, and y loc to be randomized
     */
    recalculate () {
        this.x = -15;
        this.y = Enemy.yPositions()[Math.floor(Math.random() * Enemy.yPositions().length)];
        this.speed = Math.floor(Math.random() * (350 - 75 + 1) + 75);
    }

    /**
     * @description checks for collision with player
     */
    checkCollision () {
        if (this.y === player.y && (this.x + 80 > player.x && this.x - 80 < player.x)) {
            player.die();
        }
    }
}

/**
 * @class represents player, handles movement and renders sprite
 * @constructor
 * @var this.sprite - image resource from session
 * @var this.x - x coord on canvas for difficulty
 * @var this.y - y coord on canvas for difficulty
 * @var this.deaths - amount of collisions
 */
class Player {
    constructor () {
        this.sprite = sessionStorage.getItem('char');
        this.x = settings.plyrSrt.x;
        this.y = settings.plyrSrt.y;
        this.deaths = 0;
    }

    /**
     * @description draws character image on canvas, called by Engine.render
     */
    render () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    /**
     * @description handles KeyboardEvents
     * @param key
     */
    handleInput (key) {
        switch (key) {
            case 'ArrowUp':
                this.y -= this.y > 70 ? 83 : 0;
                break;
            case 'ArrowDown':
                this.y += this.y <= settings.plyrSrt.y - 1 ? 83 : 0;
                break;
            case 'ArrowRight':
                // does not allow past boundary of client width
                this.x += this.x !== ctx.canvas.clientWidth - 100 ? 101 : 0;
                break;
            case 'ArrowLeft':
                this.x -= this.x !== 1 ? 101: 0;
                break;
        }
    }

    /**
     * @description checks position of player
     * @return {boolean} - true if in water row
     */
    checkWin() {
        if (this.y === -12) {
            return true;
        }
    }

    /**
     * @description called on collision, resets location and increments deaths
     */
    die() {
        this.y = settings.plyrSrt.y;
        this.deaths++;
    }
}

/**
 * @description - On page load displays character select screen
 * - after character and difficulty is selected, call Engine with appropriate settings
 */
const gameInit = () => {
    const charTable = document.getElementById('js-char-select'),
        startButton = document.getElementById('js-new-game'),
        // mapping character image id to resource url
        imgMap = {
            "js-char-1": "images/char-boy.png",
            "js-char-2": "images/char-cat-girl.png",
            "js-char-3": "images/char-horn-girl.png",
            "js-char-4": "images/char-pink-girl.png",
            "js-char-5": "images/char-princess-girl.png"
        };
    let selectedId = undefined;

    // set default if no character is selected.
    sessionStorage.setItem(
        'char',
        imgMap[document.querySelector('td.selected').firstElementChild.getAttribute('id')]
    );

    /**
     * @description controls character selection by click
     * stores selected character in sessionStorage
     * @param {MouseEvent} e
     */
    function charSelectClick (e) {
        selectedId = undefined;
        const prevSelected = document.querySelector('td.selected');
        // remove highlight from previous selection
        if (prevSelected !== null) {
            prevSelected.classList.remove('selected');
        }

        if (e.target.nodeName === 'IMG') {
            selectedId = e.target.getAttribute('id');
        }

        if (typeof selectedId !== "undefined") {
            e.target.parentElement.classList.add('selected');
            sessionStorage.setItem('char', imgMap[selectedId]);
        }
    }
    charTable.addEventListener('click', charSelectClick);

    /**
     * @description controls character selection/game start by keyboard press
     * @param {KeyboardEvent} e
     */
    function charSelectKey (e) {
        selectedId = undefined;
        const prevSelected = document.querySelector('td.selected');
        let next = undefined;
        if (e.key === 'ArrowRight') {
            next = prevSelected.nextElementSibling;
            if (next === null) {
                next = prevSelected.parentElement.firstElementChild;
            }
        } else if (e.key === 'ArrowLeft') {
            next = prevSelected.previousElementSibling;
            if (next === null) {
                next = prevSelected.parentElement.lastElementChild;
            }
        } else if (e.key === "Enter") {
            startButton.click();
        }

        if (typeof next !== "undefined") {
            // remove highlight from previous selection
            if (prevSelected !== null) {
                prevSelected.classList.remove('selected');
            }
            selectedId = next.firstElementChild.getAttribute('id');
            next.classList.add('selected');
            sessionStorage.setItem('char', imgMap[selectedId]);
        }
    }
    document.addEventListener('keydown', charSelectKey);

    /**
     * @description starts new game, calls Engine with difficulty selected,
     * removes character select eventListeners, adds game and win-modal
     * eventListeners
     */
    function newGame () {
        const menu = document.querySelector('div.char-select'),
            diffSelect = document.getElementById('js-difficulty'),
            winPlayAgain = document.getElementById('js-play-again'),
            diff = diffSelect.options[diffSelect.selectedIndex].value;
        // globally available settings
        settings = difficultyConfigs[diff];
        let enemies = settings.enemies;

        menu.classList.add('hidden');
        // initialize board
        player = new Player();
        do {
            allEnemies.push(new Enemy());
            enemies--
        } while (enemies > 0);
        // remove if it exists
        document.removeEventListener('click', charSelectClick);
        document.removeEventListener('keydown', charSelectKey);
        document.removeEventListener('keyup', keyReplay);
        winPlayAgain.removeEventListener('click', gameInit);
        winPlayAgain.removeEventListener('click', replay);
        startButton.removeEventListener('click', newGame);
        Engine(settings);
    }
    startButton.addEventListener('click', newGame);
};

/**
 * @description handles clearing of canvas, initializes new character, clears
 * enemies, hides winModal and shows character select
 */
function replay() {
    const menu = document.querySelector('div.char-select'),
        winModal = document.getElementById('js-win-modal'),
        // startButton = document.getElementById('js-new-game'),
        canvas = document.querySelector('canvas');
    winModal.classList.add('hidden');
    canvas.remove();
    menu.classList.remove('hidden');
    player = new Player();
    allEnemies = [];
    gameInit();
}

/**
 * @description wrapper for allowing "Enter" to trigger "Play Again" button
 * @param {KeyboardEvent} e
 */
function keyReplay(e) {
    if (e.key === 'Enter') {
        replay();
    }
}

// initializes variables globally to be accessible everywhere
let player = new Player();
let allEnemies = [];
document.addEventListener('DOMContentLoaded', gameInit);