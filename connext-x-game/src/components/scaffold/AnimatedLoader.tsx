import { motion } from "motion/react";

const AnimatedLoader = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }} // The exit animation
      transition={{ duration: 3 }}
      className="loader"
      key="loader"
    >
      {/* Your spinner or loader UI */}
      <h1>Loading...</h1>
    </motion.div>
  );
};

export default AnimatedLoader;
