function comprar(productId) {
    
    const cantidad = document.getElementById('quantity-' + productId).value;

    alert('Has seleccionado ' + cantidad + ' productos para comprar.');
}

function iniciarSesion() {
   
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    
    const usuarioCorrecto = "Daniel";
    const contrasenaCorrecta = "020214";

    
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');
    
  
    errorMessage.style.display = "none";
    successMessage.style.display = "none";

    
    if (username === usuarioCorrecto && password === contrasenaCorrecta) {
       
        successMessage.style.display = "block";
        
       
        setTimeout(() => {
            window.location.href = '/index.HTML'; 
        }, 2000); 
    } else {
       
        errorMessage.style.display = "block";
    }
}
