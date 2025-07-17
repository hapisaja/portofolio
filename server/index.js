const { readProjects, writeProjects } = require("./utils/fileUtils");


const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 5000;


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve file statis untuk gambar
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routing
const projectRoutes = require('./routes/projectRoutes');
const contactRoutes = require('./routes/contactRoutes');

app.use(projectRoutes);
app.use(contactRoutes);


// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

app.delete("/api/projects/:id", async (req, res) => {
    const id = req.params.id;
  
    try {
      const projects = await readProjects(); // ambil data dari file
      const filtered = projects.filter((p) => p.id !== id); // filter berdasarkan id
  
      if (projects.length === filtered.length) {
        return res.status(404).json({ message: "Project tidak ditemukan" });
      }
  
      await writeProjects(filtered); // tulis ulang data tanpa project yg dihapus
      res.status(200).json({ message: "Project berhasil dihapus" });
    } catch (error) {
      console.error("Gagal menghapus:", error);
      res.status(500).json({ message: "Terjadi kesalahan server" });
    }
  });
