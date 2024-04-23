import React, { useState } from "react";
import ReactModal from "react-modal";

export default function FormLink(props) {
  const [firstTitle, setFirstTitle] = useState("");
  const [lastTitle, setLastTitle] = useState("");
  const [firstSuggestion, setFirstSuggestion] = useState([]);
  const [lastSuggestion, setLastSuggestion] = useState([]);
  const [error, setError] = useState("");

  const searchWiki = async (title) => {
    try {
      const titleReq = title.replace(new RegExp(" ", "g"), "_");
      const response = await fetch(
        `https://api.allorigins.win/get?url=${encodeURIComponent(
          `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${titleReq}`
        )}`
      );
      const data = await response.json();
      const jsonData = JSON.parse(data.contents);
      const jsonArr = jsonData.query.search;
      return jsonArr.map((item) => item.title);
    } catch (error) {
      console.error("Error occurred while searching:", error);
      return [];
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const [firstRes, lastRes] = await Promise.all([
        searchWiki(firstTitle),
        searchWiki(lastTitle),
      ]);

      if (firstRes.length === 0) {
        setError("First Title is Invalid");
      } else {
        props.setValidFirst(firstTitle);
      }

      if (lastRes.length === 0) {
        setError((err) =>
          err==="" ? "Last Title is Invalid" : `${err} and Last Title is Invalid`
        );
      } else {
        props.setValidLast(lastTitle);
      }
    } catch (error) {
      console.error("Error occurred during search:", error);
      setError("An error occurred while searching. Please try again.");
    }
  };

  return (
    <form className="flex justify-center" onSubmit={handleSubmit}>
      <div className="relative">
        <label htmlFor="firstLink">Starting Title</label>
        <input
          type="text"
          id="firstLink"
          name="firstLink"
          value={firstTitle}
          onChange={(e) => {
            setFirstTitle(e.target.value);
            searchWiki(e.target.value).then((res) => setFirstSuggestion(res));
          }}
          className="border-black border-2 relative"
        />
        {firstSuggestion.length !== 0 && (
          <ul className="absolute top-8 left-12">
            {firstSuggestion.map((item) => {
              return (
                <li
                  key={item}
                  onClick={() => {
                    setFirstTitle(item);
                    setFirstSuggestion([]);
                  }}
                >
                  {item}
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <div className="relative">
        <label htmlFor="lastLink">End Title</label>
        <input
          type="text"
          id="start"
          name="lastLink"
          value={lastTitle}
          onChange={(e) => {
            setLastTitle(e.target.value);
            searchWiki(e.target.value).then((res) => setLastSuggestion(res));
          }}
          className="border-black border-2"
        />
        {lastSuggestion.length !== 0 && (
          <ul className="absolute top-8 left-12">
            {lastSuggestion.map((item) => {
              return (
                <li
                  key={item}
                  onClick={() => {
                    setLastTitle(item);
                    setLastSuggestion([]);
                  }}
                >
                  {item}
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <button type="submit">Submit</button>

    </form>
  );
}
