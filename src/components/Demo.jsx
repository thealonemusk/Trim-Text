import React, { useState, useEffect } from "react";

import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState("");

  // RTK lazy query
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  // Load data from localStorage on mount
  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const existingArticle = allArticles.find(
      (item) => item.url === article.url
    );

    if (existingArticle) return setArticle(existingArticle);

    const { data } = await getSummary({ articleUrl: article.url });
    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];

      // update state and local storage
      setArticle(newArticle);
      setAllArticles(updatedAllArticles);
      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    }
  };

  // copy the url and toggle the icon for user feedback
  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit(e);
    }
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      {/* Search */}
      <div className="flex font-sans flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt="link-icon"
            className="absolute z-10 left-0 my-2 ml-3 w-5"
          />

          <Input
            placeholder="Paste the article link"
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            onKeyDown={handleKeyDown}
            required
            className="block w-full bg-transparent backdrop-blur-lg rounded-md border border-gray-400 py-2.5 pl-10 pr-12 text-sm shadow-lg font-medium text-white focus:border-white focus:outline-none focus:ring-0  focus-visible:ring-0 focus-visible:ring-offset-0"
            style={{
              backdropFilter: "blur(10px)",
              backgroundColor: "rgba(255, 255, 255, 0.2)", // Adjust the rgba values for a lighter or darker frosted effect
            }}
          />

          <Button
            type="submit"
            variant="ghost"
            className="submit_btn text-white hover:text-black hover:border-gray-700 absolute inset-y-0 -top-0.5 right-0 my-1.5 mr-1 hover:bg-slate-400 flex w-8 h-8 items-center justify-center rounded border border-gray-400 font-sans text-sm font-medium focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            ↵
          </Button>
        </form>

        {/* Browse History */}
        <div className="flex bg-transparent flex-col gap-2 max-h-60 overflow-y-auto">
          {allArticles.reverse().map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className="flex items-center bg-neutral-800 p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
            >
              <div
                className="copy_btn mr-3 bg-gray-700 hover:bg-gray-600 transition-colors duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopy(item.url);
                }}
              >
                <img
                  src={copied === item.url ? tick : copy}
                  alt={copied === item.url ? "tick_icon" : "copy_icon"}
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>
              <p className="flex-1 font-satoshi text-gray-200 font-medium text-sm truncate">
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Display Result */}
      <div className="my-10 max-w-full flex justify-center  items-center">
        {isFetching ? (
          <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
        ) : error ? (
          <p className="text-white text-center">
            Well, that wasn't supposed to happen... Please try again later
            <br />
            <span className="font-satoshi font-normal text-gray-300">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex border  border-gray-500 flex-col gap-3 rounded-xl p-4 max-w-2xl w-full">
              <h2 className="font-satoshi font-bold text-gray-200 text-2xl border-b border-gray-700 pb-2">
                Article Summary
              </h2>
              <div className="markdown-content text-white">
                {article.summary.split("\n").map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
