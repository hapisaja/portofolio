const express = require('express');
const router = express.Router();

router.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log('📩 Pesan kontak:', { name, email, message });
  res.status(200).json({ message: 'Pesan berhasil dikirim' });
});

module.exports = router;
