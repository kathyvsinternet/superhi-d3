// const todayData = [
//   200, 30, 50, 6, 4, 2,
//   5, 20, 24, 32, 40, 59,
//   68, 89, 100, 112, 109, 101,
//   78, 56, 32, 31, 12, 1, 200
// ]

const todaySvg = d3.select("svg.today") // `class` type

const barScale = d3.scaleLinear()
	.domain([0, 2000])
	.range([1, 112])

const hourFormat = d3.format("02")

const todayGroups = todaySvg
	.selectAll("g")
	.data(todayData)
	.enter()
	.append("g")
	.attr("transform", (d, i) => { return "translate(" + (i * 36) + ", 0)"})

todayGroups // these bars are invisible so that hovering is smoother
	.append("rect")
	.attr("class", "transparent")
	.attr("x", 0)
	.attr("y", 0)
	.attr("width", 24)
	.attr("height", 140)

// todaySvg // rectangles
//   .selectAll("rect")
// 	 .data(todayData)
//   .enter()
todayGroups // these bars are the actual data
  .append("rect")
	.attr("class", "bars")
	.attr("x", 0) //, (d, i) => { return i * 36 })
	.attr("y", (d, i) => { return 120 })
	.attr("width", 24)
	.attr("height", 0)
	.transition()
	.delay((d, i) => { return i * 20 }) // adds 20ms delay on each bar
	.attr("y", (d, i) => { return 120 - barScale(d) })
  .attr("height", (d, i) => { return barScale(d) })

// todaySvg // text tags
// 	.selectAll("text")
// 	.data(todayData)
// 	.enter()
todayGroups
	.append("text")
	.attr("class", "hours")
	.attr("x", 12) //, (d, i) => { return i * 36 + 12 })
	.attr("y", 140)
	.text((d, i) => { return hourFormat(i)})

todayGroups
	.append("text")
	.attr("class", "steps")
	.attr("x", 12)
	.attr("y", (d, i) => { return 110 - barScale(d) }) // 110 = 120 - 10
	.text((d, i) => { return statsFormat(d) })


