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
  let divs = d3.select(".herosection").select(".visualization").selectAll("div").data(arr); divs.join("div") .attr("class","value")
      .html(d => `<p>${d}</p>`)
      .transition()
      .duration(2000)
      .style("width", d => `${5*d+40}px`)
      .style("height", d => `${5*d+40}px`)
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

async function graphArray() {

  const width = 660;
  const height = 400;
  const marginTop = 20;
  const marginRight = 20;
  const marginBottom = 20;
  const marginLeft = 35;

  const x = d3.scaleLinear().domain([0,100]).range([marginLeft, width-marginRight]);
  const y = d3.scaleLinear([0,3000],[height-marginBottom,marginTop]);

  const svg = d3.select(".herosection .rightSide").append("svg");
  svg.attr("width",width).attr("height",height);

  svg.append("g").attr("transform",`translate(0,${height - marginBottom})`).call(d3.axisBottom(x)).call(g => g.append("text").attr("fill","black").attr("x",width-marginRight-10).attr("y",marginBottom-25).attr("style", "font-size:10px").text("Input Size"));
  svg.append("g").attr("transform",`translate(${marginLeft},0)`).call(d3.axisLeft(y)).append("text").attr("fill","black").attr("x",marginLeft+100).attr("y",marginTop-10).text("Number of elements interchanged");

  let arrv = [];
  for(let i = 0; i<=100; i++) {
    arrv.push(bubbles(generateRandomArray(i)))
  }

  function generateRandomArray(n) {
    if (n < 1) {
      return [];
    }

    // Create an array containing numbers from 1 to n
    const numbers = Array.from({ length: n }, (_, i) => i + 1);

    // Shuffle the array
    for (let i = n - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    return numbers;
  }

  function bubbles(n) {
    let nn = 0;
    for(let i = 0; i<n.length; i++) {
      for(let j = 0; j<n.length-1-i; j++) {
	if(n[j]>n[j+1]) {
	  let temp = n[j];
	  n[j] = n[j+1]
	  n[j+1] = temp;
	  nn++;
	}
      }
    }
    return nn;
  }

  const line = d3.line()
		.curve(d3.curveCatmullRom.alpha(0.5))
		.x((d,i) => x(i))
		.y((d,i) => y(d));

  const l = line(arrv).length;

  svg.append("path")
    .datum(arrv)
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", "2.5")
    .attr("stroke-dasharray",`0,${l}`)
    .attr("d", line)
    .transition()
      .duration(10000)
      .attr("stroke-dasharray",`${l},0`);

  svg.selectAll("circle")
    .data(arrv)
    .join("circle")
    .attr("fill", "white")
    .attr("stroke", "black")
    .attr("r", 3)
    .transition()
    .delay(5000)
    .duration(1000)
    .attr("cx", (d,i) => x(i))
    .attr("cy", (d,i) => y(arrv[i]));

  await sleep(10000);
}

async function graphLoop() {
  while(true) {
    console.log("5");
    await graphArray();
    d3.select(".herosection").select("svg").remove();
  }
}

graphLoop();
