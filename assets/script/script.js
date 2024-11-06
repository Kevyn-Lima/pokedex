const pokemonList = document.getElementById('pokemonList');
const loadMore = document.getElementById('loadMore')

const maxRecords = 151
const limit = 15
let offset = 0

function convertPokemonToLi(pokemon){
    return `
        <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.pokemonNumber}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) =>`<li class="type ${pokemon.type}">${type}</li>`).join(' ')}
                    </ol>
                    <img src="${pokemon.photo}" 
                    alt="${pokemon.name}">
                </div>
            </li>
    `
} 

function loadPokemonItens(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMore.addEventListener('click', () =>{
    offset += limit
    const qtdRecordNextPage = offset + limit;

    if(qtdRecordNextPage >= maxRecords){
        const newlimit = maxRecords - offset
        loadPokemonItens(offset, newlimit)

        loadMore.parentElement.removeChild(loadMore)

    }else{

        loadPokemonItens(offset, limit)
    }

})
