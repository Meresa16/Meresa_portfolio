import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Phone, MapPin, ChevronRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-6 py-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Brand & Bio */}
          <div>
            <Link to="/" className="text-2xl font-bold text-gray-800 dark:text-white tracking-tight">
              Meresa Gidey
            </Link>
            <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Cyber Data Analyst & Data Scientist based in Addis Ababa. Bridging the gap between complex data and strategic business decisions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-gray-200 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: 'Home', path: '/' },
                { name: 'Experience', path: '/experience' },
                { name: 'Education', path: '/education' },
                { name: 'Skills', path: '/skills' },
                { name: 'Resume', path: '/resume' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm flex items-center transition-colors"
                  >
                    <ChevronRight size={14} className="mr-1" /> {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-gray-200 mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start text-gray-600 dark:text-gray-400 text-sm">
                <MapPin size={16} className="mr-2 mt-0.5 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                Addis Ababa, Ethiopia
              </li>
              <li className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                <Mail size={16} className="mr-2 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                <a href="mailto:meresagidey0938@gmail.com" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  meresagidey0938@gmail.com
                </a>
              </li>
              <li className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                <Phone size={16} className="mr-2 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                <a href="tel:+251938140959" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  +251 938 140 959
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-gray-200 mb-4">Connect</h3>
            <div className="flex space-x-4">
              {/* Note: Update these hrefs with your actual profile URLs if you have them */}
              <a href="https://www.linkedin.com/in/meresa-gidey-3a8b6b145" className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:shadow-md transition-all">
                <Linkedin size={20} />
              </a>
              <a href="https://github.com/meresa16" className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:shadow-md transition-all">
                <Github size={20} />
              </a>
              <a href="mailto:meresagidey0938@gmail.com" className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:shadow-md transition-all">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 mt-8 text-center">
          <p className="text-gray-500 dark:text-gray-500 text-sm">
            © {currentYear} Meresa Gidey. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}