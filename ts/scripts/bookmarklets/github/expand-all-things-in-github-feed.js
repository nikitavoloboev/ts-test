// ran from https://github.com/dashboard-feed or https://github.com

var inputs = document.querySelectorAll("svg[aria-label=Expand]")
var buttons = Array.from(inputs).map((e) => e.parentElement.parentElement)
buttons.forEach((b) => b.click())
