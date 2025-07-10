export interface ApiOptions {
  limit?: number;
  offset?: number;
}

type PokemonListApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
};

type ProcessedPokemonList = {
  name: string;
  url: string;

  id: number;
  imageUrl: string;
};

type Ability = {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
};

type Species = {
  name: string;
  url: string;
};

type Stat = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};

type ProcessedPokemon = {
  id: number;
  name: string;
  imageUrl?: string;
  abilities: Ability[];
  height: number;
  species: Species;
  stats: Stat[];
  sprites?: {
    front_default?: string;
    front_shiny?: string;
  };
};

type Pokemon = {
  id: number;
  name: string;
  imageUrl: string;
  height: number;
  weight: number;
  base_experience: number;
  types: string[];
  abilities: string[];
  stats: {
    hp: number;
    attack: number;
    defense: number;
    special_attack: number;
    special_defense: number;
    speed: number;
  };
  sprites: {
    front_default: string;
    back_default: string;
    front_shiny?: string;
    back_shiny?: string;
  };
};
