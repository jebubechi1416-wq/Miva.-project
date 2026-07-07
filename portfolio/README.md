# Student Portfolio & Academic Management Website

Ekeh Joshua Ebubechi — Cybersecurity Student, MIVA Open University

## About
A responsive, multi-page personal portfolio built with HTML, CSS, and vanilla JavaScript, submitted for the "Design and Develop a Responsive Student Portfolio and Academic Management Website" assignment.

## Pages
- `index.html` — Homepage: name, photo, welcome message, nav, bio
- `about.html` — Education, aspirations, skills, hobbies
- `projects.html` — Four cybersecurity lab projects + embedded reference video
- `planner.html` — Interactive academic task planner (add / complete / delete)
- `contact.html` — Contact form with JavaScript validation

## Structure
```
/
├── index.html
├── about.html
├── projects.html
├── planner.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   ├── planner.js
│   └── contact.js
└── images/
    ├── avatar.svg
    ├── project-nmap.svg
    ├── project-clamav.svg
    ├── project-gpg.svg
    └── project-osint.svg
```

## How to run locally
Open `index.html` in any browser — no build step required.

## How to deploy (GitHub Pages)
1. Push this folder to a GitHub repository.
2. Go to **Settings → Pages**.
3. Under "Build and deployment", set Source to **Deploy from a branch**, branch `main`, folder `/ (root)`.
4. Save — your site will be live at `https://<username>.github.io/<repo-name>/`.

## Notes for submission
- Replace `images/avatar.svg` with a real photo (`.jpg`/`.png`) if required — just update the `src` in `index.html`.
- Update the LinkedIn/GitHub placeholder links in `contact.html`.
- The GitHub repository link and the hosted site link should both be submitted per the assignment brief.

## Technologies demonstrated
- Semantic HTML5 (header, nav, main, section, article, footer, table, form)
- External CSS with Flexbox, Grid, custom properties, transitions, and responsive breakpoints
- Vanilla JavaScript: DOM manipulation, event handling, arrays/functions, form validation, dynamic content
