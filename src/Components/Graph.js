import React, { Fragment, useEffect, useRef, useState } from "react";
import * as d3 from "d3";

export default function Graph({ firstTitle, lastTitle, isBFS }) {
  const svgRef = useRef(null);
  const [timeTaken, setTimeTaken] = useState(0);
  const [results, setResults] = useState([]);
  const [hops, setHops] = useState(0);
  const [pageChecked, setPageChecked] = useState(0);
  console.log(results);
  useEffect(() => {
    if (firstTitle !== "") {
      const url = isBFS
        ? `http://localhost:8080/bfs?source=${firstTitle}&target=${lastTitle}`
        : `http://localhost:8080/ids?source=${firstTitle}&target=${lastTitle}`;
      console.log(url);
      try {
        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setResults(data.results);
            setTimeTaken(data.timeTakken);
            setHops(data.hops);
            setPageChecked(data.pageChecked);
          });
      } catch (error) {
        console.log(error);
      }
    }
    console.log("kontol");
  }, [firstTitle, lastTitle, isBFS]);

  const setGraph = () => {
    d3.select(svgRef.current).selectAll("*").remove();
    const nodes = results.map((item) => {
      const title = item.slice(6);
      return {
        id: title.replace(new RegExp("_", "g"), " "),
        url: `https://en.wikipedia.org${item}`,
      };
    });

    let width;
    const height = 300;
    if (svgRef.current !== null) {
      width = svgRef.current.parentElement.clientWidth;
    } else {
      width = 600;
    }

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
        d3
          .forceLink()
          .id((d) => d.id)
          .distance(200)
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

        svg
          .selectAll(".label")
          .attr("x", (d) => d.x)
          .attr("y", (d) => d.y)
          .text((d) => d.id);
      });

    const links = [];
    for (let i = 0; i < nodes.length - 1; i++) {
      links.push({
        source: nodes[i].id,
        target: nodes[i + 1].id,
        direction: "forward",
      });
    }

    svg
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("class", "node")
      .attr("r", 15)
      .on("click", (event, d) => {
        window.open(d.url, "_blank");
      });
    svg
      .selectAll(".label")
      .data(nodes)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("text-anchor", "middle")
      .attr("dy", -30)
      .attr("fill", "black")
      .text((d) => d.id);

    svg
      .append("defs")
      .append("marker")
      .attr("id", "arrowhead")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 16)
      .attr("refY", 0)
      .attr("orient", "auto")
      .attr("markerWidth", 15)
      .attr("markerHeight", 15)
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "black");

    svg
      .selectAll(".link")
      .data(links)
      .enter()
      .append("line")
      .attr("class", "link")
      .attr("stroke-width", 1)
      .attr("stroke", "black")
      .attr("marker-end", "url(#arrowhead)");

    simulation.force("link").links(links);
  };

  return (
    <div className="flex flex-col items-center mt-5">
      {setGraph()}
      {results.length!==0 && 
        <div className="font-bold mb-5">
          <h3>Found a path with {hops} degrees of separation</h3>
          <h3>from <span>{firstTitle.replace(new RegExp("_", "g"), " ")}</span> to {lastTitle.replace(new RegExp("_", "g"), " ")} in {timeTaken/1000} seconds</h3>
        </div>
      }
      <svg ref={svgRef}></svg>
    </div>
  );
}
