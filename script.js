// DOM Elements
const loginPage = document.getElementById('loginPage');
const testPage = document.getElementById('testPage');
const resultPage = document.getElementById('resultPage');
const webcamContainer = document.getElementById('webcamContainer');
const webcamVideo = document.getElementById('webcam');
const capturedCanvas = document.createElement('canvas');
const nameInput = document.getElementById('name');
const passwordInput = document.getElementById('password');
const termsCheckbox = document.getElementById('terms');
const startTestButton = document.getElementById('startTest');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitTestButton = document.getElementById('submitTest');
const timerDisplay = document.getElementById('timeLeft');
const resultText = document.getElementById('resultText');
const downloadResultButton = document.getElementById('downloadResult');
const questionContainer = document.getElementById('questionContainer');
const questionNumberDisplay = document.getElementById('questionNumber');
const questionMatrix = document.getElementById('questionMatrix');

// Variables
let userName = "";
let capturedImage = null;
let currentQuestionIndex = 0;
let selectedAnswers = [];
let attemptedQuestions = new Set();
let timer;
let timeRemaining = 10 * 60; // 10 minutes
let timeElapsed = 0;
let startTime;
let imageCaptured = false;
let testStarted = false; // Prevents duplicate starts

// Questions Array
const questions =  [
    {
        question: "What is the capital of the United States?",
        options: ["Washington, D.C.", "New York", "Los Angeles", "Chicago"],
        correctAnswer: "Washington, D.C."
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Earth", "Venus", "Jupiter"],
        correctAnswer: "Mars"
    },
    {
        question: "Who is known as the 'Father of India'?",
        options: ["Mahatma Gandhi", "Jawaharlal Nehru", "Subhas Chandra Bose", "Bhagat Singh"],
        correctAnswer: "Mahatma Gandhi"
    },
    {
        question: "Which is the largest ocean on Earth?",
        options: ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean", "Arctic Ocean"],
        correctAnswer: "Pacific Ocean"
    },
    {
        question: "What is the largest continent?",
        options: ["Asia", "Africa", "North America", "Europe"],
        correctAnswer: "Asia"
    },
    {
        question: "Which country is famous for the Eiffel Tower?",
        options: ["France", "Italy", "United States", "Germany"],
        correctAnswer: "France"
    },
    {
        question: "What is the national animal of India?",
        options: ["Bengal Tiger", "Elephant", "Peacock", "Lion"],
        correctAnswer: "Bengal Tiger"
    },
    {
        question: "Which planet is closest to the Sun?",
        options: ["Mercury", "Venus", "Earth", "Mars"],
        correctAnswer: "Mercury"
    },
    {
        question: "Who wrote the famous play 'Romeo and Juliet'?",
        options: ["William Shakespeare", "Charles Dickens", "Jane Austen", "Homer"],
        correctAnswer: "William Shakespeare"
    },
    {
        question: "Which country is known as the Land of the Rising Sun?",
        options: ["Japan", "China", "South Korea", "India"],
        correctAnswer: "Japan"
    },
    {
        question: "What is the largest desert in the world?",
        options: ["Sahara Desert", "Arabian Desert", "Gobi Desert", "Kalahari Desert"],
        correctAnswer: "Sahara Desert"
    },
    {
        question: "Which is the smallest country in the world?",
        options: ["Vatican City", "Monaco", "San Marino", "Liechtenstein"],
        correctAnswer: "Vatican City"
    },
    {
        question: "What is the capital of the United Kingdom?",
        options: ["London", "Edinburgh", "Manchester", "Belfast"],
        correctAnswer: "London"
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        options: ["Oxygen", "Osmium", "Ozone", "Oganesson"],
        correctAnswer: "Oxygen"
    },
    {
        question: "Which animal is the largest mammal?",
        options: ["Blue Whale", "Elephant", "Giraffe", "Rhino"],
        correctAnswer: "Blue Whale"
    },
    {
        question: "What is the longest river in the world?",
        options: ["Nile River", "Amazon River", "Yangtze River", "Mississippi River"],
        correctAnswer: "Nile River"
    },
    {
        question: "Which color do you get by mixing red and yellow?",
        options: ["Orange", "Green", "Purple", "Brown"],
        correctAnswer: "Orange"
    },
    {
        question: "What is the freezing point of water in Celsius?",
        options: ["0°C", "32°C", "100°C", "-10°C"],
        correctAnswer: "0°C"
    },
    {
        question: "Which fruit is known as the 'king of fruits'?",
        options: ["Durian", "Mango", "Banana", "Pineapple"],
        correctAnswer: "Durian"
    },
    {
        question: "How many continents are there on Earth?",
        options: ["Seven", "Six", "Five", "Eight"],
        correctAnswer: "Seven"
    },
    {
        question: "Which planet is known for its rings?",
        options: ["Saturn", "Neptune", "Jupiter", "Uranus"],
        correctAnswer: "Saturn"
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Claude Monet"],
        correctAnswer: "Leonardo da Vinci"
    },
    {
        question: "What is the largest country by land area?",
        options: ["Russia", "Canada", "United States", "China"],
        correctAnswer: "Russia"
    },
    {
        question: "Which country is home to the Great Barrier Reef?",
        options: ["Australia", "New Zealand", "United States", "South Africa"],
        correctAnswer: "Australia"
    },
    {
        question: "Which is the tallest mountain in the world?",
        options: ["Mount Everest", "Mount Kilimanjaro", "K2", "Mount Fuji"],
        correctAnswer: "Mount Everest"
    },
    {
        question: "Which animal is known as the 'King of the Jungle'?",
        options: ["Lion", "Tiger", "Elephant", "Giraffe"],
        correctAnswer: "Lion"
    },
    {
        question: "What is the smallest continent?",
        options: ["Australia", "Antarctica", "Europe", "Africa"],
        correctAnswer: "Australia"
    },
    {
        question: "Which language is most spoken in the world?",
        options: ["Mandarin Chinese", "English", "Spanish", "Hindi"],
        correctAnswer: "Mandarin Chinese"
    },
    {
        question: "What is the hardest natural substance on Earth?",
        options: ["Diamond", "Gold", "Iron", "Platinum"],
        correctAnswer: "Diamond"
    },
    {
        question: "In which country would you find the Great Wall?",
        options: ["China", "India", "Russia", "Japan"],
        correctAnswer: "China"
    },
    {
        question: "Which animal is the fastest land animal?",
        options: ["Cheetah", "Lion", "Gazelle", "Elephant"],
        correctAnswer: "Cheetah"
    },
    {
        question: "Which famous ship sank in 1912 after hitting an iceberg?",
        options: ["Titanic", "Queen Mary", "Lusitania", "Britannic"],
        correctAnswer: "Titanic"
    },
    {
        question: "Which color is commonly associated with love and romance?",
        options: ["Red", "Blue", "Yellow", "Green"],
        correctAnswer: "Red"
    },
    {
        question: "What is the name of Harry Potter's owl?",
        options: ["Hedwig", "Errol", "Pigwidgeon", "Buckbeak"],
        correctAnswer: "Hedwig"
    },
    {
        question: "Which country is known as the Land of the Rising Sun?",
        options: ["Japan", "China", "South Korea", "India"],
        correctAnswer: "Japan"
    }
];


