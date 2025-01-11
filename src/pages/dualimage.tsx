import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import image1Url from "../images/banner_3.jpg"; // Replace with your image path
import image2Url from "../images/banner_6.jpg"; // Replace with your image path

const DualImageComponent = () => {
  return (
    <motion.div
      className="relative w-full grid grid-cols-1 md:grid-cols-2"
      initial={{ opacity: 0, y: 50 }} // Starting state for the section
      whileInView={{ opacity: 1, y: 0 }} // Animate to this state when in view
      transition={{ duration: 0.8 }} // Animation duration
      viewport={{ once: true, amount: 0.2 }} // Trigger animation when 20% of the section is in view
    >
      {/* First Image */}
      <div className="relative h-full">
        <img
          src={image1Url}
          alt="First Collection"
          className="w-full h-full object-cover"
        />

        {/* Text and Link Overlay */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-between p-8"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Top-Left Text */}
          <h2 className="text-white text-lg md:text-xl font-thin">
         Explore New Arrivals
          </h2>

          {/* Bottom-Right Link */}
          <Link to="/new-arrivals" className="self-end">
            <p className="text-white underline text-sm md:text-lg">
              EXPLORE THIS COLLECTION
            </p>
          </Link>
        </motion.div>
      </div>

      {/* Second Image */}
      <div className="relative h-full">
        <img
          src={image2Url}
          alt="Second Collection"
          className="w-full h-full object-cover"
        />

        {/* Text and Link Overlay */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-between p-8"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {/* Top-Left Text */}
          <h2 className="text-white text-lg md:text-xl font-thin">
            SWAP / SELL YOUR ACCOUNT
          </h2>

          {/* Bottom-Right Link */}
          <Link to="/sell" className="self-end">
            <p className="text-white underline text-sm md:text-lg">
              EXPLORE THIS OFFER
            </p>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DualImageComponent;
