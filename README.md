# Weekly Timetable Viewer — Student Dashboard 🎓📅

A modern, highly interactive, and modular weekly timetable web application. Built primarily for students to view, filter, and manage their daily classes with a beautiful, fully responsive UI. This project uses vanilla HTML, CSS, and JavaScript, making it lightweight and easy to maintain while offering advanced features like dynamic color-coding, local storage themes, and export functionality.

## ✨ Features

- **Dynamic Timetable Grid**: View all your classes for the week efficiently. Empty slots are cleanly maintained, and active slots are clearly visible.
- **Add / Edit Classes**: Easily add new classes or edit existing ones using a sleek modal interface. Provide details like Subject, Teacher, Day, Time Slot, and Room.
- **Smart Filtering**: Filter the timetable grid by specific days or specific subjects.
- **Search Functionality 🔍**: Press `Cmd + K` (or `Ctrl + K`) to immediately focus the search bar. Search by subject, teacher, or room.
- **Dark / Light Theme 🌗**: A complete theme system that toggles instantly and remembers your preference using `localStorage`. 
- **Export System**: Export your current timetable view as a **PNG** image or a **PDF** document with a single click, perfect for printing or sharing.
- **Live Clock & Real-time Tracking**: Displays the current date and precise live time. It proactively tells you which class you should be in "Right now" via a smart banner.
- **Auto-assigned Pastel Colors**: New subjects get automatically assigned a custom pastel background and border color for easier visual distinction (Subject Legend included!).
- **Keyboard Navigation**: Press `Esc` to safely close modals or export menus instantly.
- **Beautiful UI / UX**: Employs Google's *Inter* font, smooth fade-in animations, responsive hover states, and gorgeous *Phosphor Icons* setup.

## 🛠 Features Details & Tools Under the Hood

### Technologies Used
- HTML5
- CSS3 (Vanilla CSS, custom properties & variables for easy restyling, flexbox/grid)
- JavaScript (ES6+ Vanilla JS, standard DOM manipulation)

### External Libraries 
- **Phosphor Icons**: For beautiful lightweight icons.
- **html2canvas**: Powers the functionality behind the 'Export to PNG/PDF'.
- **jsPDF**: Works in tandem with html2canvas to save the generated image as a neatly formatted landscape PDF.
- **Google Fonts**: Uses the 'Inter' modern typography.

## 🚀 How to Run the Project

Since this project has zero complex dependencies and uses pure vanilla web technologies, setting it up is incredibly quick.

1. **Clone or Download** this repository to your local machine.
2. Open the `/Users/aadi/Documents/web-project` folder.
3. Open the `index.html` file using your favorite modern web browser (Google Chrome, Firefox, Safari, Edge).
   - *Tip: If you're using VS Code, use the "Live Server" extension for the best development experience with hot-reloading.*

## 📁 Project Structure

```text
web-project/
│
├── index.html       # The main markup file, structuring the layout, navigation, modals, and tables.
├── styles.css       # Complete aesthetic definitions, CSS variables, dark-mode logic, and responsive breakpoints.
├── script.js        # The brains of the app: handles state, data schemas, DOM updates, real-time clock, theme switcher, and exports.
└── README.md        # You are reading this!
```

## 📝 Customizing the Data

The initial timetable schedule is hardcoded for demonstration purposes. If you are a developer looking to integrate a custom dataset:
1. Open up `script.js`.
2. Locate the `timetableData` object near the top.
3. Modify the day properties (`Monday`, `Tuesday`, etc.) based on your real schedule. Each entry corresponds sequentially to the `TIME_SLOTS` array natively defined. Set an entry to `null` if you have a free period.

## 💡 Future Enhancements
(Potential ideas for scaling this project up)
- Connect a backend database (like MongoDB or PostgreSQL) to save schedules dynamically per user instead of hardcoded objects.
- Cloud Authentication (OAuth via Google or GitHub).
- Adding custom time-slots based on individual user input.

---
**Made with ❤️ for students who want to stay organized.**
