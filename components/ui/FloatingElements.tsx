import { motion } from 'framer-motion';

export function FloatingElements() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* Large floating orb in top-right */}
      <motion.div
        className="absolute top-1/4 -right-20 w-80 h-80 bg-cyan-400/20 rounded-full filter blur-3xl"
        animate={{
          y: [0, -40, 0],
          x: [0, -20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      />

      {/* Medium floating orb in bottom-left */}
      <motion.div
        className="absolute bottom-1/4 -left-20 w-60 h-60 bg-indigo-400/20 rounded-full filter blur-3xl"
        animate={{
          y: [0, 30, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 15,
          delay: 2,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      />

      {/* Small floating dots */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/10"
          style={{
            width: Math.random() * 12 + 4 + 'px',
            height: Math.random() * 12 + 4 + 'px',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 8 + Math.random() * 10,
            delay: Math.random() * 5,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      ))}
    </div>
  );
}
