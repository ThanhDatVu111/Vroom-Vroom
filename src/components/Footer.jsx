import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="bg-[#6f0320]">
        <div className="relative mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 lg:pt-24">
          <div className="lg:flex lg:items-end lg:justify-between">
            <div>
              <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-white lg:text-left">
                Find your perfect ride with confidence. Trusted by car buyers
                and sellers nationwide.
              </p>
            </div>

            <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:mt-0 lg:justify-end lg:gap-12">
              <li>
                <a
                  className="text-white transition hover:text-gray-300"
                  href="https://www.linkedin.com/in/thanh-dat-vu-42b468286/"
                >
                  {" "}
                  About{" "}
                </a>
              </li>
              <li>
                <a
                  className="text-white transition hover:text-gray-300"
                  href="https://www.linkedin.com/in/thanh-dat-vu-42b468286/"
                >
                  {" "}
                  Services{" "}
                </a>
              </li>

              <li>
                <a
                  className="text-white transition hover:text-gray-300"
                  href="https://www.linkedin.com/in/thanh-dat-vu-42b468286/"
                >
                  {" "}
                  Projects{" "}
                </a>
              </li>

              <li>
                <a
                  className="text-white transition hover:text-gray-300"
                  href="https://www.linkedin.com/in/thanh-dat-vu-42b468286/"
                >
                  {" "}
                  Blog{" "}
                </a>
              </li>
            </ul>
          </div>
          <p className="mt-12 text-center text-sm text-white lg:text-right">
            Copyright &copy; 2024. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;