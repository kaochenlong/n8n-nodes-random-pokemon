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
          default: 1,
          description: "How many random Pokémon to generate?",
        },
      ],
    }
  }

  async execute() {
    const num = this.getNodeParameter("numberOfPokemon", 0)
    const items = []
    const availablePokemon = [...pokemonData]

    shuffleArray(availablePokemon)
    const selectedPokemon = availablePokemon.slice(0, num)
    items.push(...selectedPokemon.map((pokemon) => ({ json: pokemon })))
    items.sort((a, b) => a.json.id - b.json.id)

    return [items]
  }
}

module.exports = { RandomPokemon }
