## Communication

很多地方是从网上借鉴的，我也不太懂。大家觉得有问题的话请随意改。还有，大家记得把firebase.js的
config里的variables都存到自己本地的environmental variable里这样我之后就吧这些从script里
移出去换成process.env.VAR_NAME。把密码hardcode到script里不太安全。  
     - Ray

## Technologies Used

- JavaScript
- [React](https://reactjs.org)
- [Firebase](https://firebase.google.com/)


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