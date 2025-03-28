(function(){
    const usersURL = "https://jsonplaceholder.typicode.com/users"
    const moviesBaseURL = "https://omdbapi.com/"
    // REGÍSTRATE EN OMDBAPI PARA CONSEGUIR TU PROPIA APIKEY
    
    // CASO DE USO 2: https://omdbapi.com/?apikey=xxxxxxx&i=peliculaI
   
  
  
 
   
// (10%) BARRA DE NAVEGACIÓN FUNCIONAL
let enlace_home = document.querySelector(".navbar-nav a:nth-child(1)" )
let enlace_recommend = document.querySelector(".navbar-nav a:nth-child(2)" )
let enlace_profiles = document.querySelector(".navbar-nav a:nth-child(3)" )

let home = document.getElementById("home")
let recomend = document.getElementById("recommend")
let profiles = document.getElementById("profiles")
let deUsuarioID;
let paraUsuarioID;
let paraUsuarioNombre;
let deUsuarioNombre;

//estado por defecto
home.style.display = "flex"
recomend.style.display = "none"
profiles.style.display = "none"


enlace_home.addEventListener("click", function(){
    home.style.display = "flex"
    recomend.style.display = "none"
    profiles.style.display = "none"
})

enlace_recommend.addEventListener("click", ()=>{
    home.style.display = "none"
    recomend.style.display = "flex"
    profiles.style.display = "none"

})

enlace_profiles.addEventListener("click", ()=>{
    home.style.display = "none"
    recomend.style.display = "none"
    profiles.style.display = "flex"

})

 // (10%) CARGA DE USUARIOS Y LISTAS DESPLEGABLES DE USUARIOS FUNCIONALES
    
    const usuarios = document.getElementById("fromSel")
    
    let seleccionado = 0;
    let loadusers = 0;
    let mi_array=[]

usuarios.addEventListener("click", leerDatos)

function leerDatos(){
            fetch(usersURL)
            .then(resp => resp.json())
            .then(array_usuarios => {
                if (loadusers == 0)
                {
                    mi_array = array_usuarios
                    /*usuarios.innerHTML = " ";
                    let primer_option = document.createElement("option")
                    primer_option.value = 0;
                    primer_option.textContent = "FROM user..."
                    usuarios.append(primer_option)*/
                
                    array_usuarios.forEach(element => {
                    let usuario_recomendacion = document.createElement("option")
                    usuario_recomendacion.value = element.id;
                    usuario_recomendacion.textContent = element.name
                    usuarios.append(usuario_recomendacion)
                 });

                }
                
                usuarios.addEventListener("change", ()=>{
                    seleccionado = usuarios.value;
                    deUsuarioID = usuarios.value;
                    
                    if (seleccionado==0)
                        {
                         
                            usuarios_2.disabled = true;
                            usuarios_2.innerHTML = " ";
                            let primer_option = document.createElement("option")
                            primer_option.value = 0;
                            primer_option.textContent = "TO user..."
                            usuarios_2.append(primer_option)
                        }
                        else{
                            
                            usuarios_2.disabled = false;
                            usuarios_2.innerHTML = " ";
                            let primer_option = document.createElement("option")
                            primer_option.value = 0;
                            primer_option.textContent = "TO user..."
                            usuarios_2.append(primer_option)
                            otroLeerDatos();
                        }
                })
                loadusers = 1;
            })
        
        
}
const usuarios_2 = document.getElementById("toSel")
//usuarios_2.addEventListener("click", otroLeerDatos)

function otroLeerDatos(){
   
mi_array.forEach(element => {
    if (seleccionado != element.id)
    {
        let usuario_recomendacion_2= document.createElement("option")
        usuario_recomendacion_2.value = element.id
        usuario_recomendacion_2.textContent = element.name
        usuarios_2.append(usuario_recomendacion_2)
        
    }
})
}

usuarios_2.addEventListener("change", ()=>{
   paraUsuarioID = usuarios_2.value;
   
})
    //cargamos los usuarios de la seccion perfiles

 





// (10%) BÚSQUEDA Y SELECCIÓN DE PELÍCULAS
const button_search = document.getElementById("searchBtn")
const name_search = document.getElementById("searchInp")
let palabra;
const contenedor = document.getElementById("searchResultsDiv")
let pelisURL = "https://omdbapi.com/?apikey=37846354&s="

button_search.addEventListener("click", ()=>{
    palabra = name_search.value;
    pelisURL = "https://omdbapi.com/?apikey=37846354&s=" + palabra
    enviarBusqueda(palabra)
})
name_search.addEventListener("keyup", (ev)=>{
    
    if (ev.key == "Enter")
    {
        palabra = name_search.value
        pelisURL = "https://omdbapi.com/?apikey=37846354&s=" + palabra
        enviarBusqueda(palabra)
    }
    
})

function enviarBusqueda(palabra){
    
    fetch(pelisURL)
    .then(resp => {
        return resp.json()
    })
    .then(array_pelis => {
     console.log(array_pelis.Response)
        if (array_pelis.Response == "True")  
        {
            array_pelis = array_pelis.Search
            contenedor.innerHTML=" "
            array_pelis.forEach(element => {
            contenedor.innerHTML+='"<div class="card text-center bg-light mb-2 mr-2"><div class="card-body"><img src='+element.Poster+ 'class="card-img-top"><h5 class="card-title">'+element.Title+'</h5><p class="card-text">'+element.Year+'</p></div></div>"'
            })
        }
        else 
        {
            contenedor.innerHTML = "PELICULAS NO ENCONTRADAS INTENTALO DE NUEVO."
        }
          
        })
    
}

    // (10%) REALIZAR RECOMENDACIONES
let recomendaciones = []
//let deUsuario;
//let paraUsuario;
//let deUsuarioNombre;
//let paraUsusarioNombre;

const movieInput = document.getElementById("movieInp")
const movieButton = document.getElementById("recommendBtn")


movieButton.addEventListener("click", ()=>{
   
    
    if (deUsuarioID>0 && paraUsuarioID>0 && movieInput.value.trim()!="")
    {
    recomendaciones.push({})
    recomendaciones[recomendaciones.length-1].fromID = deUsuarioID-1;
    recomendaciones[recomendaciones.length-1].fromNombre = mi_array[deUsuarioID-1].name
    recomendaciones[recomendaciones.length-1].toID = paraUsuarioID-1;
    recomendaciones[recomendaciones.length-1].toNombre = mi_array[paraUsuarioID-1].name
    recomendaciones[recomendaciones.length-1].peli = movieInput.value;
    console.log(recomendaciones)

    }
    else{
        console.log("hay datos erroneos no se rellena el array")
    }
})
    // (15%) LISTAR Y ELIMINAR RECOMENDACIONES (sección "profiles")
    //let tablaRecomendacionesEnviadas = document.querySelector("#inboxTable tbody tr") // selecciono todos los elementos que sean descendientes en algun nivel de tbody
   // let tablaRecomendacionesRecibidas = document.querySelector("#sentTable tbody tr")
    //const insertar = document.querySelector("#sentTable tbody")
    const perfiles = document.getElementById("profileSel")
    let elegido;

    fetch(usersURL)
    .then(resp =>resp.json())
    .then(array_usu => {
        array_usu.forEach(element => {
            let adduser = document.createElement("option")
            adduser.value = element.id
            adduser.textContent = element.name
            perfiles.append(adduser)
        })
    })
  
    perfiles.addEventListener("change", ()=>{
        elegido = perfiles.value

        if (elegido == 0){
            borrar_tabla()
            resetearTablaEnviados()
            resetearTablaRecibidos()
        }
        else if (elegido > 0 && elegido <=10)
        {
           borrar_tabla()
           
        }
    
    })

    function borrar_tabla(){
        let EselectorFila = document.querySelectorAll("#sentTable tbody tr")
        let RselectorFila = document.querySelectorAll("#inboxTable tbody tr")

        EselectorFila.forEach(tr =>{
            tr.remove()
        })
        RselectorFila.forEach(tr =>{
            tr.remove()
        })
    }

    function resetearTablaEnviados(){
        const insertar = document.querySelector("#sentTable tbody")
        let fila = document.createElement("tr")
        insertar.append(fila)
        let columnaTitulo = document.createElement("td")
        columnaTitulo.textContent = "title"
        fila.append(columnaTitulo)
        fila.append(document.createElement("td"))
        fila.append(document.createElement("td"))
        fila.append(document.createElement("td"))
        let columnaNombre = document.createElement("td")
        columnaNombre.textContent="to.name"
        fila.append(columnaNombre)
        let columnaBoton = document.createElement("td")
        fila.append(columnaBoton)
        let boton = document.createElement("button")
        boton.className = "btn btn-outline-danger"
        boton.textContent = " X "
        columnaBoton.append(boton) 
    }

    function resetearTablaRecibidos(){
        const insertar = document.querySelector("#inboxTable tbody")
        let fila = document.createElement("tr")
        insertar.append(fila)
        let columnaTitulo = document.createElement("td")
        columnaTitulo.textContent = "title"
        fila.append(columnaTitulo)
        fila.append(document.createElement("td"))
        fila.append(document.createElement("td"))
        fila.append(document.createElement("td"))
        let columnaNombre = document.createElement("td")
        columnaNombre.textContent="to.name"
        fila.append(columnaNombre)
        let columnaBoton = document.createElement("td")
        fila.append(columnaBoton)
        let boton = document.createElement("button")
        boton.className = "btn btn-outline-danger"
        boton.textContent = " X "
        columnaBoton.append(boton) 
    }
 
})()