import { motion } from 'framer-motion';

export interface Props {
  children: JSX.Element;
}

const AnimatedPage = ({ children }: Props) => (
  <div>
    <motion.div
      initial={{ opacity: 0, y: 400 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -400 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  </div>
);

export default AnimatedPage;
