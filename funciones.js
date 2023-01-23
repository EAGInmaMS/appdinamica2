"use strict"

function Inicio(){
    renderizar(discos,contenedor_discos,crearDisco);
    const lista_categoria=discos.map(disco=>disco.categoria).filter((c,i,array)=>array.indexOf(c)===i);
    categorias.innerHTML="<button class='categorias-btn'>Todas</button>";
    lista_categoria.forEach(cate=>{
        categorias.innerHTML+=`<button class='categorias-btn'>${cate}</button>`;
    });

    categorias.addEventListener("click",(evento)=>{
        const activado=evento.target;

        if(activado.matches(".categorias-btn")){
            let filtro;
            if(activado.innerText.toLowerCase()==="todas"){
                filtro=[...discos];
            }else{
                filtro=discos.filter(disco=>disco.categoria.toLowerCase()===activado.innerText.toLowerCase());
            }

            renderizar(filtro,contenedor_discos,crearDisco);
        }
    });

    const max=Math.ceil(discos.map(disco=>disco.precio).sort((a,b)=>b-a)[0]);
    precio.value=max;
    limite_max.innerText="Precio máximo: "+max+"€";

    const hoy= new Date();

    input_fecha1.value=hoy.toISOString().substring(0,10);
    input_fecha2.value=hoy.toISOString().substring(0,10);

    console.log(input_fecha1.value)

}

function renderizar(discos,contenedor,creador){
    contenedor.innerHTML="";
    
    discos.forEach(disco=>{
        const item=creador(disco);
        contenedor.appendChild(item);
    });
}

function crearDisco(d){
    const disco=document.createElement("article");
    let fechadisco=Date.parse(d.fecha);
    console.log(fechadisco);
    fechadisco=new Date(fechadisco);
    console.log(fechadisco);
    let dia=fechadisco.getDate();
    let mes=fechadisco.getMonth();
    let año=fechadisco.getFullYear();
    disco.innerHTML=`<article class='producto'>
        <div class='datosdisco' data-id="${d.id}">
            <img src="${d.imagen}" alt="${d.nombre}"/>
            <div>
                <button class='ampliar'>Ver
                <i class="fa-solid fa-plus"></i>
                </button>
                <button class='comprar'>Comprar
                <i class="fa-solid fa-cart-shopping"></i>
                </button>
            </div>
        </div>
        <div>
            <p>${d.nombre}</p>
            <p>${d.precio}€</p>
            <p>${dia}-${mes}-${año}</p>
        </div>
    </article>`;

    const mas=disco.querySelector(".ampliar");
    const añadir=disco.querySelector(".comprar");

    mas.addEventListener("click",(disco)=>{
        const padre=disco.currentTarget.parentElement.parentElement;
        const clave=padre.getAttribute("data-id");

        const disco_buscado=discos.find(discob=>discob.id===clave);

        content_modal.setAttribute("data-id",clave);
        content_modal.children[0].src=disco_buscado.imagen;
        content_modal.children[1].innerText=disco_buscado.id;
        content_modal.children[2].innerText=disco_buscado.nombre;
        content_modal.children[3].innerText=disco_buscado.categoria;
        modal.classList.add("open");
    });

    añadir.addEventListener("click",(disco)=>{
        const padre=disco.currentTarget.parentElement.parentElement;
        const clave=padre.getAttribute("data-id");

        const discoa=discos.find(discoe=>discoe.id===clave);

        discos_compra.push(discoa);

        const nuevodiscocarro=añadirDiscoCarro(discoa);
        discos_carro.appendChild(nuevodiscocarro);

        localStorage.setItem("carro_compra",JSON.stringify(discos_compra));

        mostrarMensaje("Disco añadido al carrito","mensajee");
    });

    return disco;
}

function añadirDiscoCarro(datos_disco){
    const nuevo_disco=document.createElement('article');
    let contador=1;
    nuevo_disco.classList.add('discocarro');
    nuevo_disco.setAttribute('data-id',datos_disco.id);
    nuevo_disco.innerHTML=`<img src="${datos_disco.imagen}" alt="${datos_disco.nombre}"/>
    <div id='datosdiscoa'>
        <p>${datos_disco.nombre}</p>
        <p>${datos_disco.precio}€</p>
        <div>
            <button id='añadir_unidad'><i class="fa-solid fa-plus"></i></button>
            <p id='unidades'>${contador}</p>
            <button id='restar_unidad'><i class="fa-solid fa-minus"></i></button>
        </div>
        <button class='quitar'>Eliminar</button>
    </div>`;

    const masuni=nuevo_disco.querySelector("#añadir_unidad");
    const menosuni=nuevo_disco.querySelector("#restar_unidad");
    const unidades=nuevo_disco.querySelector("#unidades");
    const eliminar_disco=nuevo_disco.querySelector(".quitar");

    masuni.addEventListener("click",()=>{
        contador++;
        unidades.innerText=`${contador}`;
    });

    menosuni.addEventListener("click",()=>{
        contador--;
        unidades.innerText=`${contador}`;
    });

    eliminar_disco.addEventListener("click",(evento)=>{
        const contenedor_clave=evento.currentTarget.parentElement.parentElement;
        const clave_carro=contenedor_clave.getAttribute("data-id");

        discos_compra.findIndex(disco=>disco.clave===clave_carro);
        discos_compra.splice(1,0);
        localStorage.setItem("carro_compra",JSON.stringify(discos_compra));
        contenedor_clave.remove();
        mostrarMensaje("Eliminado con éxito","mensajee");
    })

    return nuevo_disco;
}

function mostrarMensaje(texto,clase){
    alerta.innerHTML=`<h3>${texto}</h3>`;
    alerta.classList.add(clase);
    setTimeout(()=>{
        alerta.innerText="";
        alerta.classList.remove(clase);
    },2000);
}