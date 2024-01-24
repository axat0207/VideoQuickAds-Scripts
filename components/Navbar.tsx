import Image from "next/image";
import {quickadsLogo} from '@/utils/constants'
// Header.tsx
const Navbar: React.FC = () => {
  return (
    <div className="w-full    bg-white">
      <header className="text-gray-600 body-font ">
        <div className="container mx-auto flex justify-between p-5 flex-col md:flex-row items-center">
          <a
            href="/"
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          >
            <Image
              height={200}
              width={200}
              alt="logo"
              src={quickadsLogo}
            />
          </a>
          <nav className="md:ml-auto hidden md:mr-auto lg:flex flex-wrap items-center text-base justify-center">
            <ul className="flex flex-wrap gap-6 text-md pt-2">
              <li>Features</li>
              <li>Use Cases</li>
              <li>Pricing</li>
              <li>Resources</li>
              <li>Partner Program</li>
            </ul>
          </nav>
          <button className="inline-flex gap-6 items-center border-0 py-1 px-3 focus:outline-none  rounded text-base mt-4 md:mt-0">
            <div className="px-4 py-2 border border-black rounded-lg">
              Login
            </div>
            <div className="px-4 py-2 border text-white bg-[#6938ef] rounded-lg">
              Get Started
            </div>
          </button>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
