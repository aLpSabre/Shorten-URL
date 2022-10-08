# Frontend Mentor - Shortly URL shortening API Challenge solution

This is a solution to the [Shortly URL shortening API Challenge challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/url-shortening-api-landing-page-2ce3ob-G). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)



### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- Shorten any valid URL
- See a list of their shortened links, even after refreshing the browser
- Copy the shortened link to their clipboard in a single click
- Receive an error message when the `form` is submitted if:
  - The `input` field is empty

--I also added this functionalities: 

Users should be able to:

- Not search for a link, if it's already been shown on the page
- Receive an error message when the `form` is submitted if:
  - The `input` is unvalid
  - The `input` is already searched

### Screenshot

-💻 Desktop-View
![](./gifs/desktop.gif)

-📱 Mobile-View
![](./gifs/mobile.gif)

### Links

- Solution URL: [Click here](https://github.com/aLpSabre/Shorten-URL)
- Live Site URL: [Click here](https://alpsabre.github.io/Shorten-URL/)

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Bootstrap
- Flexbox
- Mobile-first workflow
- JavaScript-DOM 
0
### What I learned

I learned how to copy text from an input:

```js
let copyText = e.target.previousElementSibling
    navigator.clipboard.writeText(copyText.value);
```
-how to add an stlysheet and add to html and change the color of placeholder,because it is not possible to get that directly with JS:

```js
const style = document.createElement("style")
style.type = "text/css"
const {
  sheet
} = document.head.appendChild(style)

const rule = sheet.insertRule("::placeholder {}")
const placeholderStyle = sheet.rules[rule].style;
 placeholderStyle.color = "#dc3545";
```
-how to use  pseudo-class "not" with "hover":

```css
.nav-link:hover:not(.sign-up-button) {
  color: var(--darkViolet) !important;
}
```

### Useful resources
- This resources helped me to:

- [Shorco Api](https://shrtco.de/) -  shorten the links.

- [Thewebdev.info](https://thewebdev.info/2022/01/15/how-to-update-placeholder-color-using-javascript/) - update placeholder color using JavaScript.

- [W3Schools](https://www.w3schools.com/howto/howto_js_copy_clipboard.asp) - copy clipboard in JS.


## Author

- Frontend Mentor - [@alpbrace](https://www.frontendmentor.io/profile/alpbrace)

