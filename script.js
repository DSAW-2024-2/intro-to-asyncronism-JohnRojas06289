document.addEventListener("DOMContentLoaded", function () {
    const pokemon_count = 150;
    const poke_container = document.getElementById('poke-container');
    const main_screen = document.querySelector('.main-screen1');
    const poke_name = main_screen.querySelector('.poke-name');
    const main_screen_img = document.createElement('img');
    main_screen_img.id = 'main-screen-pokemon-img';
    main_screen.appendChild(main_screen_img);

    // Almacenar los Pokémon en una variable para la búsqueda
    let pokemons = [];

    // Función para actualizar la pantalla principal con el Pokémon seleccionado
    const updateMainScreen = (pokemon) => {
        const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
        const id = pokemon.id.toString().padStart(3, '0');

        poke_name.textContent = `#${id} - ${name}`;
        main_screen_img.src = pokemon.sprites.front_default;
    };

    // Obtener y mostrar los Pokémon en la lista
    const fetchPokemons = async () => {
        try {
            const pokemonPromises = [];
            for (let i = 1; i <= pokemon_count; i++) {
                pokemonPromises.push(getPokemon(i));
            }
            await Promise.all(pokemonPromises);
        } catch (error) {
            console.error("Error al obtener los Pokémon:", error);
        }
    };

    const getPokemon = async (id) => {
        try {
            const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
            const res = await fetch(url);
            if (!res.ok) throw new Error(`Error en la solicitud: ${res.status}`);
            const data = await res.json();
            createPokemonCard(data);

            // Almacenar el Pokémon en la variable
            pokemons.push(data);

            if (id === 1) {
                updateMainScreen(data);
                showPokemonDetails(data);
            }
        } catch (error) {
            console.error("Error al obtener el Pokémon:", error);
        }
    };

    const createPokemonCard = (pokemon) => {
        const pokemonEl = document.createElement('div');
        pokemonEl.classList.add('pokemon');

        const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
        const id = pokemon.id.toString().padStart(3, '0');

        const pokemonInnerHTML = `
            <div class="info">
                <span class="number">#${id}</span>
                <h3 class="name">${name}</h3>
            </div>
        `;

        pokemonEl.innerHTML = pokemonInnerHTML;

        pokemonEl.addEventListener('click', () => {
            updateMainScreen(pokemon);
            showPokemonDetails(pokemon);
        });

        poke_container.appendChild(pokemonEl);
    };

    const showPokemonDetails = async (pokemon) => {
        const pokemonDetailsContainer = document.getElementById('pokemon-details');
        const stateButtonsContainer = document.querySelector('.state-buttons');

        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon.id}`;
        const pokemonRes = await fetch(pokemonUrl);
        const pokemonData = await pokemonRes.json();

        const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`;
        const speciesRes = await fetch(speciesUrl);
        const speciesData = await speciesRes.json();
        const description = speciesData.flavor_text_entries
            .find(entry => entry.language.name === 'en')
            .flavor_text;

        const height = pokemonData.height / 10;
        const weight = pokemonData.weight / 10;

        stateButtonsContainer.querySelector('#description').innerText = description;

        const stats = pokemonData.stats.reduce((acc, stat) => {
            acc[stat.stat.name] = stat.base_stat;
            return acc;
        }, {});

        const statsContainer = document.querySelector('.stats-container');
        statsContainer.innerHTML = `
            <div class="stats-column left-column">
                <p>HP: ${stats.hp}</p>
                <p>Attack: ${stats.attack}</p>
                <p>Defense: ${stats.defense}</p>
            </div>
            <div class="stats-column right-column">
                <p>Special Attack: ${stats['special-attack']}</p>
                <p>Special Defense: ${stats['special-defense']}</p>
                <p>Speed: ${stats.speed}</p>
            </div>
        `;

        pokemonDetailsContainer.style.display = 'flex';
    };

    // Función de búsqueda
    const searchPokemons = (query) => {
        const filteredPokemons = pokemons.filter(pokemon =>
            pokemon.name.toLowerCase().includes(query.toLowerCase())
        );
        poke_container.innerHTML = ''; // Limpiar el contenedor
        filteredPokemons.forEach(createPokemonCard); // Mostrar los Pokémon filtrados
    };

    // Añadir evento al campo de búsqueda
    document.getElementById('search-input').addEventListener('input', function() {
        searchPokemons(this.value);
    });

    fetchPokemons();
});
