// src/component/shared/AuthTransitionWrapper.tsx
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';


interface AuthTransitionWrapperProps {
  children: ReactNode;
}

const AuthTransitionWrapper = ({ children }: AuthTransitionWrapperProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 1.34, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
};

export default AuthTransitionWrapper;
