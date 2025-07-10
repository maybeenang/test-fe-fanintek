import type { ProcessedPokemon } from "../types/pokemon";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";
import PokemonStat from "./PokemonStat";

interface PokemonDetailProps {
  pokemon: ProcessedPokemon;
}

const PokemonDetail: React.FC<PokemonDetailProps> = ({ pokemon }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="w-full max-w-4xl mx-auto p-4 md:p-8 z-20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ type: "spring" }}
      >
        <div
          className={cn(
            "relative p-6 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center gap-8",
            "bg-gradient-to-br from-yellow-500 to-yellow-500/70",
          )}
        >
          <motion.img
            src={pokemon.imageUrl}
            alt={pokemon.name}
            className="w-64 h-64 md:w-96 md:h-96 drop-shadow-2xl -mt-20 -ml-10 md:-mt-36 md:-ml-24"
            layoutId={`pokemon-img-${pokemon.id}`}
          />
          <div className="w-full bg-white p-6 rounded-2xl shadow-2xl space-y-3">
            <div>
              <h1 className="text-sm font-medium">Abilitites</h1>
              <div className="flex gap-2">
                {pokemon.abilities.map((abiliti) => (
                  <span
                    key={abiliti.ability.name}
                    className="px-3 py-1 bg-white/30 text-xs rounded-full capitalize border-yellow-500 border"
                  >
                    {abiliti.ability.name.replace("-", " ")}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h1 className="text-sm font-medium">Abilitites</h1>
              <span className="px-3 py-1 bg-white/30 text-xs rounded-full capitalize border-yellow-500 border">
                {pokemon.height}
              </span>
            </div>
            <div>
              <h1 className="text-sm font-medium">Species</h1>
              <span className="px-3 py-1 bg-white/30 text-xs rounded-full capitalize border-yellow-500 border">
                {pokemon.species.name}
              </span>
            </div>

            <div className="h-64">
              <PokemonStat stats={pokemon.stats} key={`${pokemon.id}-stats`} />
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PokemonDetail;
