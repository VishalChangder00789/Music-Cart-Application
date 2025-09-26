import React from "react";
import "./Footer.css";
import { useNightModeContext } from "../../Contexts/OtherCommonContext/NightModeContext";

import HeaderLogo from "../../Assets/HeaderLogo.png";
import HeaderLogo2 from "../../Assets/HeaderLogoMobile.png";

const Footer = () => {
  const { isNightMode } = useNightModeContext();

  return (
    <footer
      className={`${
        isNightMode ? `bg-[#341539]` : `bg-[#531A5B]`
      } text-white py-8 flex justify-between" `}
    >
      <div className="justify-center mt-10 flex flex-col h-full w-1/3 items-center mb-6 md:mb-0">
        <img src={HeaderLogo2} alt="Logo" className="h-full w-40" />
        {/* <span className="text-lg font-bold">Company Name</span> */}
      </div>
      <div className="container mx-auto w-2/3 flex flex-col md:flex-row items-start justify-between">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full md:w-8/12">
          <div>
            <h3 className="text-lg font-semibold mb-2">About Us</h3>
            <ul className="space-y-1">
              <li>
                <a href="/company" className="hover:underline">
                  Company
                </a>
              </li>
              <li>
                <a href="/team" className="hover:underline">
                  Team
                </a>
              </li>
              <li>
                <a href="/careers" className="hover:underline">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Socials</h3>
            <ul className="space-y-1">
              <li>
                <a href="https://facebook.com" className="hover:underline">
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://twitter.com" className="hover:underline">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://instagram.com" className="hover:underline">
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Resources</h3>
            <ul className="space-y-1">
              <li>
                <a href="/blogs" className="hover:underline">
                  Blogs
                </a>
              </li>
              <li>
                <a href="/guides" className="hover:underline">
                  Guides
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:underline">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Support</h3>
            <ul className="space-y-1">
              <li>
                <a href="/contact" className="hover:underline">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/help" className="hover:underline">
                  Help Center
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
