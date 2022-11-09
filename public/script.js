// const text = document.querySelector(i)

// text.addEventListener('click', () => {
//   const textarea = document.createElement('textarea')

//   copyToClipboard()
// })

// function copyToClipboard() {
//   const textarea = document.createElement('textarea')
//   textarea.setAttribute('readonly', '');
//   textarea.style.position = 'absolute';
//   textarea.value = text.innerText
//   document.body.appendChild(textarea);
//   textarea.select();
//   document.execCommand("copy");
//   document.body.removeChild(textarea);
// }

function myFunction() {
  var copyText = document.getElementById("myInput");
  copyText.select();
  document.execCommand("copy");
  alert("Copied the text: " + copyText.value);
}

