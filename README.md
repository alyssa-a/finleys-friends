# Finley's Friends (Fetch Frontend Take Home)

## Live Demo
Check out the live demo: <https://finleys-friends.vercel.app/>

\*__Note:__ When you refresh a page on a route that is not the homepage, Vercel may throw a 404 error. The `vercel.json` file fixes this issue.

## Tech
- React
- Vite
- Tailwind CSS
- Material UI
- Vitest
- Vercel

## Setup
1. Clone this repo
2. Run `npm install`
3. Run `npm run dev`

## Callouts
- __Responsive UI__ - I designed the site with mobile users in mind. At smaller screen sizes, elements will stack and/or resize to provide an optimized user experience.

- __Accessibility__ - Accessibility is always part of my workflow. I made sure color contrast between text and background met WCAG AA requirements. I also included support for screen reader users, providing additional context for graphic elements such as the button that marks a dog as favorited. I tested keyboard navigation and added focus states where neccessary as well as aria markup for the menu toggle button.

- __Added additional sorting capabilities__ - The default sort is by breeds (asceding), but users also have the option to sort by breed (descending), youngest, oldest, name (ascending), and name (descending).

- __Incorporated locations data__ - When displaying the data for each dog, I display the city and state of the corresponding zipcode if that zipcode exists in the database. This is a more user friendly way of displaying the location for each dog.

- __Error handling__ - I tried to account for error paths to allow for graceful error handling where the user experience would be affected most. For example, if the search query failed to execute or the dog data failed to load, I display an error message letting the user know. I also utilized conditional rendering in components that rely on data from the API, so they will display different content depending on if the data is loading, no results were found, or results were returned to the component.

- __Unit testing__ - I would have liked to have more code coverage, but given the urgency and nature of this assignment, I included tests for the most important UI elements and functionality.
