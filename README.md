
# Requete-api

[![Website](https://img.shields.io/website-up-down-green-red/https/dev-web-api.vercel.app.svg)](https://dev-web-api.vercel.app)

## Introduction

Requete-api is a simple proxy server built using Express.js and Axios. It forwards incoming HTTP requests to a target API and returns the response to the client. This setup can be useful for bypassing CORS issues or for adding additional processing to API requests.

## Installation

To install and set up the project locally:

1. Clone the repository:
    ```sh
    git clone https://github.com/besty-boy/Requete-api.git
    ```
2. Navigate to the project directory:
    ```sh
    cd Requete-api
    ```
3. Install dependencies:
    ```sh
    npm install
    ```

## Usage

To start the server, run:
```sh
npm start
```
By default, the server listens on port 3000. You can change the port by setting the `PORT` environment variable.

## Code Overview

The main server code is as follows:

```javascript
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

const targetAPI = 'http://88.198.66.157:27029';

const corsOptions = {
    origin: '*', 
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); 

app.use(express.json());

app.use((req, res) => {
    const url = `${targetAPI}${req.url}`;
    axios({
        method: req.method,
        url: url,
        data: req.body,
        headers: { 
            ...req.headers,
            host: targetAPI.split('//')[1] 
        }
    }).then(response => {
        res.status(response.status).send(response.data);
    }).catch(error => {
        if (error.response) {
            res.status(error.response.status).send(error.response.data);
        } else {
            res.status(500).send({ error: 'Something went wrong' });
        }
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
```

## Change

To make the script work, please change the IP to yours in: const targetAPI = 'http://your ip';

