const shuffleAnswers = (opts) => {
  return opts.sort(() => Math.random() - 0.5);
};

export { shuffleAnswers };
