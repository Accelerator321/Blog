var pattern = document.getElementById('pattern');
var patt = 'tip'
pattern.value =patt;
 
// var i = 2;
var p = 2;
var h = 1;
// document.getElementById(('imgbtn')).addEventListener('click', () => {
//     blogContent.innerHTML += `<div class="col-md-12">
//     <label class="form-label">Add Image</label>
//     <input class="form-control" type="file" required="" name="image-${i}"/>
//   </div>`
//     i += 1
//     patt += 'i';
//     document.getElementById('pattern').value = patt;

// })
document.getElementById(('headbtn')).addEventListener('click', () => {
  // let Content = document.getElementById('blogcontent').innerHTML
  let head = document.createElement("div");
  head.innerHTML = `<div class="col-md-12">
  <label class="form-label">Enter Heading</label>
  <input class="form-control" type="text" name="heading" required=""/>
</div>`;
document.getElementById('blogcontent').appendChild(head);
    h += 1
    patt += 'h';
    document.getElementById('pattern').value = patt;

})
document.getElementById(('parabtn')).addEventListener('click', () => {
  let text = document.createElement("div");
    text.innerHTML = `<div class="col-md-12">
    <label class="form-label">Enter Text</label>
    <textarea class="form-control" rows="10" required="" name="text"></textarea>
  </div>`;
  document.getElementById('blogcontent').appendChild(text);
    p += 1
    patt += 'p';
    document.getElementById('pattern').value = patt;

})






