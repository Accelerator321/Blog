var pattern = document.getElementById('pattern');
var patt = 'tip'
pattern.value =patt;
var i =2;
var p =2;
var h=1;

document.getElementById(('imgbtn')).addEventListener('click', () => {
  let img = document.createElement("div");
    img.innerHTML += `<div class="col-md-12">
    <label class="form-label">Add Image</label>
    <button type="button" id="closeBtn"class="close" onclick="erase(event)"data-dismiss="alert" aria-label="Close">&times
  </button>
    <input class="form-control" id="i-${i}" type="file" required="" name="image"/>
  </div>`
    
    patt += `i-${i}`;
    i += 1
    document.getElementById('pattern').value = patt;
    document.getElementById('newblogdiv').appendChild(img);

})
document.getElementById(('headbtn')).addEventListener('click', () => {

  let head = document.createElement("div");
  head.innerHTML = `<div class="col-md-12">
  <label class="form-label">Enter Heading</label>
  <button type="button" id="closeBtn"class="close" onclick="erase(event)"data-dismiss="alert" aria-label="Close">&times
  </button>
  <input class="form-control" type="text" id="h-${h}" name="heading" required=""/>
</div>`;
document.getElementById('newblogdiv').appendChild(head);
    
    patt += `h-${h}`;
    h += 1;
    document.getElementById('pattern').value = patt;

})
document.getElementById(('parabtn')).addEventListener('click', () => {
  let text = document.createElement("div");
    text.innerHTML = `<div class="col-md-12">
    <label class="form-label">Enter Text</label>
    <button type="button" id="closeBtn"class="close" onclick="erase(event)"data-dismiss="alert" aria-label="Close">&times
  </button>
    <textarea class="form-control" rows="10" id="p-${p}" required="" name="text"></textarea>
  </div>`;
  document.getElementById('newblogdiv').appendChild(text);
    patt += `p-${p}`;
    p += 1;
    document.getElementById('pattern').value = patt;

})

function erase(event){
  
 
    var element = event.target.parentElement;
    console.log(element);
   
    element.style.display ="none";
    console.log(document.getElementById('pattern').value,patt)
    console.log(`${event.target.nextElementSibling.id}`)
    document.getElementById('pattern').value = patt.replace(`${event.target.nextElementSibling.id}`,'')
    console.log(document.getElementById('pattern').value)

}


document.getElementById("creatbtn").addEventListener('click',(e)=>{
  

  var conf = confirm("Creat this Blog");
  console.log(conf)

  if(conf){
  dispatchEvent(e);
}

  else{
    e.preventDefault();
  }



})








