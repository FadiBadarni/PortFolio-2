//fetch quote using API
async function fetchQuote() {
    const url = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Request not found');
        }
        const quotes = await response.json();
        return quotes;
    } catch (e) {
        alert(e);
    }
}
const quotesPromise = fetchQuote();
const quoteEl = document.getElementById('quote');
const quoteAuthorEl = document.getElementById('author');

async function generateQuote() {
    quotesPromise.then(quotes => {
        const randomQuoteIndex = Math.floor(Math.random() * quotes.length);
        const quoteText = quotes[randomQuoteIndex].text;
        let author = quotes[randomQuoteIndex].author;
        if (!author) {
            author = 'Unknown';
        }

        (function (next) {
            setTimeout(function () {
                unfade(quoteEl)
                unfade(quoteAuthorEl)
            }, 9800);
            next()
        }(function () {
            quoteEl.textContent = "❝" + quoteText + "❞";
            quoteAuthorEl.textContent = "- " + author;
        }))
    });
    setTimeout(generateQuote, 10000);
}

generateQuote();

//Fade quote author and text in
async function unfade(element) {
    var op = 0.1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1) {
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 100);
}

// Highlight words in the quote section
quoteEl.onmouseover = e => {
    e.target.innerHTML = e.target.innerText.replace(/([\w]+)/g, '<span>$1</span>');
};



(function () {

    const link = document.querySelectorAll('nav > .navBar-item-hover');
    const cursor = document.querySelector('.cursor');

    const animateit = function (e) {
        const span = this.querySelector('span');
        const { offsetX: x, offsetY: y } = e,
            { offsetWidth: width, offsetHeight: height } = this,

            move = 25,
            xMove = x / width * (move * 2) - move,
            yMove = y / height * (move * 2) - move;

        span.style.transform = `translate(${xMove}px, ${yMove}px)`;

        if (e.type === 'mouseleave') span.style.transform = '';
    };

    const editCursor = e => {
        const { clientX: x, clientY: y } = e;
        cursor.style.left = x + 'px';
        cursor.style.top = y + 'px';
    };

    link.forEach(b => b.addEventListener('mousemove', animateit));
    link.forEach(b => b.addEventListener('mouseleave', animateit));
    window.addEventListener('mousemove', editCursor);

})();

var i = 0;
var txt = 'Hey!, I`m Fadi. A Software Engineering Student.';
var txt2 = 'According to my calculations the problem doesn`t exist.';
var speed = 100;
var firstLineMaxChars = 14

function typeWriter() {
    if (i < txt.length) {
        var char = txt.charAt(i)

        if (i == firstLineMaxChars) {
            char += '</br>'
        }

        document.getElementById("name-title").innerHTML += char;
        i++;
        setTimeout(typeWriter, speed);
    }
}
typeWriter();
var j = 0;
function typeWriter2() {
    if (j < txt2.length) {
        var char2 = txt2.charAt(j)
        document.getElementById("phrase").innerHTML += char2;
        j++;
        setTimeout(typeWriter2, speed);
    }
}
typeWriter2();
