import axios, { type AxiosResponse } from "axios";
import { ENDPOINTS } from "../constans/endpoint";
import type {
  ApiOptions,
  Pokemon,
  PokemonListApiResponse,
  ProcessedPokemon,
  ProcessedPokemonList,
} from "../types/pokemon";

export const pokemonService = {
  getAllPokemon: async (
    options: ApiOptions,
  ): Promise<AxiosResponse<PokemonListApiResponse>> => {
    try {
      console.log("Fetching all Pokemon with options:", options);
      return axios.get(`${ENDPOINTS.baseUrl}/pokemon`, {
        params: {
          limit: options.limit,
          offset: options.offset,
        },
      });
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
      throw error; // Re-throw the error to handle it in the calling function
    }
  },

  getPokemonByName: async (
    name: string,
  ): Promise<AxiosResponse<ProcessedPokemon>> => {
    try {
      return axios.get(`${ENDPOINTS.baseUrl}/pokemon/${name}`);
    } catch (error) {
      console.error(`Error fetching Pokemon with name ${name}:`, error);
      throw error; // Re-throw the error to handle it in the calling function
    }
  },

  extractOffsetFromUrl: (url: string | null): number | undefined => {
    if (!url) return undefined;

    try {
      const urlObj = new URL(url);
      const offset = urlObj.searchParams.get("offset");

      if (!offset) return undefined;

      const offsetNum = parseInt(offset, 10);
      return isNaN(offsetNum) ? undefined : offsetNum;
    } catch (error) {
      console.error("Error parsing next page URL:", error);
      return undefined;
    }
  },

  extractPokemonIdFromUrl: (url: string): number => {
    try {
      const urlParts = url.split("/").filter(Boolean);
      const idString = urlParts[urlParts.length - 1];
      const id = parseInt(idString, 10);

      if (isNaN(id) || id <= 0) {
        throw new Error(`Invalid Pokemon ID extracted from URL: ${url}`);
      }

      return id;
    } catch (error) {
      console.error("Error extracting Pokemon ID from URL:", error);
      throw new Error(`Failed to extract Pokemon ID from URL: ${url}`);
    }
  },

  getPokemonImageUrl: (pokemon: ProcessedPokemon): string => {
    if (pokemon.sprites?.front_default) {
      return pokemon.sprites.front_default;
    } else if (pokemon.sprites?.front_shiny) {
      return pokemon.sprites.front_shiny;
    } else {
      return "https://placehold.co/400x400/transparent/F00";
    }
  },
};
