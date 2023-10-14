import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

var arr = [];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve,ms));
}

async function updateArray() {
  let value = Number(d3.select(".herosection").select(".inputs").select(".numberinput").property("value"));
  arr.push(value);

  updateVisuals();
}

async function bubbleSort() {
  for(let i=0; i<arr.length; i++) {
    for(let j=0; j<arr.length-1; j++) {
      if(arr[j]>arr[j+1]) {
	let temp = arr[j];
	arr[j] = arr[j+1];
	arr[j+1] = temp;

	await updateVisuals(j,j+1);
      }
    }
  }

  resetVisuals();
}

function resetVisuals() {
  let divs = d3.select(".herosection").select(".visualization").selectAll("div").data(arr);

  divs.join("div")
      .attr("class","value")
      .html(d => `<p>${d}</p>`)
      .transition()
      .duration(2000)
      .style("background", (d,i) => {
	return "#F76C6C";
      });
}

async function updateVisuals(i1,i2) {
  let divs = d3.select(".herosection").select(".visualization").selectAll("div").data(arr);

  divs.join("div")
      .attr("class","value")
      .html(d => `<p>${d}</p>`)
      .transition()
      .duration(2000)
      .style("width", d => `${10*d+40}px`)
      .style("height", d => `${10*d+40}px`)
      .style("background", (d,i) => {
	if(i==i1 || i==i2) {
	  return "#4CB5F5";
	}
	else return "#F76C6C";
      });

  await sleep(2500);
}

d3.select(".herosection").select(".inputs").select(".inputbutton").on("click", () => updateArray());
d3.select(".herosection").select(".inputs").select(".sortbutton").on("click", () => bubbleSort());
