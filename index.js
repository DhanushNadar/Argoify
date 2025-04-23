const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static HTML from /public
app.use(express.static(path.join(__dirname, 'public')));

// Sample API endpoint
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Node.js API 👋' });
});

if (require.main === module) {
    app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app;
