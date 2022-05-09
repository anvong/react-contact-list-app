# React-Contact-List-App

# Introduction

This is a contact list application with my quick assignment in class. The objective of the task is to create a contacts list with the mains functions in the highlighted.

## Highlights:

* Front-end - ReactJs to interact server
* Server - NodeJS provides some APIs as followed
* Database - MySQL (It requires xampp to host a local database)

## Environment prepartion
* I assmumpt that you have installed ReactJS, Node JS
* Download this repo
* Download XAMPP with latest version
* Start XAMPP and run phpmyadmin to create database 
* Refer to /server/db.config.js to have the database name, port, user (default is root without password). You can config your own database name and database user.

## Getting start 
* To start the server, use command line to navigate to server folder. Run `npm i` to install all dependecies (Only run in the first time, otherwise skip this step)
* Open 'server' folder in command line.
* Start the backend server by `node server.js`. Access the on browser with the link to see server is running with http://localhost:8080
* Check the APIs list on http://localhost:8080
* Check the Contact List getting from MySQL on http://localhost:8080/api/contacts
* To start the Front-end application, use command line to navigate to contact-ui folder. Run `npm i` to install all dependecies (Only run in the first time, otherwise skip this step)
* Run `npm start` to open application. By default, it will open a web browser with http://localhost:3000/

## Reference sample
*This project is rewrite base on my quick research on ReactJS, NodeJS working with MySQL Database.
https://github.com/nidhigaday/React-Contact-List-App
*Some predicated code are replaced by newer version.
