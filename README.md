# React-Contact-List-App

# Introduction

This is a contact list application with my quick assignment in class. The objective of the task is to create a contacts list with the main functions in the highlighted.

## Highlights:

* Front-end - ReactJs to interact with server
* Server - NodeJS provides some APIs as followed
* Database - MySQL (It requires xampp to host a local database)

## Environment prepartion
* I assume that you have installed ReactJS, Node JS
* Download this repo
* Download XAMPP with the latest version
* Start XAMPP and run PHPMyAdmin to create a database
* Refer to /server/db.config.js to have the database name, port, and user (default is root without password). You can config your own database name and database user.

## Getting start 
* To start the server, use the command line to navigate to the server folder. Run npm i to install all dependencies (Only run in the first time, otherwise, skip this step)
* Open the 'server' folder in the command line.
* Start the backend server by node server.js. Access the on a browser with the link to see the server is running with http://localhost:8080
* Check the APIs list on http://localhost:8080
* Check the Contact List getting from MySQL on http://localhost:8080/api/contacts
* To start the Front-end application, use the command line to navigate to the contact-ui folder. Run npm i to install all dependencies (Only run in the first time, otherwise, skip this step)
* Run npm start to open the application. By default, it will open a web browser with http://localhost:3000/


## Reference sample
* This project is rewrite base on my quick research on ReactJS, NodeJS working with MySQL Database. https://github.com/nidhigaday/React-Contact-List-App
* Some predicated code are replaced by newer versions.

