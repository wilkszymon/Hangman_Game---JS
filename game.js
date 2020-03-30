const Game = {
    imgAttemps: null,
    attemps: null,
    currentPassword: null,
    currentPasswordLetters: null,
    elemPassword: document.querySelector('.passwords'),
    elemLetter: document.querySelector('.game-letters'),
    btnGameStart: document.querySelector('.gameStart'),
    elemCategory: document.querySelector('.category'),
    imgToChange: document.querySelector('.imgChange'),
    imgGallows: [{
            img: "img/wisielec1-1.png",
        }, {
            img: "img/wisielec1-2.png",
        },
        {
            img: "img/wisielec1-3.png",
        },
        {
            img: "img/wisielec1-4.png",
        },
        {
            img: "img/wisielec1-5.png",
        },
        {
            img: "img/wisielec1-6.png",
        },
        {
            img: "img/wisielec1-7.png",
        },
        {
            img: "img/wisielec1-8.png",
        },
        {
            img: "img/wisielec1-9.png",
        },
    ],
    sentences: [
        "polska",
        "niemcy",
        "francja",
        "włochy",
        "stany zjednoczone",
        "gujana francuzka",
        "nowa zelandia",
        "singapur",
        "bangladesz",
        "arabia saudyjska",
        "republika środkowoafrykańska",
        "sri lanka",
        "republika południowej afryki",
        "korea południowa",
        "burkina faso",
        "demokratyczna republika konga",
        "bośnia i hercegowina",
        "gwinea równikowa",
        "papua nowa gwinea",
    ],

    generateLetter() {
        const alphabets = ["a", "ą", "b", "c", "ć", "d", "e", "ę", "f", "g", "h", "i", "j", "k", "l", "ł", "m", "n", "ń", "o", "ó", "p", "q", "r", "s", "ś", "t", "u", "v", "w", "x", "y", "z", "ź", "ż"];

        alphabets.forEach((alphabet) => {
            const button = document.createElement('button');
            button.type = "button";
            button.classList.add('game-letter');
            button.dataset.alphabet = alphabet;
            button.innerText = alphabet;
            this.elemLetter.appendChild(button);
        })
    },

    correctLetters(letter) {
        if (this.currentPassword.includes(letter)) {
            const passwordsBox = this.elemPassword.querySelectorAll('.game-password');

            passwordsBox.forEach((passwordBox, i) => {
                if (this.currentPassword[i] === letter) {
                    passwordBox.innerText = letter;
                }
            })

            this.currentPasswordLetters = this.currentPasswordLetters.replace(new RegExp(letter, "g"), "");

            if (!this.letterIs()) {
                this.gameWin();
            }
        } else {
            this.attemps--;
            this.imgAttemps++;
            this.showGallows();

            if (this.attemps <= 0) {
                this.gameOver();
            }
        }
    },

    generateSentence() {
        const random = Math.floor(Math.random() * this.sentences.length);
        this.currentPassword = this.sentences[random];
        this.sentences.splice(random, 1);

        this.currentPasswordLetters = this.currentPassword.replace(/ /g, "");
        console.log(this.currentPassword);

        this.elemPassword.innerText = " ";
        const letters = this.currentPassword.split("");
        letters.forEach(letter => {
            const div = document.createElement("div");
            div.classList.add("game-password");
            if (letter === " ") {
                div.classList.add("game-password-box-space");
            }
            this.elemPassword.appendChild(div);
        })
    },

    visibleLetter() {
        this.elemLetter.addEventListener("click", e => {
            const value = e.target.dataset.alphabet;
            this.correctLetters(value);
            e.target.disabled = true;
        });
    },

    visibleCategory() {
        this.elemCategory.classList.add('active');
    },

    changebtn() {
        this.btnGameStart.textContent = "Losuj nowe hasło!";
    },

    disableLetters() {
        const letters = this.elemLetter.querySelectorAll('.game-letter');
        letters.forEach(letter => {
            letter.disabled = true;
        })
    },
    enableLetters() {
        const letters = this.elemLetter.querySelectorAll('.game-letter');
        letters.forEach(letter => {
            letter.disabled = false;
        })
    },


    letterIs() {
        return this.currentPasswordLetters.length;
    },

    gameOver() {
        alert(`Przegrałes, hasło to: ${this.currentPassword}`);
    },

    gameWin() {
        alert(`Gratulacje, wygrałes. Spróbuj swoich sił jeszcze raz!`)

    },

    showGallows() {
        return this.imgToChange.src = this.imgGallows[this.imgAttemps].img;
    },
    init() {
        this.visibleLetter();
        this.generateLetter();
        this.disableLetters();
    },
    strGame() {
        this.attemps = 8;
        this.imgAttemps = 0;
        this.enableLetters();
        this.showGallows();
        this.generateSentence();
        this.changebtn();
        this.visibleCategory();
    }
};

Game.init();

document.querySelector('.gameStart').addEventListener('click', () => Game.strGame());