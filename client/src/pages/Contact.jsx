import { useState } from 'react'

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = 'Nama wajib diisi.'
    if (!form.email.trim()) newErrors.email = 'Email wajib diisi.'
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email tidak valid.'
    if (!form.message.trim()) newErrors.message = 'Pesan tidak boleh kosong.'
    return newErrors
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      alert(data.message);
      setForm({ name: '', email: '', message: '' }); // reset form
      setSubmitted(true);
    } catch (err) {
      console.error("Gagal mengirim:", err);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-white py-16">
      <div className="w-full max-w-xl bg-gray-50 p-8 rounded shadow">
        <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">Hubungi Saya</h2>

        {submitted && (
          <div className="mb-4 p-4 bg-green-100 text-green-800 rounded">
            Pesan kamu berhasil dikirim. Terima kasih!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Nama</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Pesan</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="5"
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Kirim Pesan
          </button>
        </form>
      </div>
    </section>
  )
}

export default Contact
