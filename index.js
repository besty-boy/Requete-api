const express = require('express');
const axios = require('axios');
const app = express();

const targetAPI = 'http://88.198.66.157:27029';

app.use((req, res) => {
    const url = `${targetAPI}${req.url}`;
    axios({
        method: req.method,
        url: url,
        data: req.body,
        headers: { ...req.headers }
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
