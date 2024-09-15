# 📝 Proctored Examination Platform

Welcome to the **Proctored Examination Platform**—a secure and efficient solution for conducting online exams with real-time monitoring and automated integrity checks.

## 🚀 Features

- **User Registration:** Seamless sign-up process with secure authentication.
  
- **Categorized Questions:** Exams divided into three key sections:
  - Aptitude
  - Technical
  - Coding

- **Countdown Timer:** A one-hour countdown timer that starts when the exam begins, ensuring candidates manage their time effectively.

- **Live Video Proctoring:** Automatic camera and microphone access to monitor candidates in real-time.

- **Automated Alerts:**
  - **Tab Switching:** Alerts if the candidate switches browser tabs.
  - **Text Selection:** Warns the candidate if text is selected during the exam.

- **Progress Tracking:** Tracks completed sections and disables further access to them upon submission.

- **Exam Completion:** Redirects to a thank-you page once all sections are completed, ensuring the entire process is smooth and reliable.

## 📂 Structure

- **`index.html`:** Main interface for the exam.
- **`script.js`:** Handles the core logic, including the timer, question loading, video access, and user interactions.
- **`style.css`:** Styles the platform to ensure a user-friendly and accessible design.

## 🛠️ Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/proctored-examination-platform.git
    cd proctored-examination-platform
    ```

2. Open the `index.html` file in your browser.

3. Ensure your server is set up to handle POST requests for user registration.

## 🤖 Usage

1. **Sign Up:** Users must sign up to start the exam.
2. **Select Category:** Choose from Aptitude, Technical, or Coding sections.
3. **Complete Questions:** Answer questions in the selected category.
4. **Submit:** After submitting, the section will be marked as completed, and the user cannot return to it.
5. **Complete Exam:** Once all sections are completed, the user is redirected to a thank-you page.

## ⚠️ Important Notes

- Ensure the webcam and microphone are accessible before starting the exam.
- Stay on the exam tab to avoid triggering penalties.
- Text selection during the exam is prohibited.

## 📄 License

This project is licensed under the MIT License—see the [LICENSE](LICENSE) file for details.

https://github.com/user-attachments/assets/8c4ea325-b113-4f06-a36b-9a08b80ae030
