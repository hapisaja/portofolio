function About() {
    return (
      <section className="min-h-screen flex items-center bg-white py-16">
        <div className="container max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          {/* Gambar / Foto */}
          <div className="flex justify-center">
            <img
              src="/image/profil.jpg"
              alt="Hafis"
              className="rounded-xl w-64 h-64 object-cover shadow-lg"
            />
          </div>
  
          {/* Deskripsi */}
          <div>
            <h2 className="text-3xl font-bold text-blue-600 mb-4">Tentang Saya</h2>
            <p className="text-gray-700 text-lg mb-4 leading-relaxed">
              Halo! Saya <strong>Pia Hafis Audrey Rifqi</strong>, seorang mahasiswa dari STMIK Widya Utama
              dengan jurusan Teknik Informatika. Sangat berminat dalam pemrograman dan desain.
            </p>
            <p className="text-gray-600 mb-6">
              Dapat beradaptasi dengan lingkungan dan suasana baru, bekerja sama dalam tim maupun individu, 
              bertanggungjawab dengan pekerjaan yang diberikan, dapat mengatur waktu dengan baik.
            </p>
  
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Keahlian:</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>Adobe Illustrator</li>
                <li>CorelDraw</li>
                <li>Canva</li>
                <li>HTML</li>
                <li>CSS</li>
                <li>PHP</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    )
  }
  
  export default About
  