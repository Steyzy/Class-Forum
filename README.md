## Communication

*大家记得把firebase.js的config里的variables都存到自己本地的environmental variable
里这样我之后就吧这些从script里移出去换成process.env.VAR_NAME。把密码hardcode到
script里不太安全。  
     - Ray

## Technologies Used

- JavaScript
- [React](https://reactjs.org)
- [Firebase Realtime Database](https://firebase.google.com/docs/database)


## Installations

#### Getting started

- You need to have Node and NPM installed on your computer.
- Installing Node automatically comes with npm.

#### Clone

- Clone this project to your local machine `https://github.com/rayguo233/forum.git`

#### Setup

- Installing the project dependencies
  > run the command below
  ```shell
  $ npm install
  ```
- Setup Firebase  
  <sub>
    Not 100% sure if the app will work after these commands. 
    Contact me if it doesn't
  </sub>
  > run the command below
  ```shell
  $ npm install -g firebase-tools
  $ firebase login
  # And then log in from the browser
  $ firebase init
  $ firebase deploy
  ```
- Start the project
  > run the command below
  ```shell
  $ npm start
  ```
- Visit `http://localhost:3000` 
