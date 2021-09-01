const handleShuffle = (opts) => {
  return opts.sort(() => Math.random() - 0.5);
};

export default handleShuffle;
