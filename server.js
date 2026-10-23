
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

app.listen(PORT, '0.0.0.0', () => {
//   console.log(`Saathi frontend listening on ${PORT}`);
});
