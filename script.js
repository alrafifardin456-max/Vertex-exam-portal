// কুইজ এবং এক্সাম তালিকা (এখানে সময় বা তারিখের কোনো ঝামেলা নেই)
const liveExams = [
    {
        id: "p1",
        title: "পদার্থবিজ্ঞান: ভেক্টর ও নিউটনীয় বলবিদ্যা",
        subject: "Physics",
        durationMinutes: 10, // শিক্ষার্থী 'START EXAM' চাপ দিলে ১০ মিনিটের টাইমার চালু হবে
        questions: [
            { 
                q: "১. ভেক্টরের ডট গুণন শূন্য হলে ভেক্টরদ্বয়ের মধ্যবর্তী কোণ কত?", 
                options: ["0°", "45°", "90°", "180°"], 
                ans: 2,
                explain: "ব্যাখ্যা: A.B = AB cos(θ) = 0 হলে, cos(θ) = 0, সুতরাং θ = 90°।" 
            },
            { 
                q: "২. কৌণিক ভরবেগের মাত্রা কোনটি?", 
                options: ["MLT⁻¹", "ML²T⁻¹", "ML²T⁻²", "MLT⁻²"], 
                ans: 1,
                explain: "ব্যাখ্যা: L = r × p = mvr। সুতরাং মাত্রা = [M][L][LT⁻¹] = ML²T⁻¹।" 
            },
            { 
                q: "৩. দুটি সমান ভেক্টরের লব্ধি এদের যেকোনো একটির সমান হলে মধ্যবর্তী কোণ কত?", 
                options: ["60°", "90°", "120°", "180°"], 
                ans: 2,
                explain: "ব্যাখ্যা: R² = P² + Q² + 2PQ cos(α)। P=Q=R বসালে cos(α) = -1/2, তাই α = 120°।" 
            }
        ]
    },
    {
        id: "c1",
        title: "রসায়ন: গুণগত রসায়ন ও পর্যায়বৃত্ত ধর্ম",
        subject: "Chemistry",
        durationMinutes: 15, // ১৫ মিনিটের এক্সাম
        questions: [
            { 
                q: "১. শিখা পরীক্ষায় ক্যালসিয়ামের বর্ণ কেমন দেখায়?", 
                options: ["ইটের মতো লাল", "সোনালী হলুদ", "কাঁচা আপেলের মতো সবুজ", "বেগুনি"], 
                ans: 0,
                explain: "ব্যাখ্যা: Ca²⁺ আয়ন শিখা পরীক্ষায় ইট লাল (Brick Red) বর্ণ দেখায়।" 
            }
        ]
    }
];

let activeExam = null;
let currentQIdx = 0;
let userAnswers = {};
let totalSeconds = 0;
let mainTimer = null;

// ড্যাশবোর্ডে এক্সাম তালিকা প্রদর্শন
window.onload = function() {
    const listDiv = document.getElementById("exam-list");
    let html = "";

    liveExams.forEach((ex, idx) => {
        html += `
            <div class="exam-card">
                <div class="exam-title">${ex.title}</div>
                <div class="exam-time">⏱️ সময়: ${ex.durationMinutes} মিনিট | মোট প্রশ্ন: ${ex.questions.length}টি</div>
                <button class="btn btn-start" onclick="startLiveExam(${idx})">START EXAM</button>
            </div>
        `;
    });

    listDiv.innerHTML = html;
};

// পরীক্ষা শুরু এবং নির্দিষ্ট টাইমার গণনা
function startLiveExam(index) {
    activeExam = liveExams[index];
    userAnswers = {};
    currentQIdx = 0;
    totalSeconds = activeExam.durationMinutes * 60; // মিনিটকে সেকেন্ডে রূপান্তর

    document.getElementById("dash").style.display = "none";
    document.getElementById("quiz").style.display = "block";
    document.getElementById("sub-tag").innerText = activeExam.subject;

    startTimer();
    renderPalette();
    loadQuestion(0);
}

// উল্টো টাইমার চলা শুরু হবে
function startTimer() {
    mainTimer = setInterval(() => {
        totalSeconds--;
        let m = Math.floor(totalSeconds / 60);
        let s = totalSeconds % 60;
        document.getElementById("time").innerText = `${m < 10 ? '0'+m : m}:${s < 10 ? '0'+s : s}`;

        if (totalSeconds <= 0) {
            clearInterval(mainTimer);
            alert("পরীক্ষার নির্ধারিত সময় শেষ! আপনার উত্তরপত্র জমা দেওয়া হচ্ছে...");
            submitExam();
        }
    }, 1000);
}

