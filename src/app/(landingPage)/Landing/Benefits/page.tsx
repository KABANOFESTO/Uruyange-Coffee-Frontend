const Benefits: React.FC = () => {
    return (
      <section id="benefits" className="py-12 bg-transparent">
        <div className="container mx-auto px-6">
          {/* Section Title */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-white">Benefits</h1>
          </div>
  
          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Left Column */}
            <div className="bg-white shadow-lg rounded-lg p-6 transform transition-all hover:scale-105">
              <h3 className="text-xl font-semibold text-gray-800">Subscribe & Save</h3>
              <p className="text-gray-600 mt-2">Recurring subscription orders are discounted.</p>
  
              <h3 className="text-xl font-semibold text-gray-800 mt-6">Freshly Roasted</h3>
              <p className="text-gray-600 mt-2">
                Made to order and roasted the same day or the day before it was shipped.
              </p>
            </div>
  
            {/* Right Column */}
            <div className="bg-white shadow-lg rounded-lg p-6 transform transition-all hover:scale-105">
              <h3 className="text-xl font-semibold text-gray-800">Free Shipping</h3>
              <p className="text-gray-600 mt-2">
                All recurring subscriptions ship free regardless of the quantity. There is no minimum.
              </p>
  
              <h3 className="text-xl font-semibold text-gray-800 mt-6">Freshly Roasted</h3>
              <p className="text-gray-600 mt-2">
                Made to order and roasted the same day or the day before it was shipped.
              </p>
  
              <h3 className="text-xl font-semibold text-gray-800 mt-6">Earn Rewards Points</h3>
              <p className="text-gray-600 mt-2">
                Subscriptions earn points for the Mostra rewards program where you can redeem points for
                discounts on your purchases.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default Benefits;
  