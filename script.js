document.addEventListener("DOMContentLoaded", function() {
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

    document.querySelector(".screen img").src = pokemon.image;
    document.querySelector(".info p").innerText = `#007 - ${pokemon.name}`;
    document.querySelector(".type span").innerText = pokemon.type;
    document.querySelector(".weakness span").innerText = pokemon.weaknesses.join(", ");
    document.querySelector(".measurements").innerHTML = `<p>Altura: ${pokemon.height}</p><p>Peso: ${pokemon.weight}</p>`;
});




// Función para encender o apagar bombillo
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

// Bombillo 1
const bulb1 = document.getElementById('bulb1');
const toggleButton1 = document.getElementById('toggleButton1');
toggleButton1.addEventListener('click', () => toggleBulb(bulb1, toggleButton1));

// Bombillo 2
const bulb2 = document.getElementById('bulb2');
const toggleButton2 = document.getElementById('toggleButton2');
toggleButton2.addEventListener('click', () => toggleBulb(bulb2, toggleButton2));

// Bombillo 3
const bulb3 = document.getElementById('bulb3');
const toggleButton3 = document.getElementById('toggleButton3');
toggleButton3.addEventListener('click', () => toggleBulb(bulb3, toggleButton3));
