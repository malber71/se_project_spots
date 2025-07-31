# Spots

An image sharing site with a gallery

## Description

A project to demonstrate proficiency in HTML, CSS, javascript, and responsive design. The site allows users to interactively and dynamically add a custom profile picture, add a personal name and description, and add, like, and delete images from the site. Functionality has been added to store profile and card data on a remote server as well as manage the information there with POST, PATCH, PUT, and DELETE methods.

## Feature Highlights

- Profile editing functionality
- Add/delete cards
- Image preview modals
- Like functionality

## Suggestions for improvement

These are suggestions for the site that are outside of the project scope, but would increase functionality and interactivity.

- Allowing users to edit card information through an additional modal. This could be accomplished with PATCH.
- Currently the text limitation on the server for card caption descrtiptions is 30 characters. The site has CSS that handles text overflow. The server limit could be increased to allow users to add longer text descriptions. Alternatively there could be instruction on implementing custom validation for text greater than 30 characters. With the current design users hit a wall at 30 characters without getting an explanation for why they can't enter more text.

## Screen Shots

Spots at 1440px wide

<img src="./images/demo/spots-1440.png" alt="Spots at 1440px wide" width="500px" />

Spots at 320px wide

<img src="./images/demo/spots-320.png" alt="Spots at 1440px wide" width="350px" />

## Tech Stack

- HTML
- CSS
- Responsive design
- DOM manipulation
- Event handling
- Form validation
- API integration
- API calls to a remote server to store profile and card data

## Deployment

This page is deployed to GitHub Pages

- [Deployment link][project-page]

[project-page]: https://malber71.github.io/se_project_spots/

- [Video description of project][video-link]

[video-link]: https://drive.google.com/file/d/1foAmiQ-AZaCvWGxjkR5UdlLyrsrG4VRN/view?usp=sharing
