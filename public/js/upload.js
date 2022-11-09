const dropZone = document.querySelector(".drop-zone"); // get the drop zone element and add the dragover event listener
const fileInput = document.querySelector("#fileInput"); // get the file input element and add the change event listener
const browseBtn = document.querySelector("#browseBtn"); // get the browse button and add the click event listener

const bgProgress = document.querySelector(".bg-progress"); // get the background progress element and add the dragover event listener
const progressPercent = document.querySelector("#progressPercent"); // get the progress percent element and add the dragover event listener
const progressContainer = document.querySelector(".progress-container"); // get the progress container element and add the dragover event listener
const progressBar = document.querySelector(".progress-bar");  // get the progress bar element and add the dragover event listener
const status = document.querySelector(".status"); 

const sharingContainer = document.querySelector(".sharing-container"); // get the sharing container and add the click event listener
const copyURLBtn = document.querySelector("#copyURLBtn"); // get the copy button and add the click event listener
const fileURL = document.querySelector("#fileURL"); // get the file URL input element and add the click event listener
const emailForm = document.querySelector("#emailForm"); 

const toast = document.querySelector(".toast"); // get the toast element 

const baseURL = "http://localhost:4400"; // change this to your server url
const uploadURL = `${baseURL}/upload/api/v1`;   // set the upload url
const emailURL = `${baseURL}/api/v1/send`;  

const maxAllowedSize = 100 * 1024 * 1024; //100mb limit


browseBtn.addEventListener("click", () => { 
  fileInput.click();
}); // click on the browse button to open the file input

dropZone.addEventListener("drop", (e) => { // when the user drops a file
  e.preventDefault(); // prevent default behavior
  //   console.log("dropped", e.dataTransfer.files[0].name);
  const files = e.dataTransfer.files; // get the files
  if (files.length === 1) { // if there is only one file
    if (files[0].size < maxAllowedSize) { // if the file is less than 100mb
      fileInput.files = files; // set the files to the file input
      uploadFile(); // upload the file
    } else { // if the file is more than 100mb
      showToast("Max file size is 100MB"); // show the toast
    } 
  } else if (files.length > 1) { // if there are more than one file
    showToast("You can't upload multiple files"); // show the toast
  } 
  dropZone.classList.remove("dragged"); // remove the class
}); 
 
dropZone.addEventListener("dragover", (e) => { // when the user drags over the drop zone
  e.preventDefault(); // prevent default behavior
  dropZone.classList.add("dragged"); // add the class dragged

  // console.log("dropping file");
});

dropZone.addEventListener("dragleave", (e) => { // when the user drags over the drop zone
  dropZone.classList.remove("dragged"); // remove the class dragged

  console.log("drag ended"); 
});

// file input change and uploader
fileInput.addEventListener("change", () => { 
  if (fileInput.files[0].size > maxAllowedSize) { // if the file is more than 100mb
    showToast("Max file size is 100MB"); // show the toast
    fileInput.value = ""; // reset the input 
    return; // stop the function
  }
  uploadFile(); // upload the file
});

// sharing container listenrs
copyURLBtn.addEventListener("click", () => { 
  fileURL.select(); // select the text
  document.execCommand("copy"); // copy the text
  showToast("Copied to clipboard"); 
}); 

fileURL.addEventListener("click", () => { 
  fileURL.select(); 
});

const uploadFile = () => {
  console.log("file added uploading"); 

  files = fileInput.files; // get the files
  const formData = new FormData(); // create a new form data
  formData.append("myFile", files[0]); // append the file to the form data

  //show the uploader
  progressContainer.style.display = "block"; // show the box

  // upload file
  const xhr = new XMLHttpRequest(); // create a new XMLHttpRequest

  // listen for upload progress
  xhr.upload.onprogress = function (event) { 
    // find the percentage of uploaded 
    let percent = Math.round((100 * event.loaded) / event.total);  // calculate the percentage
    progressPercent.innerText = percent; // show the percentage
    const scaleX = `scaleX(${percent / 100})`; // calculate the scaleX 
    bgProgress.style.transform = scaleX; // show the scaleX
    progressBar.style.transform = scaleX; 
  };

  // handle error
  xhr.upload.onerror = function () {  // if there is an error
    showToast(`Error in upload: ${xhr.status}.`);  
    fileInput.value = ""; // reset the input  
  };

  // listen for response which will give the link
  xhr.onreadystatechange = function () {  // if the request is complete
    if (xhr.readyState == XMLHttpRequest.DONE) {  
      onFileUploadSuccess(xhr.responseText); // call the onFileUploadSuccess function
    } 
  };

  xhr.open("POST", uploadURL); // open the request with the POST method
  xhr.send(formData); // send the form data to the server
};

const onFileUploadSuccess = (res) => { // when the file is uploaded successfully 
  fileInput.value = ""; // reset the input 
  status.innerText = "Uploaded"; // show the status 

  // remove the disabled attribute from form btn & make text send
  emailForm[2].removeAttribute("disabled"); // remove the disabled attribute from the form btn
  emailForm[2].innerText = "Copy your link and share it"; // change the text to send 
  progressContainer.style.display = "none"; // hide the box

  const { file: url } = JSON.parse(res); // get the link from the response 
  console.log(url);
  sharingContainer.style.display = "block"; // show the sharing container 
  fileURL.value = url; // set the link to the input 
};

emailForm.addEventListener("submit", (e) => {  // when the form is submitted
  e.preventDefault(); // stop submission

  // disable the button
  emailForm[2].setAttribute("disabled", "true"); // disable the button 
  emailForm[2].innerText = "Sending"; // change the text to sending

  const url = fileURL.value; // get the link from the input 

  const formData = {
    uuid: url.split("/").splice(-1, 1)[0], // get the uuid from the link 
    emailTo: emailForm.elements["to-email"].value, // get the email from the form 
    emailFrom: emailForm.elements["from-email"].value,
  };
  console.log(formData);
  fetch(emailURL, { // send the form data to the server
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        showToast("Email Sent");
        sharingContainer.style.display = "none"; // hide the box
      }
    });
});

let toastTimer;
// the toast function
const showToast = (msg) => {
  clearTimeout(toastTimer);
  toast.innerText = msg;
  toast.classList.add("show");
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
};
