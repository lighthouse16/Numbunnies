import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const en = {
  "app": {
    "name": "Numbunnies"
  },
  "home": {
    "title": "Numbunnies",
    "flashcardsTitle": "Your Flash Cards",
    "completed": "Completed",
    "completeNow": "Complete Now",
    "grade": "Grade",
    "categories": {
      "all": "All",
      "new": "New",
      "incomplete": "Incomplete",
      "completed": "Completed"
    },
    "noCards": "No matching cards",
    "noData": "Data loading error or no data available"
  },
  "flashcard": {
    "title": "Flash Card",
    "front": "Front",
    "back": "Back",
    "card": "Card"
  },
  "quiz": {
    "title": "Choose the Correct Answer",
    "question": "Question",
    "result": "Your Result",
    "retakeQuestion": "Do you want to retake the quiz?",
    "retakeTitle": ""
  },
  "fillInTheBlank": {
    "title": "Fill in the Blank",
    "question": "Question",
    "answer": "Answer",
    "yourAnswer": "Your answer",
    "result": "Your Result",
    "retakeQuestion": "Do you want to retake the quiz?",
    "retakeTitle": ""
  },
  "setting": {
    "title": "Settings",
    "hello": "Hello",
    "appSettings": "App Settings",
    "alwaysDarkMode": "Always enable dark mode",
    "resetApp": "Reset App",
    "resetWarning": "This action cannot be undone. App data will be deleted. Are you sure you want to reset the app?",
    "resetTitle": "Reset App"
  },
  "onboarding": {
    "beforeStart": "Before we start,",
    "introduceYourself": "introduce yourself",
    "nameQuestion": "What is your name",
    "namePlaceholder": "Your name",
    "start": "Start",
    "continue": "Continue",
    "error": "An error occurred",
    "tryAgain": "Please try again"
  },
  "common": {
    "start": "Start",
    "next": "Next",
    "back": "Back",
    "submit": "Submit",
    "correct": "Correct",
    "incorrect": "Incorrect",
    "cancel": "Cancel",
    "yes": "Yes",
    "returnHome": "Return"
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en,
      },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
