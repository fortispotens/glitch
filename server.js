const express = require('express');
const objectsToCSV = require('objects-to-csv');
const fs = require('fs');

const app = express();

const data = require('./data');

app.use(express.json());

app.get('/download-csv', async (request, response) => {
	const csv = await new objectsToCSV(data);

	await csv.toDisk('./data.csv');

	return response.status(200).download('./data.csv', () => {
		fs.unlinkSync('./data.csv');
	});
});

const port = 5000;

app.listen(port, () => console.debug(`Server is listening on port ${port}`));
