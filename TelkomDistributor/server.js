const express = require('express');
const path = require('path');
const livereload = require('livereload');
const connectLivereload = require('connect-livereload');

const PORT = 8000;
const app = express();

// Set up LiveReload server
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname));

// Inject livereload script into served pages
app.use(connectLivereload());

// Serve static files
app.use(express.static(__dirname));

// Route to index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Listen
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Notify browser on changes
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});
