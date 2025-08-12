"use client";

import { usePathname } from "next/navigation";

export const Footer = () => {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin");

  return (
    <footer
      className={`py-17 ${isAdminPage ? "md:ml-56" : ""}`}
      style={{
        background: `
          radial-gradient(ellipse 120% 80% at 70% 20%, rgba(255, 20, 147, 0.15), transparent 50%),
          radial-gradient(ellipse 100% 60% at 30% 10%, rgba(0, 255, 255, 0.12), transparent 60%),
          radial-gradient(ellipse 90% 70% at 50% 0%, rgba(138, 43, 226, 0.18), transparent 65%),
          radial-gradient(ellipse 110% 50% at 80% 30%, rgba(255, 215, 0, 0.08), transparent 40%),
          #000000
        `,
      }}
    >
      <div className="container mx-auto px-4 text-center md:text-left text-gray-600 dark:text-gray-400">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Better-Car
            </h2>
            <p className="mt-2 text-sm">
              Driving innovation and excellence in the automotive
              industry. Your trusted partner for better cars, better
              journeys.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-500">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Contact Us
            </h3>
            <p>
              Email:{" "}
              <a
                href="mailto:info@bettercar.com"
                className="hover:text-blue-500"
              >
                info@bettercar.com
              </a>
            </p>
            <p>
              Phone:{" "}
              <a href="tel:+1234567890" className="hover:text-blue-500">
                +1 (234) 567-890
              </a>
            </p>
            <p>Address: 123 Better-Car Blvd, Auto City</p>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-300 dark:border-gray-700 pt-6 text-sm">
          <p>
            © {new Date().getFullYear()} Better-Car. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
