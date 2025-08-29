const pokemonData = require("./pokemonData.json")

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

class RandomPokemon {
  constructor() {
    this.description = {
      displayName: "Random Pokémon",
      name: "randomPokemon",
      group: ["transform"],
      version: 1,
      description: "Generate random Pokémon data",
      defaults: {
        name: "Random Pokémon",
      },
      inputs: ["main"],
      outputs: ["main"],
      properties: [
        {
          displayName: "Number of Pokémon",
          name: "numberOfPokemon",
          type: "number",
          default: 5,
          description: "How many random Pokémon to generate?",
        },
        {
          displayName: "Filter by Type",
          name: "typeFilter",
          type: "multiOptions",
          default: [],
          options: [
            { name: "不限", value: "" },
            { name: "一般", value: "一般" },
            { name: "火", value: "火" },
            { name: "水", value: "水" },
            { name: "電", value: "電" },
            { name: "草", value: "草" },
            { name: "冰", value: "冰" },
            { name: "格鬥", value: "格鬥" },
            { name: "毒", value: "毒" },
            { name: "地面", value: "地面" },
            { name: "飛行", value: "飛行" },
            { name: "超能力", value: "超能力" },
            { name: "蟲", value: "蟲" },
            { name: "岩石", value: "岩石" },
            { name: "鬼", value: "鬼" },
            { name: "龍", value: "龍" },
            { name: "惡", value: "惡" },
            { name: "鋼", value: "鋼" },
            { name: "妖精", value: "妖精" },
          ],
          description: "Filter Pokémon by type (leave empty for no filter)",
        },
        {
          displayName: "Filter by Color",
          name: "colorFilter",
          type: "multiOptions",
          default: [],
          options: [
            { name: "不限", value: "" },
            { name: "黑", value: "黑" },
            { name: "藍", value: "藍" },
            { name: "褐", value: "褐" },
            { name: "灰", value: "灰" },
            { name: "綠", value: "綠" },
            { name: "橙", value: "橙" },
            { name: "粉", value: "粉" },
            { name: "粉紅", value: "粉紅" },
            { name: "紫", value: "紫" },
            { name: "紅", value: "紅" },
            { name: "白", value: "白" },
            { name: "黃", value: "黃" },
          ],
          description: "Filter Pokémon by color (leave empty for no filter)",
        },
      ],
    }
  }

  async execute() {
    const num = this.getNodeParameter("numberOfPokemon", 0)
    const typeFilter = this.getNodeParameter("typeFilter", 0)
    const colorFilter = this.getNodeParameter("colorFilter", 0)
    
    let availablePokemon = [...pokemonData]

    // 套用屬性篩選
    if (typeFilter && typeFilter.length > 0 && !typeFilter.includes("")) {
      availablePokemon = availablePokemon.filter(pokemon =>
        pokemon.type && pokemon.type.some(type => typeFilter.includes(type))
      )
    }

    // 套用顏色篩選
    if (colorFilter && colorFilter.length > 0 && !colorFilter.includes("")) {
      availablePokemon = availablePokemon.filter(pokemon =>
        pokemon.color && colorFilter.includes(pokemon.color)
      )
    }

    shuffleArray(availablePokemon)
    const selectedPokemon = availablePokemon.slice(0, num)
    const items = selectedPokemon.map((pokemon) => ({ json: pokemon }))
    items.sort((a, b) => a.json.id - b.json.id)

    return [items]
  }
}

module.exports = { RandomPokemon }

