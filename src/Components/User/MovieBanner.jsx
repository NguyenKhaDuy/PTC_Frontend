export default function MovieBanner() {
  return (
    <div
      className="relative h-[550px] bg-cover bg-center"
      style={{
        backgroundImage: "url(https://picsum.photos/1600/700?random=10)",
      }}
    >
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-black/40 to-transparent"></div>
    </div>
  );
}
