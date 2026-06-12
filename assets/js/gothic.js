// [숙제13] 텍스트 분석 도구 구현
// 2023-14936 김민지

// --- 함수 정의들 (21강 코드 재사용) ---
function extractBody(text) {
    const startMark = "*** START OF THE PROJECT GUTENBERG EBOOK";
    const endMark   = "*** END OF THE PROJECT GUTENBERG EBOOK";

    const startIdx = text.indexOf(startMark);
    const endIdx   = text.indexOf(endMark);

    if (endIdx === -1) {
        return text.slice(startIdx);
    }
    return text.slice(startIdx, endIdx);
}



// --- 메인: 네 파일을 동시에 fetch ---
Promise.all([
  fetch("/data/frankenstein.txt").then(r => r.text()),
  fetch("/data/dracula.txt").then(r => r.text()),
  fetch("/data/stopwords-en.txt").then(r => r.text()),
  fetch("/data/stopwords-custom.txt").then(r => r.text()), // Q2. 새 불용어 파일
])
.then(([frankText, dracText, baseStop, customStop]) => {
  
  const stopwords = (baseStop + "\n" + customStop)
    .split(/\s+/)
    .filter(w => w.length > 0);

  function analyze(text, stopwordsList) {
    const body = extractBody(text);
    const words = getWords(body);
    const cleaned = removeStopwords(words, stopwordsList);
    const counts = countWords(cleaned);
    return topN(counts, 30); 
  }

  const frankTop = analyze(frankText, stopwords);
  const dracTop = analyze(dracText, stopwords);

  drawChart("#chart-frankenstein", frankTop, "rgba(40, 167, 69, 0.6)");
  drawChart("#chart-dracula", dracTop, "rgba(220, 53, 69, 0.6)");
});