import React from "react";

import { logo } from "../assets";

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-6">
        <img src={logo} alt="trimtext_logo" className="w-36 object-contain" />

        <button
          type="button"
          onClick={() =>
            window.open("https://github.com/thealonemusk/Trim-Text", "_blank")
          }
          className="text-white border border-gray-500 hover:bg-gray-900 px-3 py-2 rounded-md"
        >
          GitHub
        </button>
      </nav>

      <h1 className=" mt-5 text-5xl font-extrabold  sm:text-6xl text-center text-[#5437D2]/80  leading-loose ">
        Summarize Articles with <br className="max-md:hidden" />
        <span className="orange_gradient ">TrimText</span>
      </h1>
      <div className="max-w-xl text-center mt-8 text-xl font-light text-gray-400 font-sans">
        Simplify your reading with Trim-Text, an open-source article summarizer
        that transforms lengthy articles into clear and concise summaries
      </div>
    </header>
  );
};

export default Hero;
