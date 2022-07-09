
fetch('/blogs').then(res=>res.json()).then(json=>{
    

    for(let item of json.blogs){
        let val = document.querySelector('#blogsdiv tbody').innerHTML

    document.querySelector('#blogsdiv tbody').innerHTML = val+ `<tr><td><a href='${item.url}'>${item.title}</a><td/><td>Edit<td/><td>Delete<td/><tr/>`}
})