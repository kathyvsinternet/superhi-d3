const monthSvg = d3.select("svg.month")

const radiusScale = d3.scaleSqrt()
	.domain([0, 30000])
	.range([0, 50])

const colorScale = d3.scaleSqrt()
	.domain([1000, 30000])
	.range(["red", "blue"])

const monthGroups = monthSvg
	.selectAll("g")
	.data(monthData)
	.enter()
	.append("g")
	.attr("transform", (d, i) => {
    const x = (i % 7) * 125 + 60
    const y = Math.floor(i / 7) * 150 + 60
    return `translate(${x}, ${y})` // note ` & {}, same as "translate(" + x + ", " + y + ")"
  })

monthGroups
	.append("circle")
	.attr("class", "ring")
	.attr("cx", 0)
	.attr("cy", 0)
	.attr("r", radiusScale(10000))

monthGroups
	.append("circle")
	.attr("class", "ring")
	.attr("cx", 0)
	.attr("cy", 0)
	.attr("r", radiusScale(20000))

// monthSvg
//   .selectAll("circle")
// 	.data(monthData)
// 	.enter()
monthGroups
	.append("circle")
	.attr("class", "actual")
// 	.attr("cx", (d, i)  => { return (i % 7) * 120 + 60 }) // `cx` as remainder of index divided by columnns
// 	.attr("cy", (d, i)  => { return Math.floor(i / 7) * 100 + 60}) // `cy` is index divided by columns with no decimals
	.attr("cx", 0)
	.attr("cy", 0)
	.attr("r", 10) // radius starts at 10 but then transitions to radiusScale
	.transition()
	.duration(250) // milliseconds
	.delay((d, i) => { return i * 100 }) // adds 100ms delay on each circle
	.ease(d3.easeCubicIn) // https://github.com/d3/d3-ease
  .attr("r", (d, i) => { return radiusScale(d) })
// 	.attr("fill", (d, i) => { return colorScale(d) })

monthGroups
  .append("text")
	.attr("class", "day")
	.attr("x", 0)
	.attr("y", 65)
	.text((d, i) => { return i + 1})

monthGroups
  .append("text")
	.attr("class", "steps")
	.attr("x", 0)
	.attr("y", 5)
	.text((d, i) => { return statsFormat(d) })







