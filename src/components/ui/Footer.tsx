import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-10">
            <div className="container mx-auto px-6 md:flex md:justify-between">
                {/* Thông tin liên hệ */}
                <div>
                    <h2 className="text-xl font-semibold">Liên Hệ</h2>
                    <p className="mt-2 text-gray-400">📍 123 Đường ABC, TP.HCM, Việt Nam</p>
                    <p className="text-gray-400">📞 0123-456-789</p>
                    <p className="text-gray-400">✉ support@myapp.com</p>
                </div>

                {/* Điều hướng nhanh */}
                <div className="mt-6 md:mt-0">
                    <h2 className="text-xl font-semibold">Điều Hướng</h2>
                    <ul className="mt-2 space-y-2">
                        <li><a href="/about" className="hover:underline text-gray-400">Về Chúng Tôi</a></li>
                        <li><a href="/services" className="hover:underline text-gray-400">Dịch Vụ</a></li>
                        <li><a href="/contact" className="hover:underline text-gray-400">Liên Hệ</a></li>
                        <li><a href="/faq" className="hover:underline text-gray-400">FAQ</a></li>
                    </ul>
                </div>

                {/* Social Media */}
                <div className="mt-6 md:mt-0">
                    <h2 className="text-xl font-semibold">Theo Dõi Chúng Tôi</h2>
                    <div className="flex space-x-4 mt-3">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebook className="text-gray-400 hover:text-blue-500 text-2xl" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <FaTwitter className="text-gray-400 hover:text-blue-400 text-2xl" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="text-gray-400 hover:text-pink-500 text-2xl" />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin className="text-gray-400 hover:text-blue-700 text-2xl" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="text-center text-gray-500 mt-8 border-t border-gray-700 pt-4">
                &copy; {new Date().getFullYear()} My App. All rights reserved.
            </div>
        </footer>
    );
}

