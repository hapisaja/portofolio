function Blog() {
    const experiences = [
      {
        company: 'PERURI (Perusahaan Umum Percetakan Uang Republik Indonesia)',
        role: 'Operator Pracetak',
        period: '2020 – Sekarang',
        description:
          'Membuat acuan cetak untuk mencetak uang, materai, dan dokumen lainnya yang memerlukan security, mengurus admnistrasi, mengoperasikan mesin seperti nickel bath, grinding, chromium bath, pliforaIV, CTIP.',
      },
      // Tambah pengalaman lain di sini jika ada
    ]
  
    return (
      <section className="min-h-screen bg-white py-16">
        <div className="container px-4 mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-blue-600 mb-10 text-center">Pengalaman Kerja</h2>
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl p-6 bg-gray-50 shadow hover:shadow-md transition"
              >
                <h3 className="text-xl font-semibold text-gray-800">{exp.role}</h3>
                <p className="text-sm text-gray-500 mb-1">{exp.company}</p>
                <p className="text-sm text-blue-600 font-medium mb-3">{exp.period}</p>
                <p className="text-gray-700 text-sm">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  export default Blog
  