import { useState, useEffect } from "react";
import { FaCrown, FaFire } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";


interface GameAccount {
  id: number;
  name?: string;
  price?: number;
  accountFeatures?: string[];
  moreFeat?: string[];
  images?: string[];
  videoLink?: string;
  status?: boolean;
  mythicsCount?: number;
  carsCount?: number;
  gunSkinsCount?: number;
  accountLevel?: string;
}

const API_URL = "https://api.jsonbin.io/v3/b/67e137188960c979a5776555/latest";
const MASTER_KEY = "$2a$10$I5TlPdgmFXBQwFjy5lEu0uXHy5oknyPrVX96.BQm8f7LhZjW03X1y";

const GameAccountsList = () => {
  const [accounts, setAccounts] = useState<GameAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch(API_URL, {
          headers: { "X-Master-Key": MASTER_KEY },
        });
        const data = await response.json();
        setAccounts(data.record || []);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAccounts();
  }, []);

  if (loading) return <p>Loading  accounts...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Game Accounts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((account) => (
          <div
            key={account.id}
            onClick={() => navigate(`/accounts/${account.id}`)}
            className="relative border rounded-lg shadow-lg p-6 bg-black cursor-pointer hover:shadow-xl transition"
          >
            {/* Status Banner */}
            <span
              className={`absolute top-2 right-2 px-3 py-2 text-sm font-semibold  ${
                account.status ? "bg-green-500 text-white" : "bg-red-500 text-white"
              }`}
            >
              {account.status ? "Available" : "Sold"}
            </span>
       <div className="flex items-center justify-between mt-4 mb-3">
                    <div>
                      <div className="text-[#f05454] flex items-center gap-2 text-sm font-bold">
                        <FaFire size={18} /> Fire Account
                      </div>
                      <h2 className="text-xl font-bold text-[#ffffff]">{account.name}</h2>
                      <p className="text-sm text-gray-400">Level <span className="text-yellow-200 font-bold">{account.accountLevel}</span></p>
                    </div>
                    <div className="text-yellow-400">
                      <FaCrown size={24} />
                    </div>
                  </div>



            {account.images && account.images.length > 0 && (
              <img
                src={account.images[0]}
                alt={account.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
            )}

<p className="text-sm text-gray-300 mb-5 uppercase">
              {account.accountFeatures?.join(" ").split(" ").slice(0, 10).join(" ")}...
            </p>

            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold text-[#ff5252]">
                ${account.price}.00 <span className=" font-thin text-sm text-gray-300">USD</span>
              </p>
              
            </div>



            <Link to={`/accounts/${account.id}`}>
                         <button className="mt-4 w-full bg-[transparent] border hover:bg-[#fff] hover:text-black text-white py-2 rounded-lg text-sm font-bold">
                           View Account
                         </button>
                       </Link>
           
                       {/* Footer */}
                       <div className="flex items-center justify-between mt-5 text-xs text-gray-400">
                         <div className="flex items-center">
                           <img
                             src={logo}
                             alt="Sultan Pubg Store"
                             className="w-6 h-6 mr-2 rounded-full border border-gray-700"
                           />
                           Sultan Pubg Store
                         </div>
                         <span className="text-green-500">100% Positive</span>
                       </div>
                    
          
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameAccountsList;
