export default function FloatingButton({ logo, onClick }) {
  return (
    <button
      onClick={onClick}
      className="
      fixed
      bottom-6
      right-6
      z-50
      w-16
      h-16
      rounded-full
      bg-white
      hover:scale-110
      transition-all
      duration-300
      shadow-[0_0_35px_rgba(170,125,54,.45)]
      border-2
      border-[#AA7D36]
      flex
      items-center
      justify-center
      overflow-hidden"
    >
      <img src={logo} alt="" className="w-15 h-15 object-contain" />
    </button>
  );
}
