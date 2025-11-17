import ArrowLeft from "../../assets/icons/arrow-left.svg";
import X from "../../assets/icons/x.svg";
import Minus from "../../assets/icons/minus.svg";
import Plus from "../../assets/icons/plus.svg";

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
    items.map((i) =>
        i.id === id ? { ...i, weeks: Math.max(1, i.weeks + delta) } : i
    )
    );
};

const removeItem = (id: string) => {
    setCartItems((items) => items.filter((i) => i.id !== id));
};

const calculateTotal = () =>
    cartItems.reduce((total, i) => total + i.price * i.weeks, 0);

const handleCheckout = () => {
    if (cartItems.length === 0) return;
    setSaving(true);

    setTimeout(() => {
    setCartItems([]);
    alert("Checkout successful! (Frontend only)");
    setSaving(false);
    }, 800);
};

return (
    <div
    className="min-h-screen bg-black-35 text-white"
    style={{ fontFamily: "Inria Sans, sans-serif" }}
    >
    <style>{`
        :root {
        --color-shrek: #D5FF5F;
        --color-black-35: #14151A;
        --color-black-34: #2D2D35;
        --color-donkey-30: #747474;
        --color-donkey-20: #989898;
        --color-donkey-10: #B5B5B5;
        --color-white: #E8E8E8;
        }
        .bg-black-35 { background-color: var(--color-black-35); }
        .bg-black-34 { background-color: var(--color-black-34); }
        .bg-donkey-30 { background-color: var(--color-donkey-30); }
        .bg-donkey-20 { background-color: var(--color-donkey-20); }
        .bg-donkey-10 { background-color: var(--color-donkey-10); }
        .text-donkey-20 { color: var(--color-donkey-20); }
        .text-donkey-10 { color: var(--color-donkey-10); }
        .bg-shrek { background-color: var(--color-shrek); }
        .text-shrek { color: var(--color-shrek); }
    `}</style>

    <header className="bg-black-34 border-b border-donkey-30 border-opacity-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold tracking-wide">
            <span className="text-shrek">CORE</span> LAB
            </h1>
        </div>

        <button className="bg-shrek text-black-35 px-6 py-2 rounded-full font-bold hover:bg-opacity-90 transition-all">
            GET STARTED
        </button>
        </div>
    </header>

    <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center gap-4 mb-8">
        <button className="p-2 hover:text-shrek transition-colors">
            <img src={ArrowLeft} alt="back" className="w-8 h-8" />
        </button>

        <div>
            <h2 className="text-4xl font-bold mb-2 text-shrek">MY CART</h2>
            <p className="text-donkey-10">
            Find the perfect workout to match your goals.
            </p>
        </div>
        </div>

        <div className="max-w-5xl mx-auto">
        {loading ? (
            <div className="text-center py-20 text-2xl text-donkey-10">
            Loading cart...
            </div>
        ) : cartItems.length === 0 ? (
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

                {cartItems.map((item) => (
                <div
                    key={item.id}
                    className="grid grid-cols-12 gap-4 px-8 py-6 border-b-2 border-black-35 items-center"
                >
                    <div className="col-span-3 font-bold text-black-35 text-lg">
                    {item.name}
                    </div>
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
        </div>
    </main>
    </div>
);
}
