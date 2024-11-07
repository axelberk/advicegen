async function fetchQuotes(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Unable to connect");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

function generateQuote() {
    const apiUrl = "https://api.adviceslip.com/advice";
    const adviceText = document.getElementById("advice-text");
    const generatedQuote = document.getElementById("generated-quote");
    fetchQuotes(apiUrl)
        .then(data => {
            if (data && data.slip && data.slip.advice) {
                const advice = data.slip.advice;
                adviceText.textContent = `ADVICE #${data.slip.id}`
                generatedQuote.textContent = `"${advice}"`;
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}

document.getElementById('copy-button').addEventListener('click', function() {
    const generatedQuote = document.getElementById('generated-quote').textContent;
    if (generatedQuote.trim() === "") {
        alert("Please generate a quote first.");
        return;
    }
    copyQuote(generatedQuote);
});

function copyQuote(text) {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    alert('Quote successfully copied!');
}

window.addEventListener('load', generateQuote);