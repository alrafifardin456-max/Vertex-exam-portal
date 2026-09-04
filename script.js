const questionBank = {
    Physics: [
        { q: "১. ভেক্টরের ডট গুণন শূন্য হলে ভেক্টরদ্বয় কীভাবে থাকে?", options: ["সমান্তরাল", "লম্ব", "৪৫ ডিগ্রি কোণে", "বিপরীত"], ans: 1 },
        { q: "২. কৌণিক ভরবেগের একক কোনটি?", options: ["kg m/s", "kg m²/s", "N s", "J s²"], ans: 1 }
    ],
    Math: [
        { q: "১. x² + y² - 4x + 6y - 12 = 0 বৃত্তের কেন্দ্র কোনটি?", options: ["(2, -3)", "(-2, 3)", "(4, -6)", "(2, 3)"], ans: 0 }
    ],
    Chemistry: [
        { q: "১. এসটিপিতে (STP) ১ মোল গ্যাসের আয়তন কত?", options: ["22.4 L", "24.789 L", "22.71 L", "25.0 L"], ans: 0 }
    ],
    Biology: [
        { q: "১. কোষের শক্তিঘর (Power House) কাকে বলা হয়?", options: ["রাইবোসোম", "লাইসোসোম", "মাইটোকন্ড্রিয়া", "গলজি বডি"], ans: 2 }
    ]
};

let currentQ = [], idx = 0, score = 0;

function start(sub) {
    if(!questionBank[sub]) return alert("প্রশ্ন নেই!");
    currentQ = questionBank[sub]; idx = 0; score = 0;
    document.getElementById("dash").style.display = "none";
    document.getElementById("quiz").style.display = "block";
    document.getElementById("title").innerText = sub + " এক্সাম";
    show();
}

function show() {
    let q = currentQ[idx];
    document.getElementById("q-text").innerText = q.q;
    let html = "";
    q.options.forEach((o, i) => {
        html += `<button class="opt" onclick="check(${i})">${o}</button>`;
    });
    document.getElementById("opts").innerHTML = html;
}

function check(sel) {
    if(sel === currentQ[idx].ans) score++;
    idx++;
    if(idx < currentQ.length) show();
    else {
        document.getElementById("quiz").style.display = "none";
        document.getElementById("res").style.display = "block";
        document.getElementById("score").innerText = `প্রাপ্ত নম্বর: ${score} / ${currentQ.length}`;
    }
                                                                           }
