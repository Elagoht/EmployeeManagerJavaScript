# Employee Management Project With JavaScript

![Java Scipt](https://shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&color=black)
![NPM](https://shields.io/badge/NPM-339933?style=for-the-badge&logo=npm&color=black)
![JSON](https://shields.io/badge/JSONServer-339933?style=for-the-badge&logo=json&color=black)

I was just learning JavaScript and accidentally developed this program. (At least I didn't [build a shelf](https://transparent-aluminium.net/wp-content/uploads/2014/07/Help-I-accidentally-build-a-shelf1.png).)

## Screenshot

![Screenshot](/screenshots/screenshot.png)

**Note:** Dark reader enabled!

## Dependencies

* [json-server](https://github.com/typicode/json-server) (you may wanted to install it globally)
* node
* npm

## How To Run

Clone or download and extract this project. Locate to project directory and start the backend with the command below:

```sh
npm run start
```

You should be able to connect to <http://localhost:3200> address and see this error: 

> `An error occurred while reaching the server.`

This is because you also need to run the API service. To run this service execute this command:

```sh
json-server --watch api/employee.json
```