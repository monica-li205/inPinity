
=========
# InPINity

A Pinterest clone tailored for researchers.

Users can:
- login, register and logout
- make a new post using an URL and upload an image for a thumbnail
- collect your favourite posts by clicking the star on a star (faving)
- sort your favourite posts by category
- comment on a post
- rate a post from 0 to 5 stars
- sort and filter posts by category
- search for posts by typing keywords in the search bar

## Project Setup
1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`

## Screenshots
![Homepage](https://github.com/monica-li205/inPinity/blob/master/public/images/screenshoots/inpinity-home.png?raw=true)
![Homepage-Loggedin]()
![User's Boards]()
![Login Screen]()
![Create a Post]()

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- body-parser 1.19.0
- chalk 2.4.2
- cookie-session 1.4.0
- dotenv 2.0.0
- ejs 2.6.2
- ejs-lint 1.1.0
- express 4.17.1
- jquery-validation 1.19.2
- morgan 1.9.1
- node-sass-middleware 0.11.0
