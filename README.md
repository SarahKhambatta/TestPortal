# TestPortal
Portal for giving online tests
# Test Portal Website

## Overview
The Test Portal is a secure and user-friendly online examination system designed to ensure fair assessments. It includes features such as webcam monitoring, tab-switch prevention, and a timer to maintain the integrity of the test.

## Features
- **Login Page**: Users enter their name and password to access the test.
- **Test Interface**:
  - 50 questions displayed sequentially.
  - Navigation buttons for previous and next questions.
  - Submit button to finalize the test.
  - **30-minute countdown timer** with auto-submit feature.
- **Security Measures**:
  - Webcam monitoring is mandatory.
  - Tab-switching is restricted; multiple violations lead to auto-submission.
  - Copy-paste is disabled to prevent cheating.
- **User Experience**:
  - Clean UI with smooth transitions.
  - Responsive design for various devices.

## Technologies Used
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: PHP (if required for authentication and result storage)
- **Database**: MySQL (for storing user details and test responses)

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/test-portal.git
   ```
2. Navigate to the project folder:
   ```sh
   cd test-portal
   ```
3. Open `index.html` in a browser to test the frontend.
4. If using a backend:
   - Set up a local server (e.g., XAMPP, WAMP) and place the project in the server directory.
   - Create a MySQL database and import the required schema.

## Usage
1. Open the website and log in with valid credentials.
2. Start the test and answer the questions within 30 minutes.
3. Follow the security guidelines to avoid auto-submission.
4. Submit the test to complete the session.

## Future Enhancements
- Adding real-time analytics and result tracking.
- Implementing AI-based proctoring.
- Enhancing accessibility and mobile responsiveness.
