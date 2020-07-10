const svg = d3.select("svg")

svg
	.attr("width", 800)
	.attr("height", data.length * 150)

// -10 is 14, 0 is 32, 7 is 45, 14 is 58, 21 is 70, 24 is 77
const colorScale = d3.scaleLinear()
	.domain([-10, 0, 7, 14, 21, 24]) // 7 is midpoint
	.range(["#814ee7", "#3f24ec", "#79e87C", "#fbe157", "#ff9737", "#fe3b3b"])

const boxScale = d3.scaleLinear()
	.domain([-20, 45])
	.range([150, 0])

const unitScale = d3.scaleLinear()
	.domain([0, 100])
	.rangeRound([32, 212]) // rounds numbers

const lineGenerator = d3.line() // https://github.com/d3/d3-shape#lines
	.x((d, i) => { return (i * 50) + 225 })
	.y((d, i) => { return boxScale(d) })

const dataPoints = svg
	.selectAll("g.data-point") // any group with label of data-point
	.data(data) // function.(source)
	.enter()
	.append("g")
	.attr("class", "data-point")
	.attr("transform", (d, i) => { return `translate(0, ${i * 150})` })

dataPoints
	.append("text")
	.attr("class", "city")
	.attr("x", 175)
	.attr("y", 70)
	.text((d, i) => { return d.city })

dataPoints
	.append("text")
	.attr("class", "country")
	.attr("x", 175)
	.attr("y", 100)
	.text((d, i) => { return d.country })

const months = dataPoints
	.append("g")
	.attr("class", "months")
	.attr("transform", `translate(200, 0)`)

const monthGroups = months
	.selectAll("g.month")
	.data((d, i) => { return d.months }) // for each individual group, only use each month item
	.enter()
	.append("g")
	.attr("class", "month")
	.attr("transform", (d, i) => {  return `translate(${i * 50}, 0)` })

monthGroups
	.append("rect")
	.attr("x", 0)
	.attr("y", 0)
	.attr("width", 50)
	.attr("height", 150)
	.style("fill", (d, i) => { return colorScale(d) })

monthGroups
  .append("circle")
	.attr("cx", 25)
	.attr("cy", (d, i) => { return boxScale(d) }) // moves circle up and down bars
	.attr("r", 15)

const temperatures = monthGroups
	.append("text")
	.attr("class", "temp")
	.attr("x", 25)
	.attr("y", (d, i) => { return boxScale(d) + 2 }) // moves text up and down bars
	.text((d, i) => { return d })
	.style("fill", (d, i) => { return colorScale(d) }) // using same bar fill color for text fill color

dataPoints
	.append("path")
	.datum((d, i) => { return d.months }) // select one of data
	.attr("d", (d, i) => { return lineGenerator(d) })

const selectTag = document.querySelector("select")
selectTag.addEventListener("input", function () {
  if (this.value === "c") {
    temperatures.text((d, i) => { return d })
  } else {
    temperatures.text((d, i) => { return unitScale(d) })
  }
})











