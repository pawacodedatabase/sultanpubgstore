
import game from '../images/banner_9.jpg'
const SultanSection = () => {
  return (
    <section className="bg-black text-white py-12 px-6">
     <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center py-10 px-4">
  {[
    {
      title: "Verified Sellers",
      desc: "Buy accounts from trusted, verified PUBG players.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-12 h-12 text-green-500 group-hover:scale-110 group-hover:text-green-400 transition-all duration-300"
        >
          <path
            fill="currentColor"
            d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V5zm-2 16l-4-4l1.41-1.41L10 14.17l6.59-6.59L18 9z"
          ></path>
        </svg>
      ),
    },
    {
      title: "Elite Account Stats",
      desc: "Top-tier PUBG accounts with rare outfits, high KD, and RP levels.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-12 h-12 text-yellow-500 group-hover:rotate-12 group-hover:text-yellow-400 transition-all duration-300"
        >
          <path
            fill="currentColor"
            d="M10.054 2.344a3 3 0 0 1 3.892 0l1.271 1.084a1 1 0 0 0 .57.236l1.665.133a3 3 0 0 1 2.751 2.751l.133 1.666a1 1 0 0 0 .236.569l1.084 1.271a3 3 0 0 1 0 3.892l-1.084 1.271a1 1 0 0 0-.236.57l-.133 1.665a3 3 0 0 1-2.751 2.751l-1.666.133a1 1 0 0 0-.569.236l-1.271 1.084a3 3 0 0 1-3.892 0l-1.271-1.084a1 1 0 0 0-.57-.236l-1.665-.133a3 3 0 0 1-2.751-2.751l-.133-1.666a1 1 0 0 0-.236-.569l-1.084-1.271a3 3 0 0 1 0-3.892l1.084-1.271a1 1 0 0 0 .236-.57l.133-1.665a3 3 0 0 1 2.751-2.751l1.666-.133a1 1 0 0 0 .569-.236l1.271-1.084zm5.653 8.363a1 1 0 0 0-1.414-1.414L11 12.586l-1.293-1.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4z"
          ></path>
        </svg>
      ),
    },
    {
      title: "Secure Transactions",
      desc: "Guaranteed safety for every purchase through our platform.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-12 h-12 text-blue-500 group-hover:scale-110 group-hover:text-blue-400 transition-all duration-300"
        >
          <path
            fill="currentColor"
            d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12m10-6a1 1 0 1 0-2 0v1H8a1 1 0 0 0 0 2h1v6H8a1 1 0 1 0 0 2h1v1a1 1 0 1 0 2 0v-1h1v1a1 1 0 1 0 2 0v-1c.493 0 1.211-.14 1.834-.588C16.51 15.925 17 15.126 17 14c0-.851-.281-1.516-.71-2c.429-.484.71-1.149.71-2c0-1.126-.491-1.926-1.166-2.412A3.23 3.23 0 0 0 14 7V6a1 1 0 1 0-2 0v1h-1zm0 5V9h3c.173 0 .456.06.666.212c.159.114.334.314.334.788s-.175.674-.334.789A1.25 1.25 0 0 1 14 11zm0 2h3c.173 0 .456.06.666.211c.159.115.334.315.334.789s-.175.674-.334.789A1.25 1.25 0 0 1 14 15h-3z"
          ></path>
        </svg>
      ),
    },
  ].map((item, i) => (
    <div
      key={i}
      className="group bg-[#111] p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 hover:bg-[#1a1a1a]"
    >
      <div className="flex justify-center mb-4">{item.icon}</div>
      <h3 className="text-xl font-semibold text-white">{item.title}</h3>
      <p className="text-sm text-gray-400 mt-2">{item.desc}</p>
    </div>
  ))}
</div>


      <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-10 max-w-6xl mx-auto">
        <div className="md:w-1/2">
          
          <p className="text-sm text-gray-300 mb-6">
            Explore a wide selection of premium PUBG Mobile accounts at unbeatable prices. Whether you're after mythic outfits, conqueror ranks, or high KD stats, Sultan has you covered.
          </p>
          
        </div>
        <div className="md:w-1/2">
          <div className="relative rounded-lg overflow-hidden">
            <img
              src={game}
              alt="Gaming Preview"
              className="w-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SultanSection;
