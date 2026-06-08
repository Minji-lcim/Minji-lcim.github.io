//페이지가열리자마자불용어파일을미리받아둔다.
const stopwordsPromise = fetch("/data/stopwords-en.txt")
    .then(r=> r.text())
    .then(text=>text.split(/\s+/).filter(w=>w.length> 0));

//차트객체를기억해두는변수.
let resultChart = null;

const button = document.querySelector("#analyze-btn");

button.addEventListener("click", () => {
    const text = document.querySelector("#input-text").value;
    stopwordsPromise.then(stopwords => {
        const words = getWords(text);
        const cleaned = removeStopwords(words, stopwords);
        const counts = countWords(cleaned);
        const top = topN(counts, 20);

        if (resultChart) resultChart.destroy();
        resultChart = drawChart("#result-chart", top, "rgba(40, 167, 69, 0.6)");
    });
});