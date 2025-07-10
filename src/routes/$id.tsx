import { createFileRoute, Link } from "@tanstack/react-router";
import { usePokemonByName } from "../hooks/usePokemonQuery";
import PokemonCard from "../components/PokemonCard";
import PokemonDetail from "../components/PokemonDetail";

export const Route = createFileRoute("/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();

  const { data, isLoading, error } = usePokemonByName(id);

  return (
    <div className="relative w-full h-full flex flex-col items-center bg-gradient-to-t from-blue-50 to-blue-100 min-h-screen pt-8">
      {/* Back Button */}
      <Link
        to="/"
        className="absolute top-4 left-4 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 transition-colors"
      >
        Back to List
      </Link>

      {/* Loading */}
      {isLoading && <div className="text-center text-gray-600">Loading...</div>}

      {/* Error Handling */}
      {error && (
        <div className="text-center text-red-500">Error: {error.message}</div>
      )}

      <h1 className="text-5xl md:text-7xl font-black text-gray-800 tracking-tighter text-center mt-8">
        {data?.name.toUpperCase()} <span className="text-green-500">⚡️</span>
      </h1>
      {data && <PokemonDetail pokemon={data} key={data.id} />}
    </div>
  );
}
