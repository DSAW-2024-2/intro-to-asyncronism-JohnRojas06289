document.addEventListener("DOMContentLoaded", function() {
    // Datos del Pokémon
    const pokemon = {
        name: "Squirtle",
        type: "Water",
        weaknesses: ["Electric", "Grass"],
        height: "0.5 m",
        weight: "9.0 kg",
        stats: {
            ps: 50,
            atk: 48,
            def: 65,
            spAtk: 50,
            spDef: 64,
            speed: 43
        },
        image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png"
    };

    // Actualiza la información del Pokémon en el DOM
    document.querySelector(".screen img").src = pokemon.image;
    document.querySelector(".info p").innerText = `#007 - ${pokemon.name}`;
    document.querySelector(".type span").innerText = pokemon.type;
    document.querySelector(".weakness span").innerText = pokemon.weaknesses.join(", ");
    document.querySelector(".measurements").innerHTML = `<p>Altura: ${pokemon.height}</p><p>Peso: ${pokemon.weight}</p>`;
});

// Función para encender o apagar el bombillo
function toggleBulb(bulb, button) {
    if (bulb.classList.contains('off')) {
        bulb.classList.remove('off');
        bulb.classList.add('on');
        button.textContent = 'Apagar';
    } else {
        bulb.classList.remove('on');
        bulb.classList.add('off');
        button.textContent = 'Encender';
    }
}

// Configuración del bombillo 1
const bulb1 = document.getElementById('bulb1');
const toggleButton1 = document.getElementById('toggleButton1');
toggleButton1.addEventListener('click', () => toggleBulb(bulb1, toggleButton1));

// Configuración de Pokémon
const pokemonDetailsContainer = document.getElementById('pokemon-details');
const poke_container = document.getElementById('poke-container');
const pokemon_count = 150;
const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
};

const main_types = Object.keys(colors);

// Obtiene y muestra los Pokémon
const fetchPokemons = async () => {
    try {
        for (let i = 1; i <= pokemon_count; i++) {
            await getPokemon(i);
        }
    } catch (error) {
        console.error('Error fetching Pokémon:', error);
    }
};

const getPokemon = async (id) => {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const res = await fetch(url);
        const data = await res.json();
        createPokemonCard(data);
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
    }
};

const createPokemonCard = (pokemon) => {
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon');

    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const id = pokemon.id.toString().padStart(3, '0');

    // Solo mostrando el nombre y el número de la Pokédex
    const pokemonInnerHTML = `
    <div class="info">
        <span class="number">#${id}</span>
        <h3 class="name">${name}</h3>
    </div>
    `;

    pokemonEl.innerHTML = pokemonInnerHTML;
    pokemonEl.addEventListener('click', () => showPokemonDetails(pokemon)); // Añadir evento de clic
    poke_container.appendChild(pokemonEl);
};

const showPokemonDetails = async (pokemon) => {
    try {
        // Obtener detalles del Pokémon usando la API
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemon.id}`;
        const res = await fetch(url);
        const data = await res.json();
        
        // Mostrar los detalles del Pokémon en el contenedor
        pokemonDetailsContainer.querySelector('img').src = data.sprites.front_default;
        pokemonDetailsContainer.querySelector('.name').innerText = `${pokemon.id} - ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}`;
        pokemonDetailsContainer.querySelector('.type').innerText = `Tipo: ${data.types.map(typeInfo => typeInfo.type.name).join(', ')}`;
        pokemonDetailsContainer.querySelector('.weakness').innerText = `Debilidades: ${data.types.map(typeInfo => typeInfo.type.name).join(', ')}`; // Asumiendo debilidades iguales a tipos
        pokemonDetailsContainer.querySelector('.measurements').innerHTML = `<p>Altura: ${data.height / 10} m</p><p>Peso: ${data.weight / 10} kg</p>`;

        // Mostrar el contenedor de detalles
        pokemonDetailsContainer.style.display = 'block';
    } catch (error) {
        console.error('Error showing Pokémon details:', error);
    }
};

fetchPokemons();