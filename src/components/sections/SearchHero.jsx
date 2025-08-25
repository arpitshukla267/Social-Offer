import Hero from "../ui/Hero";

export default function HomePage() {
  return (
    <div className="lg:mt-30">
        <Hero
          buttonText="Search"
          title="Find and Hire Influencers in Seconds on the Marketplace"
          descriptionBlocks={[
            {
              heading: "Search Influencers",
              text: "Search thousands of vetted Instagram, TikTok, and YouTube influencers.",
            },
            {
              heading: "Purchase & Chat Securely",
              text: "Safely purchase and communicate through our platform. We hold your payment until the work is completed.",
            },
            {
              heading: "Receive Quality Content",
              text: "Receive your high-quality content from influencers directly through the platform.",
            },
          ]}
          imageSrc="/hero/marketplace.png" // replace with your image
        />
        <div className="mt-10 px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
              <span className="text-pink-500 text-2xl">💲</span>
              <h3 className="font-bold text-lg mt-2">No Upfront Cost</h3>
              <p className="text-gray-600 text-sm mt-1">
                Search influencers for free. No subscriptions, contracts, or hidden fees.
              </p>
            </div>
        
            {/* Card 2 */}
            <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
              <span className="text-pink-500 text-2xl">✔️</span>
              <h3 className="font-bold text-lg mt-2">Vetted Influencers</h3>
              <p className="text-gray-600 text-sm mt-1">
                Every influencer is vetted by us. Always receive high-quality, professional content.
              </p>
            </div>
        
            {/* Card 3 */}
            <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
              <span className="text-pink-500 text-2xl">💬</span>
              <h3 className="font-bold text-lg mt-2">Instant Chat</h3>
              <p className="text-gray-600 text-sm mt-1">
                Instantly chat with influencers and stay in touch throughout the whole transaction.
              </p>
            </div>
        
            {/* Card 4 */}
            <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
              <span className="text-pink-500 text-2xl">🔒</span>
              <h3 className="font-bold text-lg mt-2">Secure Purchases</h3>
              <p className="text-gray-600 text-sm mt-1">
                Your money is held safely until you approve the influencer’s work.
              </p>
            </div>
          </div>
        </div>
        
    </div>
  );
}
