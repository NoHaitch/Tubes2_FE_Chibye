import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
export default function InputBlock({
  searchWiki,
  Title,
  setTitle,
  first,
}) {
  const [title,setTitlee] = useState("")
  const [suggestion,setSuggestion] = useState([])

  const [debouncedTitle] = useDebounce(title,300);
  useEffect(()=>{
    if(debouncedTitle!==""){
      searchWiki(debouncedTitle)
        .then(res => setSuggestion(res))
    }
  },[debouncedTitle])
  return (
    <div className=" w-full max-w-2xl">
      <label htmlFor="Link" className="block text-xl mb-2">
        {first?"Starting":"End"} Title
      </label>
      <input
        type="text"
        id="Link"
        name="Link"
        value={Title}
        onChange={(e) => {
          setTitle(e.target.value);
          setTitlee(e.target.value)
        }}
        className="border-black border-2 rounded h-12 w-full indent-2"
        placeholder="Title..."
        autoComplete="off"
      />
      {suggestion.length !== 0 && (
        <ul className="overflow-y-auto overflow-x-hidden max-h-40 bg-gray-300 relative z-10
        border-solid border-black border-2">
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
