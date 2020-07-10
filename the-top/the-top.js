const svg = d3.select("svg")

data = data.map((d, i) => {
  d.difference = d.imdb - d.metascore
  return d
})

svg
  .attr("height", 40 * data.length)
	.attr("width", "100%")

const scoreScale = d3.scaleLinear()
	.domain([0, 100])
	.range([420, 900])

const area = d3.area() // https://github.com/d3/d3-shape#areas
	.x0((d, i) => { return scoreScale(d.imdb) })
	.x1((d, i) => { return scoreScale(d.metascore) })
	.y0((d, i) => { return 40 * i + 20 })
	.y1((d, i) => { return 40 * i + 20 })

const areaPath = svg
	.append("path")
	.datum(data)
	.attr("d", area)
	.attr("class", "area")

const imdbLine = d3.line()
	.x((d, i) => { return scoreScale(d.imdb) })
	.y((d, i) => { return 40 * i + 20 })
// 	.curve(d3.curveCardinal.tension(0.5))

const imdbPath = svg
	.append("path")
	.datum(data)
	.attr("d", imdbLine)
	.attr("class", "imdb")

const metascoreLine = d3.line()
	.x((d, i) => { return scoreScale(d.metascore) })
	.y((d, i) => { return 40 * i + 20 })
// 	.curve(d3.curveCardinal.tension(0.5))

const metascorePath = svg
	.append("path")
	.datum(data)
	.attr("d", metascoreLine)
	.attr("class", "metascore")

const groups = svg
	.selectAll("g.movie")
	.data(data)
	.enter()
	.append("g")
	.attr("class", "movie")
	.attr("transform", (d, i) => { return `translate(0, ${i * 40})` })

groups
	.append("rect")
	.attr("x", 0)
	.attr("y", 0)
	.attr("height", 40)
	.attr("width", 960)
	.attr("class", "background")

groups
	.append("text")
	.attr("x", 90)
	.attr("y", 20)
	.attr("class", "title")
	.text((d, i) => { return d.title })

groups
	.append("text")
	.attr("x", 24)
	.attr("y", 20)
	.attr("class", "year")
	.text((d, i) => { return d.year })

groups
	.append("circle")
	.attr("cx", (d, i) => { return scoreScale(d.imdb) })
	.attr("cy", 20)
	.attr("r", 8)
	.attr("class", "imdb")

groups
	.append("circle")
	.attr("cx", (d, i) => { return scoreScale(d.metascore) })
	.attr("cy", 20)
	.attr("r", 8)
	.attr("class", "metascore")

groups
	.append("text")
	.attr("class", "imdb")
	.attr("x", (d, i) => { 
  	if (d.difference > 0) { // positions number on one side of circle or other
      return scoreScale(d.imdb) + 15
    } else {
      return scoreScale(d.imdb) - 15
    }
	})
	.attr("y", 20)
	.text((d, i) => { return d.imdb })
	.style("text-anchor", (d, i) => {
  	if (d.difference > 0) { // changes how tech is anchored based on positive / negative
      return "start"
    } else {
      return "end"
    }
	})

groups
	.append("text")
	.attr("class", "metascore")
	.attr("x", (d, i) => { 
  	if (d.difference > 0) { // positions number on one side of circle or other, but opposite of imdb
      return scoreScale(d.metascore) - 15
    } else {
      return scoreScale(d.metascore) + 15
    }
	})
	.attr("y", 20)
	.text((d, i) => { return d.metascore })
	.style("text-anchor", (d, i) => {
  	if (d.difference < 0) { // changes how tech is anchored based on positive / negative, also opposite of imdb
      return "start"
    } else {
      return "end"
    }
	})

const selectTag = document.querySelector("select") // picks first select tag on page

selectTag.addEventListener("change", function () {
  data.sort((a, b) => { // compare before and after and then do this
    if (this.value == "imdb") {
      return d3.descending(a.imdb, b.imdb)
    } else if (this.value == 'metascore') {
      return d3.descending(a.metascore, b.metascore)
    } else if (this.value == "title") {
      return d3.ascending(a.title, b.title)
    } else if (this.value == "year") {
      return d3.ascending(a.year, b.year)
    } else {
      return d3.ascending(a.difference, b.difference)
    }
  }) // this function sorts behind the scenes but doesn't change anything yet
  
  groups // here is where we change the data
  	.data(data, (d, i) => { return d.title })
  	.transition()
		.duration(1000)
  	.attr("transform", (d, i) => { return `translate(0, ${i * 40})` })
  
  imdbPath
  	.datum(data, (d, i) => { return d.title })
  	.transition()
  	.duration(1000)
  	.attr("d", imdbLine) // change new D to imdbLine

 metascorePath
  	.datum(data, (d, i) => { return d.title })
  	.transition()
  	.duration(1000)
  	.attr("d", metascoreLine) // change new D to metascoreLine
  
   areaPath
  	.datum(data, (d, i) => { return d.title })
  	.transition()
  	.duration(1000)
  	.attr("d", area) // change new D to area
})

const resize = function () {
  const svgTag = document.querySelector("svg")
  const svgWidth = svgTag.clientWidth
  
  scoreScale
  	.range([420 / 960 * svgWidth, 900 / 960 * svgWidth ])
  
  groups
    .selectAll("circle.metascore")
  	.attr("cx", (d, i) => { return scoreScale(d.metascore) })
  
  groups
    .selectAll("circle.imdb")
  	.attr("cx", (d, i) => { return scoreScale(d.imdb) })
  
  groups
  	.selectAll("text.title")
  	.attr("x", (svgWidth >= 960) ? 90 : 70) // if svg >= 960 then set 90, otherwise, set 70

  area
	.x0((d, i) => { return scoreScale(d.imdb) })
	.x1((d, i) => { return scoreScale(d.metascore) })

  areaPath
	  .attr("d", area)
  
  imdbLine
  	.x((d, i) => { return scoreScale(d.imdb) })
  
  imdbPath
  	.attr("d", imdbLine)

  metascoreLine
  	.x((d, i) => { return scoreScale(d.metascore) })
  
  metascorePath
  	.attr("d", metascoreLine)
  
}

// run resize on page load and if page width changes
resize()

window.addEventListener("resize", function () {
  resize()
})











