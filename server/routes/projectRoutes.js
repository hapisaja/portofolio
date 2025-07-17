const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { readProjects, writeProjects } = require("../utils/fileUtils");

// Konfigurasi penyimpanan gambar dengan multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // pastikan ada ekstensi file
  },
});

const upload = multer({ storage });

// GET: Ambil semua projects
router.get("/api/projects", (req, res) => {
  const projects = readProjects();
  res.json(projects);
});

// POST: Tambah project baru
router.post("/api/projects", upload.single("image"), (req, res) => {
  const { title, description, link } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : "";

  const newProject = {
    id: Date.now(),
    title,
    description,
    link,
    image,
  };

  const projects = readProjects();
  projects.push(newProject);
  writeProjects(projects);

  res.status(201).json(newProject);
});

module.exports = router;

router.delete("/api/projects/:id", (req, res) => {
    const id = parseInt(req.params.id);
    let projects = readProjects();
  
    const index = projects.findIndex((p) => p.id === id);
  
    if (index === -1) {
      return res.status(404).json({ message: "Project tidak ditemukan" });
    }
  
    const deleted = projects.splice(index, 1);
    writeProjects(projects);
  
    res.json({ message: "Project berhasil dihapus", deleted });
  });

// PUT: Edit project
router.put("/api/projects/:id", upload.single("image"), (req, res) => {
    const { id } = req.params;
    const { title, description, link } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;
  
    const projects = readProjects();
    const projectIndex = projects.findIndex((p) => p.id == id);
  
    if (projectIndex === -1) {
      return res.status(404).json({ message: "Project tidak ditemukan" });
    }
  
    // Update field
    projects[projectIndex].title = title;
    projects[projectIndex].description = description;
    projects[projectIndex].link = link;
  
    if (image) {
      projects[projectIndex].image = image;
    }
  
    writeProjects(projects);
  
    res.json(projects[projectIndex]);
  });
  