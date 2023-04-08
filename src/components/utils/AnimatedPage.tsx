import { motion } from 'framer-motion';

export interface Props {
  children: JSX.Element;
  animationType?: 'vertical' | 'horizontal-toleft' | 'horizontal-toright';
}

const AnimatedPage = ({ children, animationType = 'vertical' }: Props) => {
  switch (animationType) {
    case 'vertical':
      return (
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
    case 'horizontal-toleft':
      return (
        <div>
          <motion.div
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            // exit={{ opacity: 0, x: -400 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </div>
      );
    case 'horizontal-toright':
      return (
        <div>
          <motion.div
            initial={{ opacity: 0, x: -400 }}
            animate={{ opacity: 1, x: 0 }}
            // exit={{ opacity: 0, x: 400 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </div>
      );

    default:
      return null;
  }
};

export default AnimatedPage;
