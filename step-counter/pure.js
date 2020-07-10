// alert("Hello")

// // change text saying Hello, fools to Hello [someone]
// // pick text box
// const headerTag = document.querySelector("h1")

// // then change text
// headerTag.innerHTML = "Hello someone"

// // then change the HTML tag to a background of red
// headerTag.style.backgroundColor = "var(--primary-orange)" // can pull CSS variables into JS

// // font size goes big, font-size --> fontSize
// headerTag.style.fontSize = "64px"

// pick all  h1 tags on page
// for each tag, give it a background color
const headerTags = document.querySelectorAll("h1")

// // can't do headerTags.innerHTML = "whatever"
// // need to use forEach loop
// headerTags.forEach(h1 => {
//   const hue = 360 * Math.random() // 360 is max for HSL
//   h1.style.backgroundColor = "hsl(" + hue + ", 100%, 50%)" // " + hue + " part adds in this const
// })

// pick each tag and label with number, the index
headerTags.forEach((h1, index) => {
  h1.innerHTML = "this is tag number " + index // (index + 1) to start with 1
})

// select ALL rect tags on the page
// change width of the rects
// const rectTags = document.querySelectorAll("rect")

// data[0] ... 550
// data[1] ... 120
// data[2] ... 732

// rectTags.forEach((tag, i) => {
// //   tag.style = "red"
//   const width = data[i]
//   tag.setAttribute("width", width + "px")
// })

const data = [
  2, 3, 5, 6, 4, 2, 
  5, 20, 24, 32, 40, 50, 
  68, 89, 100, 112, 109, 101,
  78, 56, 32, 31, 12, 1
]

const todaySvg = document.querySelector("svg")

// width bar = 24
// gap between bars = 12
// max height = 112

data.forEach((d, i) => {
  // add a rectangle tag to todaySvg
  const rectTag = document.createElementNS("http://www.w3.org/2000/svg", "rect")
  rectTag.setAttribute("x", i * 36)
  rectTag.setAttribute("y", 112 - d)
  rectTag.setAttribute("width", 24)
  rectTag.setAttribute("height", d)
  
  todaySvg.append(rectTag)
})














