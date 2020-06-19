

function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {

        for( const state of states ) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    } )
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateinput = document.querySelector("input[name=state]")
    const ufValue = event.target.value
    const indexOfSelectedState = event.target.selectedIndex
    stateinput.value = event.target.options[indexOfSelectedState].text
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    citySelect.innerHTML = "<option value>Selecione sua Cidade</option>"
    citySelect.disabled = true
    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        for ( city of cities ) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


// Itens de coleta
// pegar todos os li's
const ItemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of ItemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}
// atualizar o campo escondido com os itens selecionados
const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event){
    const itemLi = event.target
    // add or remove uma classe com javascript
    itemLi.classList.toggle("selected")
    const itemId = itemLi.dataset.id

    
    // verificar se existem itens selecionado, se sim
    // pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex( function(item) {
        const itemFound = item == itemId
        return itemFound
    })
    // se ja estiver selecionado, tirar da seleção
    if(alreadySelected >= 0) {
        const filteredItem = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        selectedItems = filteredItem
    // se não estiver selecionado, adicionar à seleção
    } else {
        selectedItems.push(itemId)
    }

    collectedItems.value = selectedItems
    
}
console.log(selectedItems)