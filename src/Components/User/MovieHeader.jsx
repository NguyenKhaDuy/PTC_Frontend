export default function MovieHeader({ movie }) {
  if (!movie) return null;

  return (
    <div className="max-w-6xl mx-auto mb-10">
      <div className="flex gap-8">
        <img
          src={`data:image/jpeg;base64,${movie.largeImage}`}
          className="w-72 rounded-2xl"
          alt={movie.nameMovie}
        />

        <div>
          <h1 className="text-4xl font-bold">{movie.nameMovie}</h1>

          <p className="mt-3 text-gray-400">{movie.shortDescription}</p>

          <div className="mt-6 space-y-2">
            <p>Đạo diễn: {movie.director}</p>
            <p>Thời lượng: {movie.duration} phút</p>
            <p>Thể loại: {movie.category}</p>
            <p>Ngôn ngữ: {movie.language}</p>
            <p>Rated: {movie.rated}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
