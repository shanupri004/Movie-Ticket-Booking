function toggle_1(){
    const pass = document.getElementById('pass1')
    const icon = document.getElementById('icon1')
    if(pass.type==='password'){
        pass.type = 'text';
        icon.classList.remove('fa-eye')
        icon.classList.add('fa-eye-slash')
    }
    else{
        pass.type = 'password';
        icon.classList.remove('fa-eye-slash')
        icon.classList.add('fa-eye')
    }
}

function toggle_2(){
    const pass = document.getElementById('pass2')
    const icon = document.getElementById('icon2')
    if(pass.type==='password'){
        pass.type = 'text';
        icon.classList.remove('fa-eye')
        icon.classList.add('fa-eye-slash')
    }
    else{
        pass.type = 'password';
        icon.classList.remove('fa-eye-slash')
        icon.classList.add('fa-eye')
    }
}
let loginUser = JSON.parse(localStorage.getItem('loginUser')) || [
    { email: 'aparna@gmail.com', pass: 'abarna12' },
    { email: 'babitha@gmail.com', pass: 'babitha1' },
    { email: 'pushpa@gmail.com', pass: 'pushpa12' },
];

console.log(loginUser)
function signup(){
    const email = document.getElementById('email').value.trim();
    const pass1 = document.getElementById('pass1').value;
    const pass2 = document.getElementById('pass2').value;
    let error = document.getElementById('error');
    let sucess = document.getElementById('sucess')

    if(email.includes("@") && email.includes(".")){
        if(pass1==pass2){
            if(pass1.length==8){
                const userExists = loginUser.find(item => item.email === email);
                if (userExists) {
                    error.textContent = 'Email is already exist'
                } else {
                    const newUser = { email: email, pass: pass1 };
                    loginUser.push(newUser);
    
                    localStorage.setItem('loginUser', JSON.stringify(loginUser));
    
    
                    console.log("New user added:", newUser);
                    console.log("Updated user list:", loginUser);

                    // alert("Account created successfully!");
                    error.textContent = ' ';
                    sucess.textContent = "Account created successfully!";
                    
                }
            }else{
                error.textContent = 'Password must contain 8 character';
            }
        } else{
            error.textContent = "Password doesn't match";
        }
    }else{
        error.textContent = "Please enter valid email";
    }
}
function toggle(){
    const pass = document.getElementById('userPass')
    const icon = document.getElementById('icon')
    if(pass.type==='password'){
        pass.type = 'text';
        icon.classList.remove('fa-eye')
        icon.classList.add('fa-eye-slash')
    }
    else{
        pass.type = 'password';
        icon.classList.remove('fa-eye-slash')
        icon.classList.add('fa-eye')
    }
}

function login(){
    const email = document.getElementById('userEmail').value;
    const pass = document.getElementById('userPass').value;

    const validEmail = loginUser.find(item => item.email === email);
    const validPass = loginUser.find(item => item.pass === pass);

    let error = document.getElementById('error1');
    let sucess = document.getElementById('sucess1');

    if(validEmail&&validPass){
        error.textContent=' ' 
        window.location.href = './dashboard.html'
    }else{
        error.textContent='Email or Password is incorrect'
    }

}

function log(){
    document.getElementById('signup').style.display='none';
    document.getElementById('login').style.display='block';
}

function sign(){
    document.getElementById('login').style.display='none';
    document.getElementById('signup').style.display='block';
}

// loginUser.pop()
// localStorage.setItem('loginUser', JSON.stringify(loginUser));
// console.log(loginUser)