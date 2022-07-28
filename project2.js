
fetch('/user/blogs').then(res=>res.json()).then(json=>{
    


    for(let item of json.blogs.reverse()){
        let val = document.querySelector('#blogsdiv tbody').innerHTML

    document.querySelector('#blogsdiv tbody').innerHTML = val+ `<tr><td><a href='/getblogs?getid=${item.getid}'>${item.title}</a></td><td>Edit</td><td><a  onclick="deletePost('${item.getid}')"  style="cursor:pointer;" class='delete'>Delete</a><td/></tr>`}
})

const deletePost = (getid)=>{
    var conf = confirm("Creat this Blog");
  console.log(conf);

  if(!conf){
    return
}
    else{
        console.log("else")
    params = { 
        method: 'DELETE',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
            body: JSON.stringify({getid})
        }
    fetch('/user/deleteblog',params).then().then(()=>{location.reload()})}
}



    
  
