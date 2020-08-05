const express = require('express');
const connect_db = require('./db');
const gravatar = require('gravatar');


const app = express();

app.use(express.json());
app.use('/api/users', require('./routers/api/users'));
app.use('/api/profile', require('./routers/api/profile'));

app.use((err, req, res, next) => {
	const { message, status } = err;

	res.status(status || 500).send(message);
});

connect_db();

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));