export default function TrailerSection({ trailer }) {
  // convert youtube url -> embed url
  const getEmbedUrl = (url) => {
    if (!url) return null;

    try {
      const videoId = url.split("v=")[1]?.split("&")[0];
      if (!videoId) return null;
      return `https://www.youtube.com/embed/${videoId}`;
    } catch {
      return null;
    }
  };

  const embedUrl = getEmbedUrl(trailer);

  if (!embedUrl) return null;

  return (
    <section className="mt-24">
      <h2 className="text-3xl font-bold mb-8">Trailer</h2>

      <div className="aspect-video rounded-2xl overflow-hidden">
        <iframe
          className="w-full h-full"
          src={embedUrl}
          title="Trailer"
          allowFullScreen
        />
      </div>
    </section>
  );
}
