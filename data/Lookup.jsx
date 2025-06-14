import dedent from "dedent";

export default {
  SUGGSTIONS: ['Create ToDo App in React', 'Create Budget Track App', 'Create Gym Managment Portal Dashboard', 'Create Quizz App On History', 'Create Login Signup Screen'],
  HERO_HEADING: 'What do you want to build?',
  HERO_DESC: 'Prompt, run, edit, and deploy full-stack web apps.',
  INPUT_PLACEHOLDER: 'What you want to build?',
  SIGNIN_HEADING: 'Continue With Sage Ai',
  SIGNIN_SUBHEADING: 'To use Sage Ai you must log into an existing account or create one.',
  SIGNIn_AGREEMENT_TEXT: 'By using Bolt, you agree to the collection of usage data for analytics.',

  DEFAULT_FILE: {
    "/App.js": {
      code: `import React from "react";
import "./App.css"; // Important: import the Tailwind directives

export default function App() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <h1 className="text-3xl font-bold text-blue-600">
        Hello from App.js with Tailwind!
      </h1>
    </div>
  );
}
`
    },

    '/public/index.html': {
      code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`
    },
    '/App.css': {
      code: `
@tailwind base;
@tailwind components;
@tailwind utilities;`
    },
    '/index.css': {
      code: `
@import "tailwindcss";`
    },
    '/tailwind.config.js': {
      code: `
            /** @type {import('tailwindcss').Config} */
module.exports = {
content: [
  "./public/index.html",
  "./**/*.{js,jsx,ts,tsx}",
],
  theme: {
    extend: {},
  },
  plugins: [],
}`
    },
    '/postcss.config.js': {
      code: `/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
`
    }
  },
  DEPENDANCY: {
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "autoprefixer": "^10.0.0",
    "uuid4": "^2.0.3",
    "tailwind-merge": "^2.4.0",
    "tailwindcss-animate": "^1.0.7",
    "lucide-react": "^0.477.0", // Fixed duplicate, kept latest version
    "react-router-dom": "^7.1.1",
    "firebase": "^11.1.0",
    "@google/generative-ai": "^0.21.0",
    "date-fns": "^4.1.0",
    "react-chartjs-2": "^5.3.0",
    "chart.js": "^4.4.7",
  },

  // Generate package.json content with our dependencies
  getPackageJson() {
    return {
      "name": "my-bolt-app",
      "version": "1.0.0",
      "description": "App built with Bolt.New 2.0",
      "dependencies": {
        "react": "^19.0.0",
        "react-dom": "^19.0.0",
        "react-scripts": "^5.0.0",
        "lucide-react": "^0.477.0",
        ...this.DEPENDANCY
      },
      "main": "/index.js",
      "devDependencies": {},
      "scripts": {
        "start": "react-scripts start",
        "build": "react-scripts build",
        "test": "react-scripts test",
        "eject": "react-scripts eject"
      },
      "eslintConfig": {
        "extends": [
          "react-app"
        ]
      },
      "browserslist": {
        "production": [
          ">0.2%",
          "not dead",
          "not op_mini all"
        ],
        "development": [
          "last 1 chrome version",
          "last 1 firefox version",
          "last 1 safari version"
        ]
      }
    };
  },

  PRICING_DESC: 'Start with a free account to speed up your workflow on public projects or boost your entire team with instantly-opening production environments.',
  PRICING_OPTIONS: [
    {
      name: 'Basic',
      tokens: '50K',
      value: 50000,
      desc: 'Ideal for hobbyists and casual users for light, exploratory use.',
      price: 4.99
    },
    {
      name: 'Starter',
      tokens: '120K',
      value: 120000,
      desc: 'Designed for professionals who need to use Bolt a few times per week.',
      price: 9.99
    },
    {
      name: 'Pro',
      tokens: '2.5M',
      value: 2500000,
      desc: 'Designed for professionals who need to use Bolt a few times per week.',
      price: 19.99
    },
    {
      name: 'Unlimted (License)',
      tokens: 'Unmited',
      value: 999999999,
      desc: 'Designed for professionals who need to use Bolt a few times per week.',
      price: 49.99
    }
  ]
}