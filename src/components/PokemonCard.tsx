import { memo } from "react";
import { cn } from "../utils/cn";
import type { ProcessedPokemonList } from "../types/pokemon";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";

interface PokemonCardProps extends React.HTMLAttributes<HTMLDivElement> {
  pokemon: ProcessedPokemonList;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <Link to={`${pokemon.name}`}>
      <motion.div
        className={cn(
          "w-36 h-48 rounded-2xl shadow-2xl p-4 flex flex-col justify-between bg-gradient-to-br  cursor-pointer",
          "from-yellow-500 to-yellow-600",
        )}
        whileHover={{ y: -15, scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <h3 className="text-white font-bold text-sm drop-shadow-md capitalize text-center">
          {pokemon.name}
        </h3>

        <div className="relative w-full h-40 -mb-4">
          <motion.img
            src={pokemon.imageUrl}
            alt={pokemon.name}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 object-contain h-48 w-48 drop-shadow-2xl"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          />
        </div>
      </motion.div>
    </Link>
  );
};

export default memo(PokemonCard);
