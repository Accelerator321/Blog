let userSection=document.getElementById('usersection');
var username;
var data = fetch('/user').then(res=>res.json()).then(data=>{
 
    if(data){
        userSection.innerHTML = `<a class="text-light mx-1 text-decoration-none" id="username" href="/signin">${data.username}</a><img id="profilepic" src="${data.avatar}" alt="..." style="height:40px; width:40px; border-radius:50%;"/>`
    }
    let logBtn=document.getElementById('logbtn');
    let profile=document.getElementById('profile');
    if(!data){
        logBtn.style.display = 'none'
        profile.style.display = 'none'
    }

  let signBtn=document.getElementById('signbtn');

    if(data){
       signBtn.style.display = 'none'
    }
})



 

console.log(data)
 

 


//   if(document.cookie){
//     fetch('/user').then(res=>res.json()).then(json=>{
//         if(json){
//             userSection.innerHTML = `<a class="text-light mx-1 text-decoration-none" id="username" href="/signin">${json.username}</a><img id="profilepic" src="${json.avatar}" alt="..." style="height:40px; width:40px; border-radius:50%;"/>`
//         }
//     })
//   }


    

for(let item of document.querySelectorAll('.nav-item a')){
    item.addEventListener('click', ()=>{
        document.getElementsByClassName('active')[0].classList.toggle('active')
        item.classList.toggle('active')
    })
}
function check() {
    

    var user = document.getElementById('checkuser');
    var username = document.getElementById('inputUserName').value;

    if (username.search(/ +/) !== -1){
        user.innerHTML = `<span style="color:red">Please Remove space from username</span>`
    }

    else{
    params = {
        method: 'POST',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
            body: JSON.stringify({'username':username})
            // JSON.stringify(user) 
        }


        if (username ===""){
            user.innerHTML=''
        }
        


const validity = fetch('/usercheck', params).then(response=>response.json()).then(json=>{
    console.log(json);
    if (json ===true) {

        user.innerHTML = `<span style="color:red">Already Exists</span>`
    }
    
    
    else if(json===false){
    
        user.innerHTML = `<span style="color:green">Valid Username</span>`
    }
})

    }

}








