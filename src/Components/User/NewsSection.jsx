import SectionTitle from "./SectionTitle";

export default function NewsSection() {
  return (
    <section className="max-w-7xl mx-auto py-24">
      <SectionTitle title="Tin tức & Khuyến mãi" />

      <div className="grid lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="rounded-2xl overflow-hidden bg-[#151515] border border-[#AA7D36]/20 hover:border-[#AA7D36]"
          >
            <img
              src={`https://picsum.photos/600/350?random=${item}`}
              className="h-56 w-full object-cover"
            />

            <div className="p-6">
              <h3 className="text-2xl font-bold">Khuyến mãi mùa hè</h3>

              <p className="text-gray-400 mt-4">
                Đặt vé online nhận nhiều ưu đãi hấp dẫn.
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
