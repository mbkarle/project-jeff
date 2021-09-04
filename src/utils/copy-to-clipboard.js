const copyToClipboard = (text) => {
  const type = "text/plain";
  const data = [new ClipboardItem({ [type]: new Blob([text], { type }) })];
  return navigator?.clipboard?.write(data);
};

export default copyToClipboard;
