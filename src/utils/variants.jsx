export const moveIn = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.7,
    },
  },
  exit: {
    x: -3000,

    transition: {
      transition: { ease: "easeInOut" },
      duration: 0.3,
    },
  },
};

export const moveLeft = {
  hidden: {
    x: 3000,
  },
  visible: {
    x: 0,
    transition: {
      // type: "spring",
      // stiffness: 100,
      duration: 0.3,
    },
  },
  exit: {
    x: -3000,

    transition: {
      transition: { ease: "easeInOut" },
      duration: 0.3,
    },
  },
};

// modal

export const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
  exit: {
    opacity: 0,
    transition: {
      transition: { ease: "easeInOut" },
      duration: 0.3,
    },
  },
};

export const modal = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: {
    y: "0",
    opacity: 1,
    transition: { delay: 0.3 },
  },
  exit: {
    y: "-100vh",
    opacity: 0,
    transition: {
      transition: { ease: "easeInOut" },
      duration: 0.3,
    },
  },
};
