import { Users } from "lucide-react";

export default function CastSection({ casts = [] }) {
  const decodeImage = (base64) => {
    if (!base64) return "https://via.placeholder.com/300x400";
    return `data:image/jpeg;base64,${base64}`;
  };

  return (
    <section className="mt-12">
      <h2 className="flex items-center gap-3 text-2xl font-bold mb-6">
        <Users className="text-[#AA7D36]" />
        Diễn viên
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {casts?.map((actor, index) => (
          <div
            key={actor.idActor || index}
            className="bg-[#171717] rounded-2xl overflow-hidden border border-[#2a2a2a] hover:border-[#AA7D36] transition"
          >
            {/* IMAGE */}
            <img
              src={decodeImage(actor.image)}
              alt={actor.name}
              className="w-full h-64 object-cover"
            />

            {/* INFO */}
            <div className="p-4">
              <h3 className="font-semibold text-sm line-clamp-1">
                {actor.name}
              </h3>

              <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                {actor.description}
              </p>

              {/* MAIN ACTOR BADGE */}
              {actor._main && (
                <span className="inline-block mt-2 text-[10px] px-2 py-1 bg-[#AA7D36] rounded-full">
                  Nhân vật chính
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
