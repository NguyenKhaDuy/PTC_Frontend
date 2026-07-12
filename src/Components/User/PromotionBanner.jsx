export default function PromotionBanner() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden">
          <img
            src="https://picsum.photos/1400/500"
            className="h-[430px] w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent">
            <div className="h-full flex items-center ml-20">
              <div>
                <p className="uppercase tracking-[6px] text-[#AA7D36]">
                  Membership
                </p>

                <h2 className="text-6xl font-black mt-4">VIP MEMBER</h2>

                <p className="text-xl text-gray-300 mt-5">
                  Giảm đến 50% giá vé và combo.
                </p>

                <button className="mt-10 px-8 py-4 rounded-full bg-[#AA7D36] hover:bg-[#8f6424]">
                  Khám phá
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
