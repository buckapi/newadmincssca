"use strict";
// quill
if (document.querySelectorAll("#editor").length) {
  console.log(typeof Quill)
  if(typeof Quill !== typeof undefined) {
    const quill = new Quill('#editor', {
      theme: 'snow'
    });
  }
}
