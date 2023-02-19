const truncateText = (string: string, letters: number) => {
  const text = string.slice(0, letters);

  return letters > string.length ? text : `${text}...`;
};

export { truncateText };
