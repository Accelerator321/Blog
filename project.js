let userSection=document.getElementById('usersection');
var username;
var data = fetch('/user').then(res=>res.json()).then(data=>{
 
    if(data){
        userSection.innerHTML = `<a class="text-light mx-1 text-decoration-none" id="username" href="/user/signin">${data.username}</a><img id="profilepic" src="${data.avatar}" alt="..." style="height:40px; width:40px; border-radius:50%;"/>`
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



    

for(let item of document.querySelectorAll('.nav-item a')){
    item.addEventListener('click', ()=>{
        document.getElementsByClassName('active')[0].classList.toggle('active')
        item.classList.toggle('active')
    })
}
function check() {
    

    var user = document.getElementById('checkuser');
    var username = document.getElementById('inputUserName').value;

    if(username ===""){
        user.innerHTML = ``
        return
    }


    if (username.search(/ +/) !== -1){
        user.innerHTML = `<span style="color:red">Please Remove space from username</span>`
        document.getElementById("signupbtn").disabled = true;
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

    if (json ===true) {

        user.innerHTML = `<span style="color:red">Username Not Available</span>`
        document.getElementById("signupbtn").disabled = true;
    }
    
    
    else if(json===false){
    
        user.innerHTML = `<span style="color:green">Available</span>`
        document.getElementById("signupbtn").disabled = false;
    }
})

    }

}

function hide(){
    document.getElementById('searchlist').style.display ='none';
}

hide()
async function search(e){

    document.getElementById('searchlist').innerHTML = '';

    document.getElementById('searchlist').style.display ='initial';

    if(e.target.value.trim() ===""){
        document.getElementById('searchlist').innerHTML = '';
        return
    }



    data = await fetch(`/search?search=${e.target.value}`).then(res=>res.json());

    for(let i =0; i<data.length;i++){
        div = document.createElement('div')
        div.style.border = '1px solid black';
        div.setAttribute('class', 'card');
        div.innerHTML = `${data[i].title}`
        document.getElementById('searchlist').appendChild(div)
    }
}








