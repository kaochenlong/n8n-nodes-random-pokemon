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

    for (let i = 0; i < num; i++) {
      const randomIndex = Math.floor(Math.random() * pokemonData.length)
      const selectedPokemon = pokemonData[randomIndex]

      items.push({
        json: selectedPokemon,
      })
    }

    return [items]
  }
}

module.exports = { RandomPokemon }
