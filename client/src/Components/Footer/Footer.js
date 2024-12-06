import React from "react";
import "./Footer.css";

import HeaderLogo from "../../Assets/HeaderLogo.png";
import HeaderLogo2 from "../../Assets/HeaderLogoMobile.png";

const Footer = () => {
  return (
    <footer class="bg-[#531A5B] text-white py-8 flex justify-between mt-16">
      <div class="justify-center mt-10 flex flex-col h-full w-1/3 items-center mb-6 md:mb-0">
        <img src={HeaderLogo2} alt="Logo" class="h-full w-40" />
        {/* <span class="text-lg font-bold">Company Name</span> */}
      </div>
      <div class="container mx-auto w-2/3 flex flex-col md:flex-row items-start justify-between">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 w-full md:w-8/12">
          <div>
            <h3 class="text-lg font-semibold mb-2">About Us</h3>
            <ul class="space-y-1">
              <li>
                <a href="/company" class="hover:underline">
                  Company
                </a>
              </li>
              <li>
                <a href="/team" class="hover:underline">
                  Team
                </a>
              </li>
              <li>
                <a href="/careers" class="hover:underline">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-2">Socials</h3>
            <ul class="space-y-1">
              <li>
                <a href="https://facebook.com" class="hover:underline">
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://twitter.com" class="hover:underline">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://instagram.com" class="hover:underline">
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-2">Resources</h3>
            <ul class="space-y-1">
              <li>
                <a href="/blogs" class="hover:underline">
                  Blogs
                </a>
              </li>
              <li>
                <a href="/guides" class="hover:underline">
                  Guides
                </a>
              </li>
              <li>
                <a href="/faq" class="hover:underline">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-2">Support</h3>
            <ul class="space-y-1">
              <li>
                <a href="/contact" class="hover:underline">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/help" class="hover:underline">
                  Help Center
                </a>
              </li>
              <li>
                <a href="/privacy" class="hover:underline">
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
