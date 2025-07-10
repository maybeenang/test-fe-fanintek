import { createFileRoute } from "@tanstack/react-router";
import PokemonCard from "../components/PokemonCard";
import { usePokemonByName, usePokemonList } from "../hooks/usePokemonQuery";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [pagination, setPagination] = useState({ limit: 8, offset: 0 });
  const [search, setSearch] = useState("");

  const { data, isLoading, error } = usePokemonList({
    limit: pagination.limit,
    offset: pagination.offset,
  });

  const {
    data: searchData,
    isLoading: loadingSearch,
    error: errorSearch,
  } = usePokemonByName(search);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchValue = formData.get("search") as string;
    setSearch(searchValue.trim().toLowerCase());
  };

  // Handle pagination logic
  const handleNextPage = () => {
    if (data && data.length > 0) {
      setPagination((prev) => ({
        ...prev,
        offset: prev.offset + prev.limit,
        limit: prev.limit,
      }));
    }
  };

  const handlePreviousPage = () => {
    setPagination((prev) => ({
      offset: Math.max(0, prev.offset - prev.limit),
      limit: prev.limit,
    }));
  };

  if (error) {
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );
  }

  return (
    <div className="relative w-full h-full flex flex-col items-center bg-gradient-to-t from-blue-50 to-blue-100 min-h-screen pt-8">
      {/* Judul Halaman */}
      <div className="text-center mb-8">
        <h1 className="text-5xl md:text-7xl font-black text-gray-800 tracking-tighter">
          POKEMON <span className="text-green-500">⚡️</span> CARDS
        </h1>
      </div>

      {/* search bar dan pagination */}
      <div className="w-full max-w-2xl mx-auto px-4 z-20">
        <form
          className="flex items-center space-x-2 mb-4"
          onSubmit={handleSearch}
          autoComplete="off"
          noValidate
        >
          <input
            type="text"
            name="search"
            placeholder="Cari Pokémon dengan nama"
            className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none transition"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition shadow-md"
          >
            Cari
          </button>
        </form>
        <div className="flex justify-between items-center">
          <button
            onClick={(e) => {
              e.preventDefault();
              handlePreviousPage();
            }}
            disabled={pagination.offset === 0}
            className="px-5 py-2 bg-white text-gray-800 font-semibold rounded-lg hover:bg-gray-200 transition shadow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sebelumnya
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleNextPage();
            }}
            disabled={!data || data.length < pagination.limit}
            className="px-5 py-2 bg-white text-gray-800 font-semibold rounded-lg hover:bg-gray-200 transition shadow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Berikutnya
          </button>
        </div>
      </div>

      {/* Loading Spinner */}
      {isLoading ||
        (loadingSearch && (
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mt-8"></div>
        ))}

      {/* Error Search */}
      {errorSearch &&
        search?.trim() !== "" &&
        !loadingSearch &&
        !searchData && (
          <div className="text-center text-red-500 mt-8">
            Pokémon tidak ditemukan. Silakan coba lagi dengan nama yang berbeda.
          </div>
        )}

      {/* Search Results */}
      {searchData && !loadingSearch && search && search?.trim() !== "" && (
        <div className="relative w-full h-80 flex items-center justify-center">
          <AnimatePresence>
            <motion.div
              custom={0}
              variants={{
                initial: { opacity: 0, y: 0, rotate: 0 },
                animate: (i) => ({
                  opacity: 1,
                  y: 0,
                  rotate: (i - 0) * 8, // Menghitung rotasi untuk setiap kartu
                  transition: {
                    delay: i * 0.1,
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                  },
                }),
              }}
              initial="initial"
              animate="animate"
              style={{
                transformOrigin: "bottom center",
                zIndex: 1,
              }}
            >
              <PokemonCard pokemon={searchData} />
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/*handle error*/}
      {data &&
        !isLoading &&
        !error &&
        data.length !== 0 &&
        search?.trim() === "" && (
          <div className="relative w-full h-80 flex items-center justify-center">
            <AnimatePresence>
              {data.map((p, i) => (
                <motion.div
                  key={p.id}
                  custom={i}
                  variants={{
                    initial: { opacity: 0, y: 0, rotate: 0 },
                    animate: (i) => ({
                      opacity: 1,
                      y: 0,
                      rotate: (i - (data?.length - 1) / 2) * 8, // Menghitung rotasi untuk setiap kartu
                      transition: {
                        delay: i * 0.1,
                        type: "spring",
                        stiffness: 100,
                        damping: 20,
                      },
                    }),
                  }}
                  initial="initial"
                  animate="animate"
                  style={{
                    transformOrigin: "bottom center",
                    zIndex: data.length - Math.abs(i - (data.length - 1) / 2),
                  }}
                >
                  <PokemonCard pokemon={p} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
    </div>
  );
}
