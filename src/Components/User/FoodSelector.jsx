import { Popcorn, CupSoda, Plus, Minus } from "lucide-react";

export default function FoodSelector({
  foods,
  drinks,
  selectedFoods,
  setSelectedFoods,
  selectedDrinks,
  setSelectedDrinks,
}) {
  // ================= FOOD =================

  const selectFoodSize = (food, sizeObj) => {
    const size = sizeObj || food.foodSize[0];

    setSelectedFoods((prev) => {
      const exist = prev.find((i) => i.idFood === food.idFood);

      if (exist) {
        return prev.map((i) =>
          i.idFood === food.idFood
            ? {
                ...i,
                idSize: size.idSize,
                size: size.size,
                price: size.price,
              }
            : i,
        );
      }

      return [
        ...prev,
        {
          idFood: food.idFood,
          idSize: size.idSize,
          name: food.name,
          size: size.size,
          quantity: 1,
          price: size.price,
        },
      ];
    });
  };

  const increaseFood = (food) => {
    setSelectedFoods((prev) =>
      prev.map((i) =>
        i.idFood === food.idFood ? { ...i, quantity: i.quantity + 1 } : i,
      ),
    );
  };

  const decreaseFood = (food) => {
    setSelectedFoods((prev) =>
      prev
        .map((i) =>
          i.idFood === food.idFood ? { ...i, quantity: i.quantity - 1 } : i,
        )
        .filter((i) => i.quantity > 0),
    );
  };

  // ================= DRINK =================

  const selectDrinkSize = (drink, sizeObj) => {
    const size = sizeObj || drink.drinkSizeDTOS[0];

    setSelectedDrinks((prev) => {
      const exist = prev.find((i) => i.idDrink === drink.idDrink);

      if (exist) {
        return prev.map((i) =>
          i.idDrink === drink.idDrink
            ? {
                ...i,
                idSize: size.idSize,
                size: size.size,
                price: size.price,
              }
            : i,
        );
      }

      return [
        ...prev,
        {
          idDrink: drink.idDrink,
          idSize: size.idSize,
          name: drink.name,
          size: size.size,
          quantity: 1,
          price: size.price,
        },
      ];
    });
  };

  const increaseDrink = (drink) => {
    setSelectedDrinks((prev) =>
      prev.map((i) =>
        i.idDrink === drink.idDrink ? { ...i, quantity: i.quantity + 1 } : i,
      ),
    );
  };

  const decreaseDrink = (drink) => {
    setSelectedDrinks((prev) =>
      prev
        .map((i) =>
          i.idDrink === drink.idDrink ? { ...i, quantity: i.quantity - 1 } : i,
        )
        .filter((i) => i.quantity > 0),
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 mb-10">
      {/* ================= FOOD ================= */}
      <div>
        <h2 className="flex items-center gap-2 text-2xl font-bold mb-6">
          <Popcorn size={28} className="text-[#AA7D36]" />
          Đồ ăn
        </h2>

        <div className="grid gap-4">
          {foods.map((food) => {
            const selected = selectedFoods.find(
              (i) => i.idFood === food.idFood,
            );

            return (
              <div
                key={food.idFood}
                className="flex justify-between items-center bg-[#1c1c1c] rounded-2xl p-5"
              >
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{food.name}</h3>

                  <div className="flex gap-2 mt-4">
                    {food.foodSize.map((size) => (
                      <button
                        key={size.idSize}
                        onClick={() => selectFoodSize(food, size)}
                        className={`px-3 py-1 rounded-full ${
                          selected?.idSize === size.idSize
                            ? "bg-[#AA7D36]"
                            : "bg-[#333]"
                        }`}
                      >
                        {size.size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-[#AA7D36] font-bold">
                    {(
                      selected?.price ?? food.foodSize[0].price
                    ).toLocaleString()}
                    đ
                  </p>

                  {!selected ? (
                    <button
                      onClick={() => selectFoodSize(food)}
                      className="mt-3 bg-[#AA7D36] rounded-full w-10 h-10 flex justify-center items-center"
                    >
                      <Plus size={18} />
                    </button>
                  ) : (
                    <div className="flex items-center gap-3 mt-3">
                      <button onClick={() => decreaseFood(food)}>
                        <Minus />
                      </button>

                      <span>{selected.quantity}</span>

                      <button onClick={() => increaseFood(food)}>
                        <Plus />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= DRINK ================= */}
      <div>
        <h2 className="flex items-center gap-2 text-2xl font-bold mb-6">
          <CupSoda size={28} className="text-[#AA7D36]" />
          Thức uống
        </h2>

        <div className="grid gap-4">
          {drinks.map((drink) => {
            const selected = selectedDrinks.find(
              (i) => i.idDrink === drink.idDrink,
            );

            return (
              <div
                key={drink.idDrink}
                className="flex justify-between items-center bg-[#1c1c1c] rounded-2xl p-5"
              >
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{drink.name}</h3>

                  <div className="flex gap-2 mt-4">
                    {drink.drinkSizeDTOS.map((size) => (
                      <button
                        key={size.idSize}
                        onClick={() => selectDrinkSize(drink, size)}
                        className={`px-3 py-1 rounded-full ${
                          selected?.idSize === size.idSize
                            ? "bg-[#AA7D36]"
                            : "bg-[#333]"
                        }`}
                      >
                        {size.size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-[#AA7D36] font-bold">
                    {(
                      selected?.price ?? drink.drinkSizeDTOS[0].price
                    ).toLocaleString()}
                    đ
                  </p>

                  {!selected ? (
                    <button
                      onClick={() => selectDrinkSize(drink)}
                      className="mt-3 bg-[#AA7D36] rounded-full w-10 h-10 flex justify-center items-center"
                    >
                      <Plus size={18} />
                    </button>
                  ) : (
                    <div className="flex items-center gap-3 mt-3">
                      <button onClick={() => decreaseDrink(drink)}>
                        <Minus />
                      </button>

                      <span>{selected.quantity}</span>

                      <button onClick={() => increaseDrink(drink)}>
                        <Plus />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
