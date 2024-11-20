# Todo Application

A scalable and responsive Todo application built using **React.js**, **Redux**, and **Redux Persist**, demonstrating proficiency in state management, UI development, and data persistence.

## Features

- **Add Todos**: Create new Todo items with a title and an "incomplete" status.
- **Edit Todos**: Edit Todo titles inline with seamless state updates.
- **Delete Todos**: Remove items from the Todo list.
- **Toggle Completion**: Mark Todos as complete or incomplete using checkboxes.
- **State Persistence**: Automatically saves and restores the Todo list across page reloads using **Redux Persist** and browser `localStorage`.
- **Responsive Design**: Clean and responsive user interface built with [CSS Framework/TailwindCSS/Bootstrap].

---

## Technologies Used

- **React.js**: For building the user interface.
- **Redux**: For managing global application state.
- **Redux Persist**: To save the Redux state in `localStorage` and rehydrate it on reload.
- **React Hooks**: For state and lifecycle management.
- **CSS Framework**: TailwindCSS for styling.
- **@reduxjs/toolkit**: For simplified Redux configuration and better developer experience.

---

## Installation and Setup

Follow these steps to set up the project locally:

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v16+ recommended)
- **npm** or **yarn**

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/sterotech/todo-application.git
   cd todo-application
   ```

2. **Install Dependencies**

   ```bash
   npm install
   # OR
   yarn install
   ```

3. **Run the Application**

   ```bash
   npm start
   # OR
   yarn start
   ```

   The application will be available at [http://localhost:3000](http://localhost:3000).

4. **Build for Production**
   To create a production-ready build:

   ```bash
   npm run build
   # OR
   yarn build
   ```

5. **Run Tests (Optional)**
   If tests are implemented:

   ```bash
   npm test
   # OR
   yarn test
   ```

---

## Hosting the Application

To meet the submission requirement of hosting the application, follow these steps:

1. **Deploy to Vercel**
   - Install the Vercel CLI:

     ```bash
     npm install -g vercel
     ```

   - Deploy the app:

     ```bash
     vercel
     ```

   - Follow the prompts to upload your project.

2. **Alternative: Deploy to Netlify**
   - Login to [Netlify](https://www.netlify.com/) and create a new project.
   - Connect your GitHub repository.
   - Specify the build command: `npm run build` and publish directory: `build`.

---

## Folder Structure

``` bash
todo-application/
├── public/
├── src/
│   ├── components/
│   ├── store/
│   ├── lib/
│   ├── App.tsx
│   ├── main.tsx
│   └── style.css
├── package.json
├── README.md
└── .gitignore
```

---

## Application Features (Details)

1. **Input Field for Adding Todos**
   - Enter the Todo title and click the "Add" button to include it in the list.

2. **Edit and Delete**
   - Inline editing for titles.
   - A "Delete" button for removing specific Todos.

3. **Toggle Completion**
   - Mark Todos as completed with a checkbox.
   - Strikethrough style for completed Todos.

4. **Persistent State**
   - Todos persist across page reloads using Redux Persist.

---

## Known Issues

- [Add any known issues or edge cases you've handled.]

---

## Future Enhancements

- Add support for due dates.
- Implement user authentication for syncing Todos across devices.
- Allow filtering Todos (e.g., completed, pending).

---

## Deployment Links

- **GitHub Repository**: [https://github.com/sterotech/todo-application](https://github.com/sterotech/todo-application)
- **Hosted Application**: [https://<your-hosted-app-url>](https://<your-hosted-app-url>)

---

## Author

**Samuel Agyei**

- [GitHub Profile](https://github.com/<your-github-username>)
- [LinkedIn Profile](https://linkedin.com/in/<your-linkedin-username>)

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
