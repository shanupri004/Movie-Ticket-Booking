function toggle(){
    const pass = document.getElementById('pass')
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

let admin = {email: 'admin@gmail.com', pass:'admin123'}

function submit(){
    validMail = admin.email;
    // console.log(validMail);
    validPass = admin.pass;
    // console.log(validPass);

    email = document.getElementById('email').value.trim();
    // console.log(email)
    pass = document.getElementById("pass").value;
    // console.log(pass)

    error = document.getElementById('error');
    sucess = document.getElementById('sucess');
    if(email.includes('@') && email.includes('.')){
        if(validMail === email && validPass === pass){
            error.textContent = ' '
            window.location.href = './adminDashboard.html'
        } else{
            error.textContent = "email or password is incorrect"
            sucess.textContent = ' '
        }
    }else{
        error.textContent = 'please enter valid email'
        sucess.textContent= ' '
    } 
}
