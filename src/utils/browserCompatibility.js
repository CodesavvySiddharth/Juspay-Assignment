// src/utils/browserCompatibility.js
export const checkBrowserSupport = () => {
  const features = {
    flexbox: CSS.supports('display', 'flex'),
    grid: CSS.supports('display', 'grid'),
    customProperties: CSS.supports('--test', 'value'),
    localStorage: typeof Storage !== 'undefined'
  };
  
  console.log('Browser feature support:', features);
  return features;
};
