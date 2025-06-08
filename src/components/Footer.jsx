const Footer = () => {
  return (
    <footer className="bg-gray-100 py-6 mt-1 text-sm text-gray-600">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <p>&copy; {new Date().getFullYear()} <span className="font-semibold">TaskFlow</span>. All rights reserved.</p>

        <div className="flex space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 5.022 3.676 9.166 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.493-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.874h2.773l-.443 2.89h-2.33V21.88C18.324 21.167 22 17.022 22 12z" />
            </svg>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.46 6c-.77.34-1.6.57-2.46.67a4.23 4.23 0 001.85-2.33 8.59 8.59 0 01-2.7 1.03A4.28 4.28 0 0015.5 4c-2.36 0-4.28 1.92-4.28 4.29 0 .34.04.67.1.98C7.69 8.95 4.28 7.13 2.06 4.45a4.26 4.26 0 00-.58 2.16c0 1.48.75 2.79 1.89 3.55a4.25 4.25 0 01-1.94-.53v.05c0 2.07 1.47 3.8 3.43 4.19a4.33 4.33 0 01-1.93.07 4.29 4.29 0 004 2.96A8.6 8.6 0 012 19.54a12.14 12.14 0 006.56 1.93c7.88 0 12.2-6.53 12.2-12.2 0-.19-.01-.37-.02-.56A8.71 8.71 0 0022.46 6z" />
            </svg>
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-800 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.58 2 12.14c0 4.45 2.87 8.22 6.84 9.55.5.09.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.61-3.37-1.37-3.37-1.37-.45-1.17-1.1-1.48-1.1-1.48-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.55 2.34 1.1 2.9.84.09-.66.35-1.1.64-1.36-2.22-.26-4.55-1.14-4.55-5.05 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.29.1-2.68 0 0 .84-.27 2.75 1.05A9.47 9.47 0 0112 6.8a9.49 9.49 0 012.5.35c1.91-1.32 2.75-1.05 2.75-1.05.55 1.39.2 2.42.1 2.68.64.72 1.03 1.63 1.03 2.75 0 3.92-2.34 4.78-4.57 5.03.36.32.68.94.68 1.91 0 1.38-.01 2.5-.01 2.84 0 .27.18.59.69.49A10.17 10.17 0 0022 12.14C22 6.58 17.52 2 12 2z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
