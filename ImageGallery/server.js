const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(__dirname));

app.get('/api/images', (req, res) => {
  const imageFolder = path.join(__dirname, 'Images');
  const supported = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

  fs.readdir(imageFolder, (err, files) => {
    if (err) {
      return res.status(500).send('Error reading folder');
    }

    const imagePaths = files
      .filter(file => supported.includes(path.extname(file).toLowerCase()))
      .map(file => `/Images/${file}`);

    res.json(imagePaths);
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
