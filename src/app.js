const features = document.getElementById("features");
const errorMsg = document.getElementById("errorMsg")
const linkInput = document.getElementById("linkInput")
const shortenBtn = document.querySelector(".shorten-btn");

const style = document.createElement("style")
style.type = "text/css"
const {
  sheet
} = document.head.appendChild(style)

const rule = sheet.insertRule("::placeholder {}")
const placeholderStyle = sheet.rules[rule].style;

let links = JSON.parse(localStorage.getItem("LINKS")) || [];
let searchedLinks = JSON.parse(localStorage.getItem("SEARCHED_LINKS")) || [];
function renderLinks(links) {


  links.forEach(element => {
    features.innerHTML = ` 
  <div
  class="container results d-flex justify-content-between align-items-center p-4 bg-white rounded-4 mb-3 flex-nowrap"
  >
  <input type="text" value="${element.original_link}" readonly></input>
  
  <div class="result-right">
    <input type="text" class="result me-3" value="${element.short_link}" readonly></input>
    <button class="copied get-started-button" >Copy</button>
  </div>
  <i class="fa fa-times" aria-hidden="true"></i>
  </div>`+ features.innerHTML

  });


}
renderLinks(links);
const getShorten = async function (link) {
  try {
    let response = await fetch(`https://api.shrtco.de/v2/shorten?url=${link}`);
    if (!response.ok) {
      renderError("url");
      throw new Error("Response is not ok")
    }
    let data = await response.json();
    renderData(data);
  }
  catch (error) {
    console.log(error);
  }
}

const renderError = (type) => {

  if (type == "url") {
    errorMsg.innerText = "Please enter an valid URL"
  }else if (type == "empty") {
    errorMsg.innerText = "Please enter an  URL"
  }else if (type == "searched") {
    errorMsg.innerText = "You have already shorten that URL"
  }
  linkInput.focus();
  linkInput.style.border = "2px solid #dc3545"

  placeholderStyle.color = "#dc3545";
  setTimeout(() => {
    linkInput.style.border = "none"
    placeholderStyle.color = "var(--grayishViolet)";
    errorMsg.innerText = ""
  }, 4000)
}

const renderData = (data) => {

  let { ok, result: { short_link, original_link, full_short_link } } = data;
  console.log(ok, "ok");

  if (ok && searchedLinks.indexOf(short_link) == -1) {
    let newLink = { short_link: short_link, original_link: original_link }
    links.push(newLink);
    localStorage.setItem("LINKS", JSON.stringify(links));

    searchedLinks.push(short_link);
    localStorage.setItem("SEARCHED_LINKS", JSON.stringify(searchedLinks));

    features.innerHTML = ` 
    <div
    class="container results d-flex justify-content-between align-items-center p-4 bg-white rounded-4 mb-3 flex-nowrap"
    >
    <input type="text" value="${original_link}" readonly></input>
    
    <div class="result-right">
      <input type="text" class="result me-3" value="${short_link}" readonly></input>
      <button class="copied get-started-button"  >Copy</button>
    </div>
    <i class="fa fa-times" aria-hidden="true"></i>
    </div>`+ features.innerHTML
    return;
  }

  renderError("searched");

}

shortenBtn.addEventListener("click", () => {
  if (linkInput.value.length < 1) {
    renderError("empty");
    return;
  }
  getShorten(linkInput.value)
  linkInput.value = "";
  errorMsg.innerText = "";
})


features.addEventListener("click", (e) => {
  console.log(e.target.classList.contains("copied"));
  if (e.target.classList.contains("copied")) {

    let copyText = e.target.previousElementSibling
    navigator.clipboard.writeText(copyText.value);
    e.target.innerText = "Copied"
    e.target.style.backgroundColor = "var(--darkViolet)";

    setTimeout(() => {
      e.target.innerText = "Copy"
      e.target.style.backgroundColor = "var(--cyan)";
    }, 4000)

  } else if (e.target.classList.contains("fa-times")) {

    e.target.parentElement.remove();

    links = links.filter(element => element.short_link !== e.target.parentElement.querySelector(".result").value)
    localStorage.setItem("LINKS", JSON.stringify(links));
 
    searchedLinks.splice(searchedLinks.indexOf(e.target.parentElement.querySelector(".result").value),1);
    localStorage.setItem("SEARCHED_LINKS", JSON.stringify(searchedLinks));
  }
})
