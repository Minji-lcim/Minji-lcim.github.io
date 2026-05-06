// assets/js/freq.js
function countChar(text_1, target_1) {
    let count = 0;
    for (const ch of text_1) {
        if (ch === target_1) count++;
    }
    return count;
}

const text_1 = "이상의 「날개」는 1936년에 발표된 단편소설이다.";
const targets_1 = ["이", "의", "날", "개", "소"];

const counts = targets_1.map(t => countChar(text_1, t));
console.log(counts);

for (let i = 0; i < targets_1.length; i++) {
console.log(`'${targets_1[i]}': ${counts[i]}번`);
}

const frequent = targets_1.filter(t => countChar(text_1, t) >= 2);
console.log(frequent);

let maxIdx = 0;
for (let i = 1; i < counts.length; i++) {
    if (counts[i] > counts[maxIdx]) maxIdx = i;
}
const top = targets_1[maxIdx];
console.log(`가장 자주 나온 글자: '${top}' (${counts[maxIdx]}번)`);