export default function Homepage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-teal-500/20 to-green-500/20"></div>
        
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8">
              <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                #1 Rated in Florida Keys
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
              <span className="text-gray-900">Key Largo</span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-teal-500 to-green-500 bg-clip-text text-transparent">
                Scuba Diving
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Premium scuba diving tours and certification in Key Largo, Florida Keys. 
              Experience the magic beneath the surface with our world-famous diving experiences.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg px-8 py-4 rounded-lg transition-colors">
                Book Adventure
              </button>
              <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold text-lg px-8 py-4 rounded-lg transition-colors">
                View Certifications
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Why Choose Key Largo Scuba Diving
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              25+ years of diving excellence with professional instruction and world-class equipment
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">PADI Certified</h3>
              <p className="text-gray-600">Professional PADI instruction from beginner to advanced levels</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-teal-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-teal-600 rounded"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Premium Equipment</h3>
              <p className="text-gray-600">Platinum ScubaPro dealer with top-quality diving equipment</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-green-600 rounded"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Crystal Waters</h3>
              <p className="text-gray-600">Explore pristine coral reefs and famous diving sites in Key Largo</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Tours Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Popular Adventures</h2>
            <p className="text-xl text-gray-600">Discover the underwater wonders of the Florida Keys</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Christ of the Abyss</h3>
                <p className="text-gray-600 mb-4">Experience the world-famous 9-foot bronze Christ statue</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600">$89</span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-teal-400 to-teal-600"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Coral Gardens</h3>
                <p className="text-gray-600 mb-4">Explore pristine coral gardens with vibrant marine life</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-teal-600">$125</span>
                  <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-green-400 to-green-600"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Spiegel Grove Wreck</h3>
                <p className="text-gray-600 mb-4">Dive the massive 510-foot Navy ship wreck</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-green-600">$145</span>
                  <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Dive In?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied divers who have experienced the magic of Key Largo's underwater world
          </p>
          <button className="bg-white text-blue-600 font-semibold text-lg px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors">
            Start Your Adventure Today
          </button>
        </div>
      </section>
    </div>
  );
}
