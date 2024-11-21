# Todo Application

A scalable and responsive Todo application built using **React.js**, **Redux**, and **Redux Persist**, featuring an intuitive dialog-based input system, modal editing, and smart filtering capabilities.

## Features

- **Smart Input Dialog**: Add new todos through a clean, modal dialog interface
- **Sheet Modal Editing**: Edit todo details seamlessly using a bottom sheet modal
- **Intelligent Filtering**: Sort todos into meaningful categories:
  - Overdue tasks
  - Due today
  - Upcoming tasks
  - Tasks without due dates
  - Completed tasks
- **Todo Management**:
  - Create todos with title, body, and optonal due date
  - Edit todo details through an intuitive sheet interface
  - Delete todos with confirmation
  - Mark todos as complete/incomplete
- **State Persistence**: Automatic saving and restoration using **Redux Persist** and browser `localStorage`
- **Responsive Design**: Clean and responsive user interface built with TailwindCSS

---

## Technologies Used

- **React.js**: For building the user interface
- **Redux**: For managing global application state
- **Redux Persist**: To save the Redux state in `localStorage`
- **React Hooks**: For state and lifecycle management
- **shadcn/ui**: For pre-built components (Dialog, Sheet, Tabs)
- **TailwindCSS**: For styling and responsive design
- **@reduxjs/toolkit**: For simplified Redux configuration
- **date-fns**: For date manipulation and formatting

---

## Installation and Setup

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

   The application will be available at [http://localhost:3000](http://localhost:3000)

4. **Build for Production**

   ```bash
   npm run build
   # OR
   yarn build
   ```

---

## Folder Structure

```bash
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

1. **Todo Input Dialog**
   - Clean modal interface for adding new todos
   - Fields for title, body, and due date
   - Validation and error handling

2. **Sheet Modal for Editing**
   - Bottom sheet interface for editing todos
   - Seamless updating of todo details
   - Mobile-friendly design

3. **Smart Filtering Tabs**
   - **Overdue**: Tasks past their due date
   - **Due Today**: Tasks due within the current day
   - **Upcoming**: Future tasks
   - **No Due Date**: Tasks without specified deadlines
   - **Completed**: Finished tasks

4. **Todo Management**
   - Inline status toggling
   - Delete confirmation
   - Rich todo details including title, body, and due date

5. **Persistent State**
   - Todos persist across page reloads
   - Redux Persist ensures state is saved
   - Browser `localStorage` used for persistence

---

## Known Issues

- Sheet modal might have scrolling issues on some mobile browsers
- Date picker compatibility varies across browsers
- Filter tabs might overflow on very small screens

---

## Future Enhancements

- Add support for recurring todos
- Implement user authentication
- Add priority levels
- Enable todo categorization/tagging
- Add sorting options within filters
- Implement drag-and-drop reordering
- Add support for attachments

---

## Deployment Links

- **GitHub Repository**: [Github](https://github.com/sterotech/todo-application)
- **Hosted Application**: [Vercel](https://todo-application-5fnqwtii7-sterotechs-projects.vercel.app/)

---

## Author

**Samuel Agyei**

- [GitHub Profile](https://github.com/sterotech)

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
