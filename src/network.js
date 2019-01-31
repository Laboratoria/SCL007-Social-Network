//REGISTRO USUARIO VIA MAIL Y CLAVE
document.getElementById("registro").addEventListener("click",() => {
    let email = document.getElementById('email').value;
    let contrasena = document.getElementById('contrasena').value;
   
    firebase.auth().createUserWithEmailAndPassword(email, contrasena)
    .then(function(){
        verificar()
    })
    .catch(function(error) {
        // Handle Errors here.
        if(contrasena.length <= 5) {
            alert("Ingrese contraseña de 6 dígitos o más");
        }else if (email.indexOf("@")); 
            alert("Ingrese email válido")
      });
})


//INGRESO USUARIO VIA MAIL Y CLAVE
document.getElementById("acceder").addEventListener("click",() => {
    let email2 = document.getElementById('email2').value;
    let contrasena2 = document.getElementById('contrasena2').value;

    firebase.auth().signInWithEmailAndPassword(email2, contrasena2)
    .catch(function(error) {
        // Handle Errors here.
        if(contrasena2.length <= 5) {
            alert("Ingrese contraseña de 6 dígitos o más");
        }else if (email2.indexOf("@"));
            alert("Ingrese email válido");
        // var errorCode = error.code;
        // var errorMessage = error.message;
      });
})


//OBSERVA SI ES UN USUARIO REGISTRADO
observador = () => {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            aparece(user);
          // User is signed in.
          let displayName = user.displayName;
          let email = user.email;
          console.log(user);
          let emailVerified = user.emailVerified;
          console.log(user.emailVerified)
          let photoURL = user.photoURL;
          let isAnonymous = user.isAnonymous;
          let uid = user.uid;
          let providerData = user.providerData;
          // ...
        } else {
            console.log("No existe usuario activo")
            apareceNousuario(); //ingresa tus datos para acceder
            }
      });
}
observador();


//APARECE INFORMACION SOLO SI EL USUARIO VERIFICA SU CUENTA CON CORREO ENVIADO AL MAIL
aparece = user => {
    var user = user;
    let contenido = document.getElementById('contenido');
    if (user.emailVerified){
        contenido.innerHTML = `
        <p>Bienvenido a la Red Social</p>
        <p>ver post</p>
        <p>ver post</p>
        <p>ver post</p>
        <p>ver post</p>
        <p>ver post</p>
        <button onclick="cerrar()">Cerrar sesion</button>
        `;
    }    
}

//ESTO SE MUESTRA EN CASO DE NO ESTAR LOGUEADO
apareceNousuario = () => {
    let contenido = document.getElementById('contenido');
    contenido.innerHTML = "Ingresa tus datos para acceder";
}

//CERAR SESION USUARIOS LOG
cerrar = () => {
    firebase.auth().signOut()
    .then()(function(){
        console.log('Saliendo...')
    })
    .catch()(function(error){
        console.log(error)
    })
}

//ENVIANDO MAIL DE VERIFICACION
verificar = () => {
    let user = firebase.auth().currentUser;
user.sendEmailVerification().then(function() {
  // Email sent.
  console.log('enviando correo')
}).catch(function(error) {
  // An error happened.
});
}



//GOOGLE

var provider = new firebase.auth.GoogleAuthProvider();

firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });