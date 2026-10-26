
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const publicDir = path.join(__dirname, 'public');

app.use(express.static(publicDir));

app.use(
  '/.well-known',
  express.static(
    path.join(__dirname, 'public', '.well-known'),
    {
      dotfiles: 'allow',
      index: false
    }
  )
);

// Fallback for deep links (e.g. /ride/:id, /invite/:id) and unmatched GET routes when the app is not installed
app.use((req, res, next) => {
  if (req.method === 'GET') {
    return res.sendFile(path.join(publicDir, 'index.html'));
  }
  next();
});

app.listen(PORT, '0.0.0.0', () => {
//   console.log(`Saathi frontend listening on ${PORT}`);
});
