const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
let URL = "https://pokeapi.co/api/v2/pokemon/";
//Bucle para obtener todos los pokemones 
for (let i = 1; i <= 151; i++) {
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => mostrarPokemon(data));
}

function mostrarPokemon(pokeapi) {
    const div = document.createElement("div");
    div.classList.add("pokemon");
    //Parte del html
    div.innerHTML = `<p class="pokemon-id-back">#${pokeapi.id.toString().padStart(3, '0')}</p>
    <div class="pokemon-imagen">
        <img src="${pokeapi.sprites.other['official-artwork'].front_default}" alt="${pokeapi.name}">
    </div>
    <div class="pokemon-info">
        <div class="nombre-contenedor">
            <p class="pokemon-id">#${pokeapi.id.toString().padStart(3, '0')}</p>
            <h2 class="pokemon-nombre">${pokeapi.species.name}</h2>
        </div>
        <div class="pokemon-tipos">
            ${pokeapi.types.map(type => `<p class="${type.type.name} tipo">${type.type.name.toUpperCase()}</p>`).join('')}
        </div>
        <div class="pokemon-stacks">
            <p class="stack">Peso: ${pokeapi.weight / 10} kg</p>
            <p class="stack">Altura: ${pokeapi.height / 10} m</p>
        </div>
    </div>`;
    listaPokemon.append(div);
}

//Evento para los botones -- aun no da el filtro 
botonesHeader.forEach(boton => {
    boton.addEventListener("click", (event) => {
        const botonId = event.currentTarget.id;
        listaPokemon.innerHTML = "";

        let promesas = [];
        for (let i = 1; i <= 151; i++) {
            promesas.push(fetch(URL + i).then((response) => response.json()));
        }

        Promise.all(promesas).then(datos => {
            datos.forEach(data => {
                if (botonId === "ver-todos") {
                    mostrarPokemon(data);
                } else {
                    const tipos = data.types.map(type => type.type.name);
                    if (tipos.some(tipo => tipo.includes(botonId))){
                        mostrarPokemon(data);
                    }
                }
            });
        });
    });
});

