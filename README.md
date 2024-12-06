# Learning Platform for Zentrale Aufnahmeprüfung (ZAP) in the canton of Zurich

## Overview

This project is a **Learning Platform** designed to help users practice and enhance their knowledge in various subjects like **Mathematics** and **German**. The platform includes a **Dashboard** for tracking progress and earning badges, an **Exam System** to test knowledge, and interactive exercises to encourage learning.

---

## Features

### General Features:
- **User Registration**: Users can register to the platform and get a register link through the email service platform Brevo.
- **User Authentication**: Supports user login and registration using Supabase authentication.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Gamification**: Users earn badges for completing tasks and achieving specific milestones.

### Dashboard:
- Displays progress based on completed exercises.
- Shows badges earned for achievements.
- Offers a personalized greeting based on user profile information.

### Exercises:
- **Mathematics**: Solve math problems to improve numeracy skills.
- **German**: Practice language exercises such as comprehension and grammar.

### Exam System:
- Time-limited exams to test knowledge in a structured format.
- Ability to view past exam results or restart an exam.
- Dynamic calculation of grades and feedback.

---

## Badges

Users can earn the following badges:
1. **Leonhard Euler**: Earned by completing all math exercises correctly.
2. **Johann Goethe**: Earned by completing all German exercises correctly.
3. **Albert Einstein**: Earned by completing all exercises in the platform.
4. **Mathegenie**: Earned by solving six or more math exercises correctly.
5. **Grammatik-Guru**: Earned by solving six or more German exercises correctly.
6. **Synonymkenner**: Earned by answering all synonym-related questions correctly.
7. **Prüfungssicher**: Earned by achieving a grade of 4.0 or higher in the exam.
8. **Perfektionistisch**: Earned by completing the user profile.
9. **Sammler**: Earned by collecting five or more badges.

---

## Installation

To set up the project, follow these steps:

```bash
# Clone the repository
git clone https://github.com/your-repo/learning-platform.git

# Navigate to the project directory
cd learning-platform

# Install dependencies
npm install

# Create a .env file in the root directory and configure the following environment variables
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXTAUTH_SECRET=your_next_auth_key
NEXTAUTH_URL=your_next_auth_url
NEXT_PUBLIC_BREVO_API_KEY=your_next_public_brevo_api_key

# Start the development server
npm run dev

```

---

## Brevo configuration

Under Transactional, go to Email > Settings. Add an SMTP relay. Under API key, you can generate a new API key (example title: “Courses book emails”). Copy the code for the .env file.

---

## Database configuration

The project uses Supabase as the backend database. Below are the key tables:

**user_exercises**

*Column*        *Type*      *Description*
id	            uuid	    Unique identifier for each record.
user_id	        uuid	    References the user completing the exercise.
exercise_type	text	    Type of exercise (mathematik, deutsch, etc.).
question_id	    text	    ID of the question.
question	    text	    The question text.
user_answer	    text	    User's submitted answer.
is_correct	    boolean	    Indicates if the user's answer is correct.
created_at	    timestamp	Timestamp of when the answer was submitted.


**user_badges**

*Column*        *Type*      *Description*
id	            uuid	    Unique identifier for each badge.
user_id	        uuid	    References the user earning the badge.
badge_name	    text	    Name of the badge.
earned_at	    timestamp	Timestamp of when the badge was earned.


**profiles**

*Column*        *Type*      *Description*
id	            uuid	    Unique identifier for the user.
first_name	    text	    User's first name.
last_name	    text	    User's last name.
avatar_url	    text	    URL of the user's profile picture.
phone	        text	    User's phone number.

You can create the relevant tables by entering a query:

CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  first_name text,
  last_name text,
  phone text,
  avatar_url text
);

CREATE TABLE public.user_exercises (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    exercise_type VARCHAR(255),
    question_id INT,
    question TEXT,
    user_answer TEXT,
    is_correct BOOLEAN,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE public.user_badges (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    badge_name TEXT NOT NULL,
    earned_at TIMESTAMP DEFAULT NOW()
);

---

**Usage**

### Starting Exercises
1. Navigate to the "Übungen" section.
2. Choose between Mathematics or German exercises.
3. Start solving tasks and track your progress on the dashboard.

### Taking the Exam
1. Go to the "Prüfung" section.
2. Start the exam with a one-hour timer.
3. Submit answers and receive a grade along with feedback.

### Viewing Progress
1. Go to the "Dashboard" section.
2. Check your earned badges and progress percentage.

---

**Technologies Used**

Next.js: React framework for building the UI.
Supabase: Backend as a service for database and authentication.
Tailwind CSS: For styling and responsive design.
Tippy.js: For tooltips and interactive badge descriptions.
React Circular Progressbar: For the progress display.

---

**Future Enhancements**
1. Advanced Gamification: Add leaderboards and more badges.
2. Dynamic Exercises: Generate tasks based on user performance.
3. Improved Exam System: Allow exam resumption and analytics.
4. Localization: Add support for multiple languages.
5. OAuth: Integration of OAuth-Login possiblities like Google or Github
6. Validation: A system that validates answers differently such as converts answers from 4 meters to numeric value 4, case sensitivity, or a tool like leveraging fuzzy.

---

**Contributing**
1. Fork the repository.
2. Create a new branch for your feature or bug fix:

```bash
git checkout -b feature/your-feature-name
```

3. Commit your changes:

```bash
git commit -m "Add your message here"
```

4. Push to the branch:

```bash
git push origin feature/your-feature-name
```

5. Open a Pull Request on GitHub.

---

**Contact**
For any questions or feedback, please contact [fabio.burri@hotmail.com].