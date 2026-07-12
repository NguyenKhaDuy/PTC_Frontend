import PromotionCard from "./PromotionCard";

export default function PromotionGrid({ data }) {
  return (
    <div className="max-w-6xl mx-auto px-4 mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((item) => (
        <PromotionCard key={item.id} item={item} />
      ))}
    </div>
  );
}
