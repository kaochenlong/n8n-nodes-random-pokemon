const pokemonData = require("./pokemonData.json")

class RandomPokemon {
  constructor() {
    this.description = {
      displayName: "Random Pokemon",
      name: "randomPokemon",
      group: ["transform"],
      version: 1,
      description: "Generate random Pokemon data",
      defaults: {
        name: "Random Pokemon",
      },
      inputs: ["main"],
      outputs: ["main"],
      properties: [
        {
          displayName: "Number of Pokemon",
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

    for (let i = 0; i < num; i++) {
      if (availablePokemon.length === 0) {
        break
      }

      const randomIndex = Math.floor(Math.random() * availablePokemon.length)
      const selectedPokemon = availablePokemon.splice(randomIndex, 1)[0]

      items.push({
        json: selectedPokemon,
      })
    }

    items.sort((a, b) => a.json.id - b.json.id)

    return [items]
  }
}

module.exports = { RandomPokemon }
