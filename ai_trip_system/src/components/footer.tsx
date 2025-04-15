import {
  FaGithub,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaDiscord,
} from "react-icons/fa6";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800 dark:bg-black px-4 py-4 md:px-24">
      <div className="text-sm grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-6 text-white">
        <div>
          <h2 className="text-2xl font-bold">Nhóm 2</h2>
        </div>
        <div>
          <h3 className="text-base font-bold">About us</h3>
          <ul className="list-outside list-none text-gray-300 hover:text-gray-100 dark:hover:text-white">
            <li className=" mt-0 md:mt-2">
              <Link className="hover:underline" href="/">
                App introduce
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-base font-bold">Contact</h3>
          <ul className="list-outside list-none">
            <li className="mt-0 md:mt-2 text-gray-300 hover:text-gray-100 dark:hover:text-white">
              Email:{" "}
              <Link href="mailto:example@gmail.com" className="hover:underline">
                example@gmail.com
              </Link>
            </li>
            <li className="text-gray-300 hover:text-gray-100 dark:hover:text-white">
              Hotline:{" "}
              <Link href="tel:0123456789" className="hover:underline">
                0123456789
              </Link>
            </li>
            <li className="text-gray-300 hover:text-gray-100 dark:hover:text-white">
              <Link className="hover:underline" href="#">
                FAQs
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-base font-bold">Subcribe to our newsletter</h3>
          <div className="flex space-x-4 mt-0 md:mt-2">
            <Link href="https://github.com">
              <FaGithub className="w-6 h-6 text-gray-400 hover:text-gray-200 dark:hover:text-white" />
            </Link>
            <Link href="https://facebook.com">
              <FaFacebook className="w-6 h-6 text-gray-400 hover:text-gray-200 dark:hover:text-white" />
            </Link>
            <Link href="https://instagram.com">
              <FaInstagram className="w-6 h-6 text-gray-400 hover:text-gray-200 dark:hover:text-white" />
            </Link>
            <Link href="https://linkedin.com">
              <FaLinkedin className="w-6 h-6 text-gray-400 hover:text-gray-200 dark:hover:text-white" />
            </Link>
            <Link href="https://discord.com">
              <FaDiscord className="w-6 h-6 text-gray-400 hover:text-gray-200 dark:hover:text-white" />
            </Link>
          </div>
        </div>
      </div>
      <hr className="border-gray-400 dark:border-gray-700 my-4" />
      <p className="text-sm text-gray-300">
        Copyright @ 2025 | All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
