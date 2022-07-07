var pattern = 'tip'
document.getElementById('imgbtn').addEventListener('click', ()=>{
    let blogValue = document.getElementById('blogcontent').innerHTML

    document.getElementById('blogcontent').innerHTML = blogValue + `<div class="col-md-12"><label class="form-label" >Add Image</label><input class="form-control"  type="file"/></div>`
    pattern += 'i'
})


document.getElementById('textbtn').addEventListener('click', ()=>{
    let blogValue = document.getElementById('blogcontent').innerHTML

    document.getElementById('blogcontent').innerHTML = blogValue + `<div class="col-md-12"><label class="form-label" >Enter Text</label><textarea class="form-control" rows="10"></textarea></div>`;
    pattern += 'p'
})
document.getElementById('headbtn').addEventListener('click', ()=>{
    let blogValue = document.getElementById('blogcontent').innerHTML

    document.getElementById('blogcontent').innerHTML = blogValue + `<div class="col-md-12"><label class="form-label" >Enter Heading</label><input class="form-control"  type="text"></input></div>`;
    pattern += 'h'
})
