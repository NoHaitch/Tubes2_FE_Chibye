import React from "react";

export default function InputBlock({
  searchWiki,
  title,
  setTitle,
  suggestion,
  setSuggestion,
  first,
}) {
  return (
    <div>
      <label htmlFor="Link" className="block text-xl mb-2">
        {first?"Starting":"End"} Title
      </label>
      <input
        type="text"
        id="Link"
        name="Link"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          searchWiki(e.target.value).then((res) => setSuggestion(res));
        }}
        className="border-black border-2 rounded h-8 w-60"
        placeholder="Title..."
      />
      {suggestion.length !== 0 && (
        <ul className="overflow-y-scroll overflow-x-hidden h-28 w-60">
          {suggestion.map((item) => {
            return (
              <li
                key={item}
                onClick={() => {
                  setTitle(item);
                  setSuggestion([]);
                }}
                className="hover:bg-gray-500 hover:text-white hover:cursor-pointer"
              >
                {item}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
