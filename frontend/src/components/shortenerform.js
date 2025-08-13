import React, { useState } from "react";

function ShortenerForm({ onShorten }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // const res = await fetch("http://localhost:8000/shorten", {
      const res = await fetch("https://demo-1-wngg.onrender.com/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      if (!res.ok) throw new Error("Failed to shorten URL");
      const data = await res.json();
      onShorten(data.short_url);
      setUrl("");
    } catch (error) {
      alert(error.message);
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-4 p-6 bg-white shadow-lg rounded-lg max-w-md mx-auto"
    >
      <h1 className="text-2xl font-bold text-gray-700">URL Shortener</h1>
      <input
        type="url"
        placeholder="Enter a URL to shorten"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
        className="w-full p-3 border border-gray-300 rounded-md"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Shortening..." : "Shorten URL"}
      </button>
    </form>
  );
}

export default ShortenerForm;
