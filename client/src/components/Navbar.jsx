import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">Hafis.</h1>
        <ul className="flex gap-6 text-sm md:text-base font-medium text-gray-700">
          <li><Link to="/" className="hover:text-blue-600">Beranda</Link></li>
          <li><Link to="/about" className="hover:text-blue-600">Tentang</Link></li>
          <li><Link to="/portfolio" className="hover:text-blue-600">Portofolio</Link></li>
          <li><Link to="/contact" className="hover:text-blue-600">Kontak</Link></li>
          <li><Link to="/blog" className="hover:text-blue-600">Pengalaman</Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
