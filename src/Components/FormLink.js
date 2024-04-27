import React, { useState } from "react";
import swal from "sweetalert";
import InputBlock from "./InputBlock";
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { Stack } from "@mui/material";

export default function FormLink(props) {
  const [firstTitle, setFirstTitle] = useState("");
  const [lastTitle, setLastTitle] = useState("");
  const [bfs,setBFS] = useState(true)
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
      console.error(error);
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
          if (lastRes.length === 0) {
            swal("Error", "Last Title is Invalid", "error");
          } else {
            if(firstTitle.localeCompare(lastTitle)===0){
              swal("Error", "Both First and Last Titles are the same", "error");
            }else{
              props.setValidFirst(firstTitle.replace(new RegExp(" ", "g"), "_"));
              props.setValidLast(lastTitle.replace(new RegExp(" ", "g"), "_"));
              props.setValidBFS(bfs)
            }
          }
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
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center h-32 text-left gap-10">
        <InputBlock 
          searchWiki= {searchWiki}
          Title = {firstTitle}
          setTitle={setFirstTitle}
          first= {true}
        />
        <InputBlock 
          searchWiki= {searchWiki}
          Title={lastTitle}
          setTitle={setLastTitle}
          first={false}
        />
      </div>
      <div className="flex flex-col items-center">
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography>BFS</Typography>
          <Switch 
            inputProps={{ 'aria-label': 'ant design' }} 
            onChange={()=>{
              setBFS(!bfs)
            }}
          />
          <Typography>IDS</Typography>
        </Stack>
        <button 
          type="submit"
          className="text-xl bg-gray-200 w-32 h-16 mt-2 rounded-lg
          hover:bg-gray-700 hover:text-gray-200
          hover:cursor-pointer"
        >
          Search!</button>
      </div>
    </form>
  );
}
