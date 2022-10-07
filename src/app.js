const features = document.getElementById("features");
const errorMsg=document.getElementById("errorMsg")
const linkInput=document.getElementById("linkInput")
const shortenBtn=document.querySelector(".shorten-btn");
const getShorten = async function (link) {
  try{
    let response = await fetch(`https://api.shrtco.de/v2/shorten?url=${link}`);
    if(!response.ok){
     renderError();
      throw new Error("Response is not ok")
    }
    let data = await response.json();
    renderData(data);
  }
 catch (error){
  console.log(error);
 }
}

const renderError=()=>{

  errorMsg.innerText="Please enter an valid URL"
}

const renderData=(data) =>{

let {ok,result:{short_link,original_link,full_short_link}}=data;
console.log(ok);
console.log(short_link);

features.innerHTML=` 
<div
class="container results d-flex justify-content-between align-items-center p-4 bg-white rounded-4 mb-3 flex-nowrap"
>
<input type="text" value="${original_link}" readonly></input>

<div class="result-right">
  <input type="text" class="result me-3" value="${short_link}" readonly></input>
  <button class="copied get-started-button"  >Copy</button>
</div>
<i class="fa fa-times" aria-hidden="true"></i>
</div>`+features.innerHTML 
}

shortenBtn.addEventListener("click",()=>{
  if(linkInput.value.length<1){
    errorMsg.innerText="Please enter an URL"
    return;
  }
  getShorten(linkInput.value)
  linkInput.value="";
  errorMsg.innerText="";
})


features.addEventListener("click",(e)=>{
  console.log(e.target.classList.contains("copied"));
  if(e.target.classList.contains("copied")){
   
     let copyText=  e.target.previousElementSibling
     navigator.clipboard.writeText(copyText.value);
     e.target.innerText="Copied"
     e.target.style.backgroundColor="var(--darkViolet)";
    setTimeout(()=>{
      e.target.innerText="Copy"
      e.target.style.backgroundColor="var(--cyan)";
    },4000)
  }else if(e.target.classList.contains("fa-times")){
    e.target.parentElement.remove();
  }
})
