const express = require('express');

const app = express();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello from server', app: 'Natours' });
});

app.post('/', (req, res) => {
  res.json({ message: 'You can post to this URL', app: 'Natours' });
});
