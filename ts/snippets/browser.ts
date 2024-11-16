// @ts-nocheck
// can put in browser, then links being hovered over will be logged to console
document.addEventListener("mouseover", (event) => {
  if (event.target.tagName === "A") {
    console.log(event.target.href)
  }
})
