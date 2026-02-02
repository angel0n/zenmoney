const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors()); // 🌍 libera tudo
app.use(express.json());

app.post('/auth/validate', (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ valid: false });
  }

  const token = authHeader.split(' ')[1];

  if (token === 'fake-token-1234') {
    return res.json({ valid: true });
  }

  return res.status(401).json({ valid: false });
});

app.listen(3000, () => {
  console.log('Server うごく na porta 3000');
});
