import { Star } from "lucide-react";

export default function ReviewSection({ reviews = [] }) {
  const decodeImage = (base64) => {
    if (!base64) return "https://i.pravatar.cc/100";
    return `data:image/jpeg;base64,${base64}`;
  };

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Đánh giá từ khán giả</h2>

      <div className="space-y-5">
        {reviews.length === 0 && (
          <p className="text-gray-500">Chưa có đánh giá</p>
        )}

        {reviews.map((review, index) => (
          <div
            key={review.id || index}
            className="bg-[#171717] rounded-2xl border border-[#2a2a2a] p-6"
          >
            <div className="flex gap-4">
              {/* AVATAR */}
              <img
                src={decodeImage(review.avatar)}
                alt={review.user}
                className="w-14 h-14 rounded-full object-cover"
              />

              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold">{review.nameUser}</h3>

                    <p className="text-gray-500 text-sm">{review.date}</p>
                  </div>

                  {/* STARS */}
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={18}
                        className={
                          star <= review.star
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-500"
                        }
                      />
                    ))}
                  </div>
                </div>

                <p className="text-gray-300 mt-4 leading-7">{review.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
