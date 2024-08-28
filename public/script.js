let timer;
let timeRemaining = 3600; // 1 hour in seconds
let currentSection = null; // Track the current section
const completedSections = new Set(); // Track completed sections

function startTimer() {
    timer = setInterval(() => {
        timeRemaining--;
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        document.getElementById('timer').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        if (timeRemaining <= 0) {
            clearInterval(timer);
            alert('Time is up!');
            // Optionally, handle exam end here
        }
    }, 1000);
}

// Handle category button clicks
document.getElementById('aptitude-button').addEventListener('click', () => loadQuestions('aptitude'));
document.getElementById('technical-button').addEventListener('click', () => loadQuestions('technical'));
document.getElementById('coding-button').addEventListener('click', () => loadQuestions('coding'));

function loadQuestions(category) {
    currentSection = category; // Update current section
    document.getElementById('category-selection').style.display = 'none';
    document.getElementById('exam-section').style.display = 'block';
    document.getElementById('video-section').style.display = 'block'; // Show video section

    // Update URL without reloading the page
    history.pushState(null, '', `/${category}`);

    const questions = {
        aptitude: ['A train travels from A to B at a speed of 60 km/h and from B to A at 90 km/h. What is the average speed of the train for the entire journey?', 'If the day after tomorrow is Monday, what day is today?','A sum of money amounts to $1,200 after 2 years and $1,440 after 4 years at simple interest. What is the rate of interest per annum?','A company’s sales increased by 20% in the first year and 30% in the second year. If the initial sales were $100,000, what are the sales at the end of the second year?','Solve for x if 2x+3=7x-12'],
        technical: ['Explain the concept of "closure" in JavaScript.', 'What are the differences between SQL and NoSQL databases?','What is a REST API and what are its main components?','Explain the concept of inheritance in object-oriented programming.','What are microservices and how do they differ from a monolithic architecture?'],
        coding: ['Write a function to reverse a string in Python.', 'Implement a function to find the factorial of a number using recursion in JavaScript.','Write a SQL query to find the second highest salary from an employee table.','Write a function to check if a given number is a prime number in C++.','Write a function to sort an array of integers using the bubble sort algorithm in Java.']
    };

    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = '';
    questions[category].forEach((question, index) => {
        const questionElement = document.createElement('div');
        questionElement.innerHTML = `
            <label for="q${index}">${question}</label>
            <input type="text" id="q${index}" name="q${index}" required>
        `;
        questionContainer.appendChild(questionElement);
    });

    startTimer();

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
            console.log('Camera and microphone access granted.');
            const videoElement = document.getElementById('video');
            videoElement.srcObject = stream;
            videoElement.play();
        })
        .catch(error => {
            console.error('Error accessing camera or microphone:', error);
        });
}

// Handle the signup form submission
document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    console.log('Username:', username);
    console.log('Password:', password);

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById('signup-message').textContent = 'User registered successfully!';
            document.getElementById('signup-section').style.display = 'none';
            document.getElementById('category-selection').style.display = 'block';
        } else {
            document.getElementById('signup-message').textContent = data.error || 'Error registering user';
        }
    } catch (error) {
        console.error('Error:', error); // Log error details for debugging
        document.getElementById('signup-message').textContent = 'Error registering user. Please try again.';
    }
});

// Handle the submit button click
document.getElementById('submit-button').addEventListener('click', () => {
    if (currentSection) {
        completedSections.add(currentSection);
        document.getElementById(`${currentSection}-button`).disabled = true;
    }

    // Check if all sections are completed
    if (completedSections.size === 3) {
        // All sections are completed, redirect to thank-you page
        localStorage.setItem('examCompleted', 'true');
        window.location.href = '/thankyou.html';
    } else {
        // Reset the exam page to show the category selection and hide the exam section
        document.getElementById('category-selection').style.display = 'block';
        document.getElementById('exam-section').style.display = 'none';
        document.getElementById('video-section').style.display = 'none'; // Hide video section

        // Reset timer and other exam-related data
        clearInterval(timer);
        timeRemaining = 3600;
        document.getElementById('timer').textContent = '60:00';

        // Reset URL to main page
        history.pushState(null, '', '/');
    }
});

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        alert('Warning: You switched tabs! Please stay on the current tab to avoid any penalties.');
    }
});

// Warn when the user selects text
document.addEventListener('selectstart', () => {
    alert('Warning: Text selection is not allowed during the exam!');
});

