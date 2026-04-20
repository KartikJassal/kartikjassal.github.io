# Kartik Jassal — Space Engineering Portfolio

A personal portfolio website built with vanilla HTML, CSS, and JavaScript, and deployed with GitHub Pages. The site presents my work in space robotics, systems engineering, technical communication, and undergraduate research through a structured, aerospace-inspired interface.

## Live Site

**Website:** https://jazzhatcoder.github.io/

## Overview

This portfolio was designed to do more than act as a simple online resume. It brings together:

- a landing page that introduces my background and engineering interests
- featured experience in research, mentorship, and robotics
- education and scholarship highlights
- curated showcase pieces from ENG2003
- a research communication artifact from ASTRO Lab
- a reflection page connecting communication growth with engineering practice

The visual language of the site is inspired by spacecraft telemetry, orbital overlays, and mission-interface aesthetics.

## Features

- **Single-page portfolio homepage** with dedicated sections for About, Experience, Education, Achievements, Showcase, Reflection, and Connect
- **Dedicated detail pages** inside `pages/` for showcase pieces, research experience, education, and reflection content
- **Custom animated background** featuring a JavaScript-rendered starfield and orbital arc overlays
- **Responsive navigation** with desktop navigation, mobile menu toggle, smooth anchor scrolling, and active-section highlighting
- **Scroll-based interactions** including reveal animations and dynamic header behavior
- **Portfolio-specific media assets** including a profile image, showcase thumbnails, and favicon package
- **GitHub Pages friendly routing logic** that helps directory URLs resolve correctly
- **Keyboard accessibility support** for interactive card-style elements

## Tech Stack

- **HTML5**
- **CSS3**
- **Vanilla JavaScript**
- **GitHub Pages** for hosting

No framework, bundler, or build pipeline is required.

## Project Structure

```text
.
├── index.html
├── css/
│   └── main.css
├── js/
│   └── main.js
├── assets/
│   ├── favicon/
│   └── images/
│       ├── profile.jpg
│       ├── showcase-1-thumb.jpg
│       ├── showcase-2-thumb.jpg
│       ├── showcase-3-thumb.jpg
│       └── showcase-4-thumb.jpg
└── pages/
    ├── _detail-template.html
    ├── achievement-1.html
    ├── achievement-2.html
    ├── achievement-3.html
    ├── achievement-4.html
    ├── edu-courses.html
    ├── edu-degree.html
    ├── exp-club.html
    ├── exp-mentorship.html
    ├── exp-research.html
    ├── reflection.html
    ├── showcase-1.html
    ├── showcase-2.html
    ├── showcase-3.html
    ├── showcase-4.html
    ├── showcase-5.html
    └── showcase-6.html
```

## Showcase Content

The site currently highlights four main showcase artifacts:

1. **Cover Letter** — an ENG2003 employer-facing application piece  
2. **Group Presentation** — an ENG2003 presentation on hybrid energy storage systems  
3. **Technical Report** — an ENG2003 systems-level report  
4. **Research Poster** — an ASTRO Lab communication artifact on experimental light-curve analysis  

These pieces are tied together by a reflection page focused on communication growth, audience awareness, and engineering clarity.

## Local Development

To run the site locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/jazzhatcoder/jazzhatcoder.github.io.git
   ```
2. Open the project folder.
3. Launch `index.html` in your browser.

For the best experience, use a lightweight local server such as VS Code Live Server.

## Deployment

This site is configured for **GitHub Pages** deployment from the repository root.

If you are using this project as a template for your own portfolio:

1. Create a repository named `yourusername.github.io`
2. Copy the project files into the repository root
3. Push to the `main` branch
4. Enable GitHub Pages if needed

Your site will be available at:

```text
https://yourusername.github.io/
```

## Customization

You can adapt this portfolio by editing:

- `index.html` for homepage content and section structure
- files in `pages/` for detailed writeups and showcase pages
- `css/main.css` for colors, spacing, typography, and layout styling
- `js/main.js` for animation, navigation, and interaction behavior
- `assets/images/` for the portrait and showcase thumbnails

## Why This Portfolio Exists

This project was built to present engineering work as both technical and communicative practice. It reflects how I approach problems across research, design, and documentation, especially in space systems and robotics contexts.

## Author

**Kartik Jassal**  
Space Engineering Student, York University  
Focused on space robotics, systems engineering, and technical communication

## License

This project is presented as a personal portfolio. Please do not reuse written content, imagery, or branding without permission.
