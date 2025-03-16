import Image from "next/image";
import Link from "next/link";

const Recommended: React.FC = () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-6">
        {/* Recommended By */}
        <div id="Recommendation" className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">RECOMMENDED BY</h2>
          <div className="flex flex-wrap justify-center gap-6 mt-6">
            {["1.5.jpg", "RWANDAN COFFE.jpeg", "INDIA.jpg", "logo.jpg"].map(
              (img, index) => (
                <div key={index} className="w-40 h-40">
                  <Image
                    src={`/images/${img}`}
                    alt="Recommended Coffee"
                    width={160}
                    height={160}
                    className="rounded-lg shadow-md object-cover w-full h-full"
                  />
                </div>
              )
            )}
          </div>
        </div>

        {/* How It Works */}
        <div id="how-it-works bg-transparent" className="text-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { img: "1.9.jpg", title: "KINDRED, Limited-Release Holiday Coffee", price: "$50.00" },
              { img: "1.8.jpg", title: "TRIPLE DOUBLE", price: "$70.00" },
              { img: "1.7.jpg", title: "RWANDA THE HEART OF AFRICA", price: "$100.00" },
              { img: "1.6.jpg", title: "ETHIOPIA ARSI NATURAL", price: "$120.00" },
            ].map((item, index) => (
              <div key={index} className="bg-white shadow-lg p-4 rounded-lg transform transition-all hover:scale-105">
                <Image
                  src={`/images/${item.img}`}
                  alt={item.title}
                  width={250}
                  height={250}
                  className="rounded-md mx-auto"
                />
                <h3 className="mt-4 text-lg font-semibold text-gray-800">{item.title}</h3>
                <p className="text-gray-600">{item.price}</p>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="mt-8">
            <Link href="/ourcoffee">
              <button className="bg-black text-white py-3 px-6 rounded-lg text-lg font-semibold transition-all hover:bg-gray-800">
                View All
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Recommended;
