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
            author = '-Unknown';
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