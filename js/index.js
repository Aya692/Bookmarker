var siteName = document.getElementById("bookmarkName");
var siteURL = document.getElementById("bookmarkURL");
var submitBtn = document.getElementById("submitBtn");
var updateBtn = document.getElementById("updateBtn");
var tableContent = document.getElementById("tableContent");
var bookmarks = [];
var indexUpdate = 0;
var urlRegex = /^(https):\/\/[a-zA-Z0-9]{3,}\.com$/
var nameRegex = /^\w{3,}$/i
if (localStorage.getItem("bookmarksList")) {
  bookmarks = JSON.parse(localStorage.getItem("bookmarksList"));
    displayBookmark(bookmarks);
}

// Submit Function
submitBtn.addEventListener("click", function () {
  if (
    siteName.classList.contains("is-valid") &&
    siteURL.classList.contains("is-valid")
  ) {
    var bookmark = {
      siteName: siteName.value,
      siteURL: siteURL.value,
    };
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
    displayBookmark(bookmarks);
    clearInput();
    siteName.classList.remove("is-valid");
    siteURL.classList.remove("is-valid");
    
  }
}
);
// display function
function displayBookmark(arr) {
  var newBookmark = ``
  for (var i = 0;i < arr.length;i++) {
   newBookmark += `
              <tr>
                <td>${arr[i].index?arr[i].index+1:i + 1}</td>
                <td>${arr[i].siteName}</td>              
                <td>
                 
                    
                    <a href="${arr[i].siteURL}" target="_blank" class="btn btn-visit">
                    <i class="fa-solid fa-eye pe-2"></i>
                    Visit</a>
                  
                </td>
                <td>
                  <button class="btn btn-delete pe-2" onclick="deleteBookmark(${arr[i].index?arr[i].index:i})">
                    <i class="fa-solid fa-trash-can"></i>
                    Delete
                  </button>
                </td>
                <td>
                  <button class="btn btn-warning pe-2" onclick="setData(${i})">
                  <i class="fa-solid fa-pen"></i>
                    Update
                  </button>
                </td>
            </tr>
            `;
  }
  tableContent.innerHTML = newBookmark;

}
  

function clearInput() {
  siteName.value = "";
  siteURL.value = "";
}
// =====> Delete Function

function deleteBookmark(index) {
  console.log(index);
  bookmarks.splice(index, 1);
 console.log(bookmarks);
  localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
  // console.log(bookmarks);
  displayBookmark(bookmarks)
}


// search function
function search(term){
    var newArray = []
 for(var i=0;i<bookmarks.length;i++){
    if(bookmarks[i].siteName.toLowerCase().includes(term.toLowerCase())==true){
      bookmarks[i].index=i
      
     newArray.push(bookmarks[i])
    }
 }
 console.log(newArray);
 displayBookmark(newArray)
}



// update functions
function setData(index) {
  indexUpdate = index

  

  siteName.value = bookmarks[index].siteName
  siteURL.value = bookmarks[index].siteURL
  updateBtn.classList.remove("d-none")
  submitBtn.classList.add("d-none")

}


updateBtn.addEventListener('click',function(){
   
  if (
    siteName.classList.contains("is-valid") 
  ) {
    var bookmark = {
      siteName: siteName.value,
      siteURL: siteURL.value,
    };
       
        bookmarks.splice(indexUpdate,1,bookmark)
       localStorage.setItem("bookmarksList", JSON.stringify(bookmarks))
       displayBookmark(bookmarks);
       clearInput()
       siteName.classList.remove("is-valid");
       siteURL.classList.remove("is-valid");
       updateBtn.classList.add("d-none")
      submitBtn.classList.remove("d-none")
    }
  }  
   )
  
// validation

siteName.addEventListener("input", function () {
  validate(siteName, nameRegex);
});

siteURL.addEventListener("input", function () {
  validate(siteURL, urlRegex);
});

function validate(element, regex) {
 var testRegex = regex
 if(testRegex.test(element.value)){
    element.classList.add("is-valid")
    element.classList.remove("is-invalid")
    submitBtn.removeAttribute("data-bs-toggle","modal")
    submitBtn.removeAttribute("data-bs-target","#exampleModal")
    updateBtn.removeAttribute("data-bs-toggle","modal")
    updateBtn.removeAttribute("data-bs-target","#exampleModal")
 }else{
    element.classList.remove("is-valid")
    element.classList.add("is-invalid")
    submitBtn.setAttribute("data-bs-toggle","modal")
    submitBtn.setAttribute("data-bs-target","#exampleModal")
    updateBtn.setAttribute("data-bs-toggle","modal")
    updateBtn.setAttribute("data-bs-target","#exampleModal")

 }
}





