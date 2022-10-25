import { motion } from "framer-motion";

const RedirectAnim = ({ children }) => {
  return (
    <motion.main
      variants={{
        hidden: { opacity: 0, x: -200, y: 0 },
        enter: { opacity: 1, x: 0, y: 0 },
        exit: { opacity: 0, x: 0, y: -100 },
      }}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ type: "linear" }}
    >
      {children}
    </motion.main>
  );
};

export default RedirectAnim;
