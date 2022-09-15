
# Lapscart || MERN Ecommerce

An Ecommerce website using Node.js, React.js, Express.js, MongoDB


## Table of content

 - [Tech Stack](#TechStack)
 - [Features](#Features)
 - [Environment Variables](#EnvironmentVariables)
 - [Run Locally](#RunLocally)
 - [Author](#Author)
 - [License](#License)



## Screenshot

![App Screenshot](https://user-images.githubusercontent.com/102411922/190291463-4d755676-b7a3-4f25-bba5-aa3adf459e3f.png)

The website resembles a real store and you can add products to your cart and wishlist and pay for them.

## TechStack

**Client:** React, Redux, Redux-Thunk, TailwindCSS

**Server:** Node, Express

**Database:** mongoDB

**Services:** Nodemailer, Twilio

JWT, Google auth



## Features
**Users can do following:**

- Create an account, login or logout.
- Login and Signup with Google auth.
- View user profile.
- edit user profile.
- Change password.
- Add multiple addressess.
- Edit, Delete addressess.
- Browse available products.
- Add products to the shopping cart and wishlist.
- View products in the shopping cart and wishlist.
- Delete products from the shopping cart and wishlist.




**Admin can do following:**

- Login or logout to the admin panel
- Add, Edit, Delete products.
- Add, Edit, Delete product category
- Manage all Users




## EnvironmentVariables

To run this project, you will need to add the following environment variables to your .env file

**Server:**

`TWILIO_SERVICE_SID`
`TWILIO_ACCOUNT_SID`
`TWILIO_AUTH_TOKEN`

`JWT_SECRET`
`JWT_EXPIRE_TIME`
`SMTP_EMAIL`

`SMTP_PASSWORD`
`SMTP_FROM_NAME`
`SMTP_HOST`

`SMTP_SERVICE`
`SMTP_PORT`
`SMTP_SECURE`

`BASE_URL`
`GOOGLE_CLIENT_ID`

**Client :**

`REACT_APP_GOOGLE_CLIENT_ID`

## RunLocally

Clone the project

```bash
  git clone https://github.com/sreeshilck/Lapscart.git
```

Go to the project client directory

```bash
  cd my-Lapscart/client
```

Install dependencies

```bash
  npm install
```

Start the client

```bash
  npm run start
```


Go to the project server directory

```bash
  cd my-Lapscart/server
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

## Author

- [@sreeshilck](https://github.com/sreeshilck)


## License

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

