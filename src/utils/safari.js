// from https://stackoverflow.com/questions/7944460/detect-safari-browser
export const isSafari = () => {
  const testSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  console.log(testSafari);
  return testSafari;
};
