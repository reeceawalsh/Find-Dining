# Find-Dining

## Specification

Create a web application that allows users to find nearby restaurants.

## Tech

We're using Next.js and React.js for the frontend and Strapi for the backend.

## Setting Up Repo

Clone the repo onto your local machine.
Install Node.js from the internet.
Open the repo in Visual Studio Code.
Download ES7 React and Auto-Save from extensions on the left.
In the terminal, navigate to the frontend folder.
Type 'npm i' to install all of the dependencies.
Every design has a corresponding page, these are all on FlyingDonut.
Look at the designs and pick one you would like to do.
Go to FlyingDonut and assign a task to yourself.

Type 'git branch <name>' to make a new branch where <name> is the name of the feature you are working on.
E.g. git branch login-page.
Type 'git checkout <name>' to go to the branch.
e.g. git checkout login-page.

Type 'npm run dev' to start the website.
It will show you the url in the terminal.
Open the url and you can see the website.
The file structure of the code is the same as the structure of the url.
The pages folder is the main website i.e. localhost:3000.
There is a file called login in this folder, if I want to access it I can just type /login after the url. -> localhost:3000/login.
There is also a folder called profile in the pages folder.
If I want to go to profile I just put /profile after the url.
In profile there is a page called history, as I'm in profile my url is already localhost:3000/profile, to go to history I need to add it. localhost:3000/profile/history.
Do not change file structure, as you can see it is very important.

If you are writing global css, put it in the globals.css file located in pages.
Global CSS are styles that will be used everywhere, and are not specific to the page you are working on. An example of a global style is .blue {
color: blue;
}
The class blue can now be used everywhere to make font blue.
If you are writing specific css you need to use css modules.
These are css files that are specific to the file you are working on.
They end in module.css.
If I'm working on the login page I would have a css file called login.module.css.
I can import it to the login page by typing 'import styles from './styles/login.module.css' or whatever the path is.
Then I can access the classnames as properties of the styles object e.g. {styles.SubmitButton} (ignore the slashes)

## Before Working Each Time

Always use 'git pull' before working to get the latest version.
Always use 'npm i' to install the latest dependencies.
Always make a separate branch and create a pull request when working.

## Formatting Rules

Type in terminal "npm i -g prettier" without the double quotes (will install an auto formatter that will format on save).
Functions not classes.
Components named with Capital Letters (PASCAL CASE) e.g. Component.jsx
Variables are camelCase e.g. firstButton.
Global classes are lower case with dashes e.g. upper-case.
Pages should be named lowercase (for routing purposes).
Components uppercase.

## Folder Structure

Public for images and designs.
Styles are for css files. (If you want to make a css file for each component that is okay.)
Pages store pages.
Components store components.

## Backend

Grab the .env details from discord until I make the GitHub secrets.
