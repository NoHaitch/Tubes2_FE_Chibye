import React, { useState } from "react";
import swal from "sweetalert";
import searchIcon from "../Images/search-icon.jpg";
import InputBlock from "./InputBlock";

export default function FormLink(props) {
  const [firstTitle, setFirstTitle] = useState("");
  const [lastTitle, setLastTitle] = useState("");
  const [firstSuggestion, setFirstSuggestion] = useState([]);
  const [lastSuggestion, setLastSuggestion] = useState([]);

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

      if (firstRes.length === 0 && lastRes.length === 0) {
        swal("Error", "Both First and Last Titles are Invalid", "error");
      } else {
        if (firstRes.length === 0) {
          swal("Error", "First Title is Invalid", "error");
        } else {
          props.setValidFirst(firstTitle);
        }

        if (lastRes.length === 0) {
          swal("Error", "Last Title is Invalid", "error");
        } else {
          props.setValidLast(lastTitle);
        }
      }
    } catch (error) {
      console.error("Error occurred during search:", error);
      swal(
        "Error",
        "An error occurred while searching. Please try again.",
        "error"
      );
    }
  };

  return (
    <form className="text-center" onSubmit={handleSubmit}>
      <div className="flex justify-center h-40 text-left gap-10">
        <InputBlock 
          searchWiki= {searchWiki}
          title= {firstTitle}
          setTitle={setFirstTitle}
          suggestion={firstSuggestion}
          setSuggestion={setFirstSuggestion}
          first= {true}
        />
        <InputBlock 
          searchWiki= {searchWiki}
          title= {lastTitle}
          setTitle={setLastTitle}
          suggestion={lastSuggestion}
          setSuggestion={setLastSuggestion}
          first={false}
        />
      </div>
      <button 
        type="submit"
        className="mt-20 text-xl bg-gray-400 w-28 h-16 rounded-xl 
        hover:bg-gray-700 hover:text-gray-200
        hover:cursor-pointer"
      >
        Submit</button>
    </form>
  );
}
