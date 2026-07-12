export default function QuickActions({ questions, onSelect }) {
  return (
    <div className="px-4 pb-3 flex flex-wrap gap-2">
      {questions.map((q) => (
        <button
          key={q}
          onClick={() => onSelect(q)}
          className="
          text-xs
          bg-[#242424]
          px-3
          py-2
          rounded-full
          hover:bg-[#AA7D36]
          transition"
        >
          {q}
        </button>
      ))}
    </div>
  );
}
