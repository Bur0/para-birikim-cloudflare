export default function Footer() {
  return (
    <footer className="mt-auto bg-gray-900 text-gray-100 border-t border-gray-800">
      <div className="max-w-screen-xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-semibold text-xl mb-6 text-white">Parakredim</h3>
            <p className="text-sm text-gray-400">
              Güncel döviz kurları, altın fiyatları ve borsa verilerini
              takip edebileceğiniz finansal bilgi platformu.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-6 text-white">Hızlı Erişim</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition-colors">
                  Ana Sayfa
                </a>
              </li>
              <li>
                <a href="/doviz" className="text-gray-400 hover:text-white transition-colors">
                  Döviz Kurları
                </a>
              </li>
              <li>
                <a href="/altin" className="text-gray-400 hover:text-white transition-colors">
                  Altın Fiyatları
                </a>
              </li>
              <li>
                <a href="/borsa" className="text-gray-400 hover:text-white transition-colors">
                  Borsa
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-6 text-white">İletişim</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/hakkimizda" className="text-gray-400 hover:text-white transition-colors">
                  Hakkımızda
                </a>
              </li>
              <li>
                <a href="/gizlilik" className="text-gray-400 hover:text-white transition-colors">
                  Gizlilik Politikası
                </a>
              </li>
              <li>
                <a href="/kullanim-kosullari" className="text-gray-400 hover:text-white transition-colors">
                  Kullanım Koşulları
                </a>
              </li>
              <li>
                <a href="/iletisim" className="text-gray-400 hover:text-white transition-colors">
                  İletişim
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Parakredim. Tüm hakları
            saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}
