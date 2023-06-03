<img align="left" width="auto" height="120" src="frontend/public/LogoCropped.png" />

# Find Dining

A web application that helps users find nearby restaurants. [Github](https://github.com/reeceawalsh/Find-Dining)

 </br>

## Specification

Create a web application that allows users to find nearby restaurants.

## Tech

We're using [Next.js](https://nextjs.org/) and [React.js](https://react.dev/) for the frontend and [Strapi](https://strapi.io/) for the backend. Testing was done with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for unit tests and [Cypress](https://www.cypress.io/) for end to end tests. The server is a locally setup [MYSQL server](https://www.mysql.com/). You can configure a database with Strapi [here](https://strapi.io/blog/configuring-strapi-mysql-database).

## APIs

- [Yelp](https://fusion.yelp.com/)
- [GoogleMaps](https://developers.google.com/maps)
- [PlacesAutoComplete](https://developers.google.com/maps/documentation/places/web-service/autocomplete)

## Installation

1. Clone the repository.

```
git clone https://github.com/reeceawalsh/Find-Dining
```

2. Install Node.js

```
brew install node
```

## Running The Code

Start the frontend

```
cd frontend
```

```
npm i
```

```
npm run dev
```

Start the backend

```
cd backend
```

```
npm i
```

```
npm run develop
```
## Setup a MySQL database
https://strapi.io/blog/configuring-strapi-mysql-database

### Frontend .env secrets

- STRAPI_URL (url of the strapi backend)
- YELP_CLIENT_ID (can be generated at [Yelp](https://fusion.yelp.com/))
- YELP_API_KEY (can be generated at [Yelp](https://fusion.yelp.com/))
- ADMIN_TOKEN (this is a strapi admin token which can be generated on the website in settings)
- NEXT_PUBLIC_GOOGLE_CLIENT_ID (can be generated at [Google](https://developers.google.com/maps))
- NEXT_PUBLIC_GOOGLE_CLIENT_SECRET (can be generated at [Google](https://developers.google.com/maps))
- NEXT_PUBLIC_GOOGLE_MAPS_API_KEY (can be generated at [Google](https://developers.google.com/maps))
- NEXT_PUBLIC_BASE_URL (your base url the frontend is running on)

### Backend .env secrets

- HOST (ip)
- PORT (port)
- APP_KEYS (any keys that fit)
- API_TOKEN_SALT (generate a salt)
- ADMIN_JWT_SECRET (generate a jwt secret)
- TRANSFER_TOKEN_SALT (generate a random salt)
- JWT_SECRET (jwt secret for database)
- SENDGRID_API_KEY (api key from [Sendgrid](https://sendgrid.com/solutions/email-api/))

## Styling

- If you are writing global css, put it in the globals.css file located in pages.
- Global CSS are styles that will be used everywhere, and are not specific to the page you are working on. An example of a global style is `.blue {
color: blue;
}` The class blue can now be used everywhere to make font blue.
- If you are writing specific css you need to use css modules. These are css files that are specific to the file you are working on. They end in module.css.
- If I'm working on the login page I would have a css file called login.module.css.I can import it to the login page by typing 'import styles from './styles/login.module.css' or whatever the path is. Then I can access the classnames as properties of the styles object e.g. {styles.SubmitButton} (ignore the slashes)

## Before Working Each Time

- Always use 'git pull' before working to get the latest version.
- Always use 'npm i' to install the latest dependencies.
- Always make a separate branch and create a pull request when working.

## Formatting Rules

- Components named with Capital Letters (PASCAL CASE) e.g. Component.jsx
- Variables are camelCase e.g. firstButton.
- Global classes are lower case with dashes e.g. upper-case.
- Pages should be named lowercase (for routing purposes).

## Folder Structure

- Public is for images and designs.
- Styles are for css files. (If you want to make a css file for each component that is okay.)
- Pages store pages, these will automatically be made into routes by Next.js.
- Components store components.
- Lib for helper functions.
- API for backend functions.
- **tests** for unit tests.

## Forms

- Forms are all custom with custom made form elements that are located in their own folders.
- Each form element uses field validation located in the field validation and validationRules folder.
- Errors are passed into the validationRules on submit of a form, and the resulting errors are passed back into the form elements as an errors object. The form element will then check if there are ny erorrs are display the appropriate messages as set out in the fieldValidation file.

## Context

- There is location, user and cookie context providers that encompass the application, these are visible in the \_\_app file.
- This ensures they stay up to date and provide correct information to all components.

## .env

- All secrets that need to be private are used in the /api folder. This is a serverless psuedo backend and ensures the secrets aren't available to be seen on the client side. Any env secret which starts with NEXT_PUBLIC will be accessible on deployment.
- The Google Maps API key cannot be private as the function to call it needs to be on the client side, however, this key can only be used on our domain. This is a setting I setup on the Google Maps account page.

## Team Members

### [Reece Walsh](https://github.com/reeceawalsh)

### [Shakti Raja Kumar](https://github.com/shaktiv8)

### [Tharan Patel](https://github.com/tharanpatel)

### [Felix Liu](https://github.com/FelixLiu666)

### [Panos Kaouris](https://github.com/AzuratC1)

### [Jacky Z](https://github.com/WZheng99)

### [Y Ren](https://github.com/220543691)

### [Lee](https://github.com/draymondlee1997)
