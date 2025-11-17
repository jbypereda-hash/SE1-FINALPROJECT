import ArrowLeft from "../../assets/icons/arrow-left.svg";
import X from "../../assets/icons/x.svg";
import Minus from "../../assets/icons/minus.svg";
import Plus from "../../assets/icons/plus.svg";
import { useEffect, useState } from "react";

interface Booking {
  id: string;
  name: string;
  schedule: string;
  price: number;
  weeks: number;
}

export default function ViewCart() {
  const [cartItems, setCartItems] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setLoading(true);

    const exampleItems: Booking[] = [
      {
        id: "client0001",
        name: "Strength Training",
        schedule: "Mon/Wed – 4:00 PM",
        price: 500,
        weeks: 1,
      },
      {
        id: "client0002",
        name: "Yoga Flex",
        schedule: "Tue/Thu – 6:30 PM",
        price: 450,
        weeks: 1,
      },
    ];

    setTimeout(() => {
      setCartItems(exampleItems);
      setLoading(false);
    }, 500);
  }, []);

  const updateWeeks = (id: string, delta: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, weeks: Math.max(1, item.weeks + delta) } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const calculateTotal = () =>
    cartItems.reduce((total: number, item: Booking) => total + item.price * item.weeks, 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    setSaving(true);

    setTimeout(() => {
      setCartItems([]);
      alert("Checkout successful! (Frontend only)");
      setSaving(false);
    }, 800);
  };

  if (loading) {
    return (
      <div className="text-white flex justify-center items-center min-h-screen">
        Loading cart...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black-35 text-white" style={{ fontFamily: "Inria Sans, sans-serif" }}>
      {/* Styles & header omitted for brevity, same as your version */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-2xl text-donkey-10 mb-4">Your cart is empty</div>
            <button className="bg-shrek text-black-35 px-10 py-3 rounded-full font-bold hover:bg-opacity-90 transition-all">
              Explore Classes
            </button>
          </div>
        ) : (
          <>
            <div className="bg-donkey-10 rounded-3xl overflow-hidden">
              <div className="grid grid-cols-12 gap-4 px-8 py-5 bg-donkey-20 border-b-2 border-black-35">
                <div className="col-span-3 font-bold text-black-35">CLASS:</div>
                <div className="col-span-3 font-bold text-black-35">SCHEDULE:</div>
                <div className="col-span-2 font-bold text-black-35">PRICE:</div>
                <div className="col-span-3 font-bold text-black-35">NO. OF WEEKS:</div>
                <div className="col-span-1"></div>
              </div>

              {cartItems.map((item: Booking) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 gap-4 px-8 py-6 border-b-2 border-black-35 items-center"
                >
                  <div className="col-span-3 font-bold text-black-35 text-lg">{item.name}</div>
                  <div className="col-span-3 text-black-35">{item.schedule}</div>
                  <div className="col-span-2 text-black-35 font-bold">
                    ₱ {item.price.toLocaleString()} / week
                  </div>

                  <div className="col-span-3 flex items-center gap-3">
                    <button
                      onClick={() => updateWeeks(item.id, -1)}
                      className="w-10 h-10 rounded-full bg-black-35 flex items-center justify-center hover:bg-opacity-80 transition-all"
                    >
                      <img src={Minus} alt="minus" className="w-4 h-4" />
                    </button>

                    <span className="text-black-35 font-bold text-xl min-w-[30px] text-center">
                      {item.weeks}
                    </span>

                    <button
                      onClick={() => updateWeeks(item.id, 1)}
                      className="w-10 h-10 rounded-full bg-black-35 flex items-center justify-center hover:bg-opacity-80 transition-all"
                    >
                      <img src={Plus} alt="plus" className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="col-span-1 flex justify-center">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="w-10 h-10 rounded-full bg-black-35 flex items-center justify-center hover:bg-opacity-80 transition-all"
                    >
                      <img src={X} alt="remove" className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="px-8 py-6 flex justify-end items-center gap-8 border-t-2 border-black-35">
                <span className="text-black-35 font-bold text-xl">TOTAL:</span>
                <span className="text-black-35 font-bold text-3xl">
                  ₱ {calculateTotal().toLocaleString()}
                </span>
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <button className="bg-shrek text-black-35 px-10 py-3 rounded-full font-bold hover:bg-opacity-90 transition-all text-base">
                Explore Classes
              </button>

              <button
                onClick={handleCheckout}
                disabled={saving}
                className="bg-shrek text-black-35 px-10 py-3 rounded-full font-bold hover:bg-opacity-90 transition-all text-base disabled:opacity-50"
              >
                {saving ? "Processing..." : "Proceed to Checkout"}
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
