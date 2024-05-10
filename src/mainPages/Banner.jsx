import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

const Banner = () => {
  return (
    <section className="w-full px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto">
      <div>
        <span className="block mb-4 text-xs md:text-sm text-indigo-500 font-medium">
        Life is uncertain. Eat dessert first.
        </span>
        <h3 className="text-4xl md:text-6xl font-semibold">
        Explore Culinary Excellence at Foodie Zone
        </h3>
        <p className="text-base md:text-lg my-4 md:my-6">
        Indulge in a symphony of tastes at Foodie Zone, where passion meets palate. From sizzling steaks to delicate pastries, each dish is crafted with care to tantalize your senses and leave you craving for more. Join us for an unforgettable culinary journey.
        </p>
        <NavLink to="/all-foods" className="bg-indigo-500 text-white font-medium py-2 px-4 btn rounded transition-all hover:bg-indigo-600 active:scale-95">
          All Foods
        </NavLink>
      </div>
      <ShuffleGrid />
    </section>
  );
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const squareData = [
  {
    id: 1,
    src: "https://i.ibb.co/vQn7zBR/19-Best-Healthy-Restaurants-in-Sydney-1200x800.jpg",
  },
  {
    id: 2,
    src: "https://i.ibb.co/XLdkxm4/OIP-1.jpg",
  },
  {
    id: 3,
    src: "https://i.ibb.co/dM0QcLF/OIP-2.jpg",
  },
  {
    id: 4,
    src: "https://i.ibb.co/vhhmLQR/OIP.jpg",
  },
  {
    id: 5,
    src: "https://i.ibb.co/Js3MJ75/R-1.jpg",
  },
  {
    id: 6,
    src: "https://i.ibb.co/88B6LqV/R-2.jpg",
  },
  {
    id: 7,
    src: "https://i.ibb.co/g4KHQVQ/R-3.jpg",
  },
  {
    id: 8,
    src: "https://i.ibb.co/9V9xqhT/R-4.jpg",
  },
  {
    id: 9,
    src: "https://i.ibb.co/pxrcn66/R.jpg",
  },
  {
    id: 10,
    src: "https://i.ibb.co/t86rMLD/R-4.jpg",
  },
  {
    id: 11,
    src: "https://i.ibb.co/1Q2Dc6T/OIP-3.jpg",
  },
  {
    id: 12,
    src: "https://i.ibb.co/bgwdRNY/OIP-4.jpg",
  },
  {
    id: 13,
    src: "https://i.ibb.co/FWp3vyc/OIP-5.jpg",
  },
  {
    id: 14,
    src: "https://i.ibb.co/gVvvyq2/R-5.jpg",
  },
  {
    id: 15,
    src: "https://i.ibb.co/JHtRvLy/OIP-6.jpg",
  },
  {
    id: 16,
    src: "https://i.ibb.co/SBp20Qj/OIP-7.jpg",
  },
];

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => clearTimeout(timeoutRef.current);
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1">
      {squares.map((sq) => sq)}
    </div>
  );
};

export default Banner;