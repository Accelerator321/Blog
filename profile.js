
fetch(`/user/blogs?username=${document.getElementById('username').innerHTML.split(':')[1].trim()}`).then(res=>res.json()).then(json=>{
    console.log(json)
    

    for(let item of json.blogs){
        let val = document.querySelector('#blogsdiv tbody').innerHTML

    document.querySelector('#blogsdiv tbody').innerHTML = val+ `<tr><td><a href='/getblogs?getid=${item.getid}'>${item.title}</a></td>`
}
})

