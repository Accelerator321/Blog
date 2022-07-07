
fetch('/blogs').then(res=>res.json()).then(json=>{
    console.log(json)
    

    for(let item of json.blogs){
        console.log(json)
        let val = document.querySelector('#blogsdiv tbody').innerHTML
    console.log(item)
    console.log(item.title)
    document.querySelector('#blogsdiv tbody').innerHTML = val+ `<tr><td><a href='${item.url}'>${item.title}</a><td/><td>Edit<td/><td>Delete<td/><tr/>`}
})