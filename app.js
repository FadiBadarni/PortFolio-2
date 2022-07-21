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

// const nameTitle2 = document.querySelector('.name-title2');
// nameTitle2.classList.remove(".name-title2");
// nameTitle2.offsetWidth;

// setTimeout(() => {
//     nameTitle2.style.visibility = 'visible';
//     element.classList.add(".name-title2");
// }, 5000); 