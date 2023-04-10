import { motion } from 'framer-motion';

export interface Props {
  children: JSX.Element;
  animationType?: 'vertical' | 'horizontal-toleft' | 'horizontal-toright';
}

const AnimatedPage = ({ children, animationType = 'vertical' }: Props) => {
  switch (animationType) {
    case 'vertical':
      return (
        <motion.div
          initial={{ opacity: 0, y: 400 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -400 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      );
    case 'horizontal-toleft':
      return (
        <motion.div
          initial={{ opacity: 0, x: 400 }}
          animate={{ opacity: 1, x: 0 }}
          // exit={{ opacity: 0, x: -400 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      );
    case 'horizontal-toright':
      return (
        <motion.div
          initial={{ opacity: 0, x: -400 }}
          animate={{ opacity: 1, x: 0 }}
          // exit={{ opacity: 0, x: 400 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      );

    default:
      return null;
  }
};

export default AnimatedPage;