// Enable Start Test button when all fields are filled
function toggleStartTestButton() {
    startTestButton.disabled = !(nameInput.value.trim() && passwordInput.value.trim() && termsCheckbox.checked);
}

// Event Listeners
nameInput.addEventListener('input', toggleStartTestButton);
passwordInput.addEventListener('input', toggleStartTestButton);
termsCheckbox.addEventListener('change', toggleStartTestButton);

// Start Test
function startTest() {
    if (testStarted) return; // Prevent multiple test starts
    testStarted = true;

    userName = nameInput.value.trim();
    if (!userName) {
        alert("Please enter your name.");
        return;
    }

    loginPage.classList.add('hidden');
    testPage.classList.remove('hidden');
    webcamContainer.classList.remove('hidden');

    startTimer();
    startWebcam();
    createQuestionMatrix();
    loadQuestion();  // Ensure the first question loads
}

// Start Timer
function startTimer() {
    startTime = Date.now();
    timer = setInterval(() => {
        timeRemaining--;
        timeElapsed++;

        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        // Capture image only once in the 2-6 minute window
        if (!imageCaptured && timeElapsed >= Math.floor(Math.random() * (360 - 120) + 120)) {
            captureImage();
            imageCaptured = true;
        }

        // Stop the timer when time runs out
        if (timeRemaining <= 0) {
            clearInterval(timer);
            alert("Time's up! Your test will be submitted.");
            submitTest();
        }
    }, 1000);
}
// Start Webcam
function startWebcam() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            webcamVideo.srcObject = stream;
        })
        .catch(err => {
            alert("Webcam access denied. Test cannot start.");
            startTestButton.disabled = true;
        });
}

// Capture Image from Webcam (Only Once)
function captureImage() {
    const context = capturedCanvas.getContext('2d');
    capturedCanvas.width = webcamVideo.videoWidth;
    capturedCanvas.height = webcamVideo.videoHeight;
    context.drawImage(webcamVideo, 0, 0, webcamVideo.videoWidth, webcamVideo.videoHeight);

    capturedImage = capturedCanvas.toDataURL('image/png');
}

