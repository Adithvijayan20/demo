import React, { useState } from "react";
import ShortenerForm from "./components/shortenerform";
import ShortenedLinks from "./components/shortenerlink";

function App() {
  const [links, setLinks] = useState([]);

  const handleShorten = (shortUrl) => {
    setLinks((prev) => [shortUrl, ...prev]); // newest first
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start py-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        URL Shortener
      </h1>

      <div className="w-full max-w-xl bg-white shadow-lg rounded-xl p-6">
        <ShortenerForm onShorten={handleShorten} />
      </div>

      <div className="w-full max-w-xl mt-6 space-y-4">
        {links.length > 0 && (
          <h2 className="text-2xl font-semibold text-gray-700">
            Your Shortened Links
          </h2>
        )}
        <ShortenedLinks links={links} />
      </div>
    </div>
  );
}

export default App;
