import { micromark } from "micromark"

// html > markdown
// markdown > html

// split by <p>
// const editorHtml = `<p>[This](http://www.catb.org/esr/faqs/smart-questions.html) has everything in it on how to ask questions correctly.</p><p></p><p>In short, it can be summed down to this:</p><p></p><p>1. Do your own research first.</p><p>2. Include things you have tried and thought of before asking the question.</p><p>3. Be explicit about what you want to achieve in the end and provide as much information as possible to help.</p><p>4. Respect other people's time.</p><p></p><p>[XY problem](http://xyproblem.info) is also something to be aware of. When asking for help, let the people know what the problem you are trying to solve actually is instead of simply saying your solution and the reader guessing what it is you are actually trying to do.</p>`

// const convertedHtml = editorHtml.replace(
//   /\[(.*?)\]\((.*?)\)/g,
//   '<a href="$2">$1</a>'
// )
