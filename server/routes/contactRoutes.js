const express = require('express');
const router = express.Router();
const { readMessages, writeMessages } = require('../utils/fileUtils');

router.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Semua field wajib diisi.' });
  }

  try {
    const messages = readMessages();
    const newMessage = {
      id: Date.now(),
      name,
      email,
      message,
      date: new Date().toISOString(),
    };

    messages.push(newMessage);
    writeMessages(messages);

    res.status(201).json({ message: 'Pesan berhasil dikirim.' });
  } catch (error) {
    console.error('Gagal menyimpan pesan:', error);
    res.status(500).json({ message: 'Terjadi kesalahan server.' });
  }
});

module.exports = router;
