import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

export default function Graph({ firstTitle, lastTitle }) {
  const svgRef = useRef(null);
  //   const [timeTaken, setTimeTaken] = useState(0);
  //   const [results, setResults] = useState([]);

  //     const Nodes = results.map(path =>{
  //         return {
  //             id: path.slice(6),
  //             idx: 0
  //         }
  //     })

  useEffect(() => {
    // try {
    //   fetch("backeend", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       firstLink: `https://en.wikipedia.org/wiki/${firstTitle}`,
    //       lastLink: `https://en.wikipedia.org/wiki/${lastTitle}`,
    //     }),
    //   })
    //     .then((res) => res.JSON())
    //     .then((data) => {
    //       setResults(data.results);
    //       setTimeTaken(data.timeTaken);
    //     });
    // } catch (error) {
    //   console.log(error);
    // }
    // if(results.length!==0)
    const nodes = [
      { id: "Jokowi", url: "https://example.com/Jokowi" },
      { id: "Prabowo", url: "https://example.com/Prabowo" },
      { id: "Anies", url: "https://example.com/Anies" },
      { id: "Kiel", url: "https://example.com/Kiel" },
      { id: "Budi", url: "https://example.com/Budi" },
    ];

    const width = 600;
    const height = 400;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);
    const simulation = d3
      .forceSimulation(nodes)
      .force("charge", d3.forceManyBody().strength(-100))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force(
        "link",
        d3.forceLink().id((d) => d.id)
      )
      .on("tick", () => {
        svg
          .selectAll(".node")
          .attr("cx", (d) => d.x)
          .attr("cy", (d) => d.y);

        svg
          .selectAll(".link")
          .attr("x1", (d) => d.source.x)
          .attr("y1", (d) => d.source.y)
          .attr("x2", (d) => d.target.x)
          .attr("y2", (d) => d.target.y);

        svg.selectAll(".label")
            .attr("x",(d) => d.x)
            .attr("y",(d) => d.y)
            .text((d)=>d.id)
      });
    // const links = []
    // for(let i=0;i<nodes.length-1;i++){
    //     links.push({
    //         source: i,
    //         target: i+1,
    //     })
    // }
    const links = [
      { source: "Jokowi", target: "Budi" },
      { source: "Anies", target: "Kiel" },
      { source: "Prabowo", target: "Jokowi" },
      { source: "Budi", target: "Kiel" },
    ];

    svg
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("class", "node")
      .attr("r", 10)
      .on("click",(event,d)=>{
        window.open(d.url,"_blank")
      });

    svg
      .selectAll(".link")
      .data(links)
      .enter()
      .append("line")
      .attr("class", "link")
      .attr("stroke-width", 1)
      .attr("stroke", "black");

    svg.selectAll(".label")
      .data(nodes)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("text-anchor", "middle")
      .attr("dy", -20)
      .attr("fill","black")
      .text((d) => d.id);
    
    simulation.force("link").links(links);

    return () => {
      simulation.stop();
    };
  });
  return <svg ref={svgRef}></svg>;
}
