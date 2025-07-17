import React, { useState, useEffect } from "react";

function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);


  // Ambil data project dari backend
  useEffect(() => {
    fetch("http://localhost:5000/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Gagal ambil data:", err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };
  
  const handleDelete = async (id) => {
    console.log("Menghapus ID:", id);
    const konfirmasi = window.confirm("Yakin ingin menghapus project ini?");
    if (!konfirmasi) return;
  
    try {
      const res = await fetch(`http://localhost:5000/api/projects/${id}`, {
        method: "DELETE",
      });
  
      if (!res.ok) {
        throw new Error("Gagal menghapus project dari server.");
      }
  
      // Update state setelah berhasil hapus
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== id)
      );
    } catch (err) {
      console.error("Terjadi kesalahan saat menghapus project:", err);
      alert("Gagal menghapus project. Silakan coba lagi.");
    }
  };

  const handleEdit = (project) => {
    setEditMode(true);
    setEditingId(project.id);
    setFormData({
      title: project.title,
      description: project.description,
      image: null, // gambar opsional diubah
    });
    setShowModal(true);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    if (formData.image) {
      form.append("image", formData.image);
    }

    try {
      let res;
      if (editMode) {
        res = await fetch(`http://localhost:5000/api/projects/${editingId}`, {
          method: "PUT",
          body: form,
        });
      } else {
        res = await fetch("http://localhost:5000/api/projects", {
          method: "POST",
          body: form,
        });
      }

      const data = await res.json();

      if (editMode) {
        setProjects((prev) =>
          prev.map((p) => (p.id === editingId ? data : p))
        );
      } else {
        setProjects((prev) => [...prev, data]);
      }

      // Reset
      setShowModal(false);
      setFormData({ title: "", description: "", image: null });
      setEditMode(false);
      setEditingId(null);
    } catch (err) {
      console.error("Gagal simpan:", err);
    }
  };


  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Project Portofolio</h1>

      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-6"
      >
        Tambah Project
      </button>

      {/* Modal Form Tambah Project */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
            <h2 className="text-xl font-semibold mb-4">Tambah Project</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Judul"
                value={formData.title}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
              <textarea
                name="description"
                placeholder="Deskripsi"
                value={formData.description}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Card Project */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-2 relative">
          {project.image && (
            <img
              src={`http://localhost:5000${project.image}`}
              alt={project.title}
              className="w-full h-48 object-cover rounded mb-4"
            />
          )}
          <h3 className="text-xl font-semibold">{project.title}</h3>
          <p className="text-gray-700 mb-2">{project.description}</p>
          <button
            onClick={() => handleEdit(project)}
            className="mr-2 self-end bg-yellow-500 text-white px-2 py-1 rounded text-sm hover:bg-yellow-600"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(project.id)}
            className="self-end bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
          >
            Hapus
          </button>
        </div>
      ))}
      </div>
    </div>
  );
}

export default Portfolio;
