Chatty-App
=====================

A lightweight chat room application made using react and WebSockets combined with a small implementation of graphql handling user online count.

### Usage

This application relies on running `two node instances`.  Please `clone` the [Chatty-Server](https://github.com/alex-ac2/chatty-server) application running the necessary WebSocket connection and Apollo/GraphQL server.  

(Upon completion of Chatty-Server local deployment)

Install the dependencies and start the Chatty-App frontend server.

```
npm install
npm start
open http://localhost:3000
```

### Dependencies

Frontend (Chatty-App):
* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
* Axios
* Apollo-Boost
* React-Apollo
* Apollo-link-ws
* Apollo-utilities 

Backend (Chatty-Server):
* Express
* WS
* Uuid
* Cors
* Axios
* Apollo-server-express

---

## Final Project

Main Page:

Username update notification: 
