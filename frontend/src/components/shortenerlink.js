import React, { useState } from "react";

function ShortenedLinks({ links }) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  if (!links || links.length === 0) return null;

  const handleCopy = (link, idx) => {
    navigator.clipboard.writeText(link);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="mt-8 p-6 bg-white rounded-xl shadow-lg max-w-lg mx-auto border border-gray-200">
      <h2 className="text-xl font-bold mb-5 text-gray-800">Shortened Links</h2>
      <ul className="space-y-4">
        {links.map((linkObj, index) => (
          <li
            key={index}
            className="flex flex-col md:flex-row md:items-center justify-between bg-gray-50 rounded-lg p-4 border border-gray-100 hover:shadow transition"
          >
            <div className="flex-1 mb-2 md:mb-0">
              <div className="text-gray-500 text-xs truncate">
                Original: {linkObj.original || "N/A"}
              </div>
              <a
                href={linkObj.short || linkObj}
                target="_blank"
                rel="noreferrer"
                className="text-blue-700 font-medium hover:underline break-all"
              >
                {linkObj.short || linkObj}
              </a>
            </div>
            <button
              onClick={() => handleCopy(linkObj.short || linkObj, index)}
              className={`ml-0 md:ml-4 px-4 py-2 rounded-lg text-sm font-semibold transition ${
                copiedIndex === index
                  ? "bg-green-500 text-white"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {copiedIndex === index ? "Copied!" : "Copy"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShortenedLinks;