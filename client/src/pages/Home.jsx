import { Link } from 'react-router-dom'

function Home() {
  return (
    <section className="bg-white min-h-[80vh] flex items-center">
      <div className="container grid md:grid-cols-2 gap-10 items-center py-16">
        {/* Text Section */}
        <div className="text-center md:text-left px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-4">
            Hai, Saya <span className="text-blue-600">Hafis</span>
          </h1>
          <p className="text-gray-600 text-lg md:text-xl mb-6">
            Pia Hafis Audrey Rifqi 
            <br></br>
            Programmer & Desainer
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              to="/portfolio"
              className="px-6 py-3 rounded bg-blue-600 text-white hover:bg-blue-700 transition text-center"
            >
              Lihat Proyek
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 rounded border border-blue-600 text-blue-600 hover:bg-blue-50 transition text-center"
            >
              Kontak Saya
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex justify-center md:justify-end px-4">
          <img
            src="/image/profil.jpg"
            alt="Foto Profil"
            className="rounded-full shadow-lg w-64 h-64 object-cover"
          />
        </div>
      </div>
    </section>
  )
}

export default Home
