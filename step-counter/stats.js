// https://github.com/d3/d3-array for calculations
// https://github.com/d3/d3-format for number formatting

const statsFormat = d3.format(",.0f")

d3.select("p.worst-day").text(statsFormat(d3.min(monthData)) + " steps")
d3.select("p.average-day").text(statsFormat(d3.mean(monthData)) + " steps")
d3.select("p.best-day").text(statsFormat(d3.max(monthData)) + " steps")
d3.select("p.biggest-difference").text(statsFormat(d3.max(monthData) - d3.min(monthData)) + " steps")
d3.select("p.total-28").text(statsFormat(d3.sum(monthData)) + " steps")
d3.select("p.total-today").text(statsFormat(d3.sum(todayData)) + " steps")