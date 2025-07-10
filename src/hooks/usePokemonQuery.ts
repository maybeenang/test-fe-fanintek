import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type {
  ApiOptions,
  PokemonListApiResponse,
  ProcessedPokemon,
  ProcessedPokemonList,
} from "../types/pokemon";
import { pokemonService } from "../services/pokemonService";
import { ENDPOINTS } from "../constans/endpoint";

export const usePokemonList = (
  options: ApiOptions,
): UseQueryResult<ProcessedPokemonList[], Error> => {
  return useQuery<
    PokemonListApiResponse,
    Error,
    ProcessedPokemonList[],
    [string, ApiOptions]
  >({
    queryKey: ["pokemonList", options] as const,
    queryFn: async (): Promise<PokemonListApiResponse> => {
      const response = await pokemonService.getAllPokemon(options);
      // Extract data from AxiosResponse
      return response.data;
    },
    select: (data) => {
      try {
        // Process the data to include id and imageUrl
        return data.results.map((pokemon): ProcessedPokemonList => {
          const id = pokemonService.extractPokemonIdFromUrl(pokemon.url);

          return {
            ...pokemon,
            id,
            imageUrl: `${ENDPOINTS.imageFrontDefault}/${id}.png`,
          };
        });
      } catch (error) {
        console.error("Error processing Pokemon data:", error);
        throw error;
      }
    },
  });
};

export const usePokemonByName = (
  name: string,
): UseQueryResult<ProcessedPokemon, Error> => {
  return useQuery<ProcessedPokemon, Error>({
    queryKey: ["pokemonByName", name],
    queryFn: async () => {
      const response = await pokemonService.getPokemonByName(name);
      // Extract data from AxiosResponse
      return response.data;
    },

    select: (data) => {
      try {
        return {
          ...data,
          imageUrl: pokemonService.getPokemonImageUrl(data),
        };
      } catch (error) {
        console.error("Error processing Pokemon data:", error);
        throw error;
      }
    },
  });
};