// প্রশ্ন নেভিগেশন নম্বর বাটন (১, ২, ৩...)
function renderPalette() {
    let pHTML = "";
    activeExam.questions.forEach((_, i) => {
        let isAnswered = userAnswers.hasOwnProperty(i);
        let isCurrent = i === currentQIdx;
        pHTML += `<button class="p-btn ${isAnswered ? 'answered' : ''} ${isCurrent ? 'current' : ''}" onclick="loadQuestion(${i})">${i + 1}</button>`;
    });
    document.getElementById("palette").innerHTML = pHTML;
}

// প্রশ্ন স্ক্রিনে দেখানো
function loadQuestion(idx) {
    currentQIdx = idx;
    renderPalette();
    const qData = activeExam.questions[idx];
    
    document.getElementById("q-text").innerText = qData.q;
    let optsHTML = "";

    qData.options.forEach((optText, oIdx) => {
        let isSelected = userAnswers[idx] === oIdx;
        optsHTML += `
            <button class="opt ${isSelected ? 'selected' : ''}" onclick="selectOption(${oIdx})">
                <b>${String.fromCharCode(65 + oIdx)}.</b> ${optText}
            </button>
        `;
    });

    document.getElementById("opts").innerHTML = optsHTML;
}

function selectOption(optIdx) {
    userAnswers[currentQIdx] = optIdx;
    loadQuestion(currentQIdx);
}

function clearAns() {
    delete userAnswers[currentQIdx];
    loadQuestion(currentQIdx);
}

function nextQ() {
    if (currentQIdx < activeExam.questions.length - 1) loadQuestion(currentQIdx + 1);
}

function prevQ() {
    if (currentQIdx > 0) loadQuestion(currentQIdx - 1);
}

function confirmSubmit() {
    if (confirm("আপনি কি নিশ্চিত যে পরীক্ষা জমা দিতে চান?")) {
        clearInterval(mainTimer);
        submitExam();
    }
}

// উত্তর হিসাব ও ব্যাখ্যা দেখানো
function submitExam() {
    document.getElementById("quiz").style.display = "none";
    document.getElementById("res").style.display = "block";

    let correctCount = 0;
    let wrongCount = 0;
    let unansweredCount = 0;

    activeExam.questions.forEach((q, i) => {
        if (userAnswers.hasOwnProperty(i)) {
            if (userAnswers[i] === q.ans) {
                correctCount++;
            } else {
                wrongCount++;
            }
        } else {
            unansweredCount++;
        }
    });

    let score = (correctCount * 1) - (wrongCount * 0.25);
    score = score < 0 ? 0 : score;

    document.getElementById("score-card").innerHTML = `
        <h3 style="margin:0 0 10px 0;">প্রাপ্ত নম্বর: <span style="color:#2563eb;">${score}</span> / ${activeExam.questions.length}</h3>
        <p style="font-size: 14px; margin:0;">
            <span class="correct-ans">সঠিক: ${correctCount}</span> | 
            <span class="wrong-ans">ভুল (-০.২৫): ${wrongCount}</span> | 
            <span>উত্তর দেননি: ${unansweredCount}</span>
        </p>
    `;

    let reviewHTML = "<h3>📖 উত্তরপত্র ও ব্যাখ্যা (Solutions):</h3>";
    activeExam.questions.forEach((q, i) => {
        let uAns = userAnswers[i];
        let isCorrect = uAns === q.ans;
        let uAnsText = uAns !== undefined ? q.options[uAns] : "উত্তর দেওয়া হয়নি";

        reviewHTML += `
            <div style="margin-bottom: 15px; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">
                <p><b>${q.q}</b></p>
                <p style="font-size:14px;">আপনার উত্তর: <span class="${isCorrect ? 'correct-ans' : 'wrong-ans'}">${uAnsText}</span></p>
                ${!isCorrect ? `<p style="font-size:14px;">সঠিক উত্তর: <span class="correct-ans">${q.options[q.ans]}</span></p>` : ''}
                <div class="explanation">${q.explain}</div>
            </div>
        `;
    });

    document.getElementById("review-sec").innerHTML = reviewHTML;
                                                                         }
