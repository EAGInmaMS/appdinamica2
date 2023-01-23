"use strict"

const busqueda=document.querySelector(".buscador");
const contenedor_discos=document.querySelector(".discos-contenido");
const categorias=document.querySelector(".categorias");
const alerta=document.querySelector(".alerta");
const precio=document.querySelector(".precio-filtro");
const limite_max=document.querySelector(".precio-valor");
const modal=document.querySelector(".modal");
const cerrar_modal=document.querySelector(".close-btn");
const content_modal=document.querySelector(".modal-contenido");
const carro_compra=document.querySelector(".contenido_carro");
const cerrar_carro=document.querySelector(".cerrar_carro");
const discos_carro=document.querySelector(".discos_carro");
const abrir_carro=document.querySelector(".abrir_carro");
const input_fecha1=document.getElementById("fecha1");
const input_fecha2=document.getElementById("fecha2");
const botonfecha=document.getElementById("boton_fecha");
const comprarm=document.querySelector(".comprarmodal");


Inicio();

cerrar_modal.addEventListener("click",()=>{
    modal.classList.remove("open");
});

abrir_carro.addEventListener("click",()=>{
    carro_compra.classList.add("show");
});

cerrar_carro.addEventListener("click",()=>{
    carro_compra.classList.remove("show");
})


precio.addEventListener("change",()=>{
    let filtrar;
    let limite=precio.value;
    filtrar=discos.filter(disco=>disco.precio<=limite).sort((a,b)=>b.precio-a.precio);
    if(filtrar.length==0){
        contenedor_discos.innerHTML="<h3>No hay elementos que coincidan con tu búsqueda</h3>";
    }else{
        renderizar(filtrar,contenedor_discos,crearDisco);
    }
    
    limite_max.innerText=limite+"€";

});

busqueda.addEventListener("keyup",()=>{
    let filtro;
    let buscado=busqueda.value.trim().toLowerCase();
    if(buscado===""){
        filtro=[...discos];
    }else{
        filtro=discos.filter(disco=>disco.nombre.toLowerCase().includes(buscado));
    }

    if(filtro.lenght===0){
        contenedor_discos.innerHTML=`<h3>No hay productos que coincidan con tu búsqueda</h3>`;
    }else{
        renderizar(filtro,contenedor_discos,crearDisco);
    }
});

let discos_compra=JSON.parse(localStorage.getItem("carro_compra")??"[]");

renderizar(discos_compra,discos_carro,añadirDiscoCarro);

botonfecha.addEventListener("click",()=>{
    let limit1,limit2;

    limit1= Date.parse(input_fecha1.value);
    limit2=Date.parse(input_fecha2.value);

    let discosfecha=[];

    discos.forEach(disco=>{
        let fecha=disco.fecha;
        fecha=Date.parse(fecha);
        
        if(fecha>=limit1 && fecha<=limit2){
            discosfecha.push(disco);
        }

        console.log(discosfecha);
    });

    renderizar(discosfecha,contenedor_discos,crearDisco);

});

comprarm.addEventListener("click",(disco)=>{
    const padre=disco.currentTarget.parentElement;
    const clave=padre.getAttribute("data-id");

    const discoa=discos.find(discoe=>discoe.id===clave);

        discos_compra.push(discoa);

        const nuevodiscocarro=añadirDiscoCarro(discoa);
        discos_carro.appendChild(nuevodiscocarro);

        localStorage.setItem("carro_compra",JSON.stringify(discos_compra));

        modal.classList.remove("open");

        mostrarMensaje("Disco añadido al carrito","mensajee");
})


