import MovieCard from "./MovieCard";
import SectionTitle from "./SectionTitle";

export default function MovieSection({ title, icon, movies = [] }) {
  if (!movies.length) return null;

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-5">
        <SectionTitle title={title} icon={icon} />

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {movies.map((movie) => (
            <MovieCard key={movie.idMovie} item={movie} />
          ))}
        </div>
      </div>
    </section>
  );
}