// Load Question
// Load Question
function loadQuestion() {
    const question = questions[currentQuestionIndex];

    questionContainer.innerHTML = `
        <div class="question-card">
            <h4>${question.question}</h4>
            ${question.options.map((option) => `
                <label class="option-card">
                    <input type="radio" name="option" value="${option}" onclick="selectOption('${option}')">
                    ${option}
                </label>
            `).join('')}
        </div>
    `;

    prevBtn.classList.toggle('hidden', currentQuestionIndex === 0);
    nextBtn.classList.toggle('hidden', currentQuestionIndex === questions.length - 1);
    submitTestButton.classList.toggle('hidden', currentQuestionIndex !== questions.length - 1); // Show submit button on last question
    questionNumberDisplay.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
}
// Select Answer
function selectOption(option) {
    selectedAnswers[currentQuestionIndex] = option;
    attemptedQuestions.add(currentQuestionIndex);
    updateQuestionMatrix();
}

// Next & Previous Question
function showNextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    }
}

function showPrevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

// Create Question Matrix
function createQuestionMatrix() {
    questionMatrix.innerHTML = "";
    for (let i = 0; i < questions.length; i++) {
        const questionItem = document.createElement('div');
        questionItem.classList.add('question-item');
        questionItem.textContent = i + 1;
        questionItem.addEventListener('click', () => {
            currentQuestionIndex = i;
            loadQuestion();
        });
        questionMatrix.appendChild(questionItem);
    }
}

// Update Question Matrix Colors
function updateQuestionMatrix() {
    const questionItems = document.querySelectorAll('.question-item');
    questionItems.forEach((item, index) => {
        item.classList.toggle('attempted', attemptedQuestions.has(index));
    });
}

// Submit Test (Auto-submit only)
// Submit Test
function submitTest() {
    testPage.classList.add('hidden');
    webcamContainer.classList.add('hidden');
    resultPage.classList.remove('hidden');

    const correctAnswersCount = selectedAnswers.filter((answer, index) => answer === questions[index].correctAnswer).length;

    resultText.innerHTML = `
        <h2>🎉 Test Results 🎉</h2>
        <table border="1">
            <tr><th>Name</th><td>${userName}</td></tr>
            <tr><th>Score</th><td>${correctAnswersCount} / ${questions.length}</td></tr>
            <tr><th>Time Taken</th><td>${Math.floor(timeElapsed / 60)} min ${timeElapsed % 60} sec</td></tr>
            <tr><th>Questions Attempted</th><td>${attemptedQuestions.size} / ${questions.length}</td></tr>
        </table>
    `;

    if (capturedImage) {
        document.getElementById('capturedImageContainer').innerHTML = `<img src="${capturedImage}" alt="Captured Image" />`;
    }

    downloadResultButton.classList.remove('hidden');
    downloadResultButton.addEventListener('click', downloadResult);
}

// Download Result File with Captured Images
function downloadResult() {
    let resultHTML = `
        <html>
        <head>
            <title>Test Results</title>
            <style>
                body { font-family: 'Poppins', sans-serif; background: #f0f4f8; padding: 20px; }
                h1 { color: #2c3e50; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { padding: 10px; border: 1px solid #ddd; text-align: left; }
                th { background: #3498db; color: white; }
                img { max-width: 100%; border-radius: 8px; margin-top: 10px; }
            </style>
        </head>
        <body>
        <h1>Test Results</h1>
        <p><strong>Name:</strong> ${userName}</p>
        <p><strong>Score:</strong> ${selectedAnswers.filter((answer, index) => answer === questions[index].correctAnswer).length} / ${questions.length}</p>
        <p><strong>Time Taken:</strong> ${Math.floor(timeElapsed / 60)} min ${timeElapsed % 60} sec</p>
        <h2>Captured Images:</h2>
    `;

    if (capturedImage) {
        resultHTML += `<p>Captured Image: <br> <img src="${capturedImage}" width="200" /></p>`;
    }

    resultHTML += `</body></html>`;

    const blob = new Blob([resultHTML], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${userName}_test_results.html`;
    link.click();
}

// Prevent Tab Switching (Auto Submit)
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        alert("You switched tabs! The test is now submitted.");
        submitTest();
    }
});

// Disable Right Click, Copy, Paste, Cut
document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener('copy', event => event.preventDefault());
document.addEventListener('paste', event => event.preventDefault());
document.addEventListener('cut', event => event.preventDefault());

// Initialize App
startTestButton.addEventListener('click', startTest);
nextBtn.addEventListener('click', showNextQuestion);
prevBtn.addEventListener('click', showPrevQuestion);
submitTestButton.addEventListener('click', submitTest);
