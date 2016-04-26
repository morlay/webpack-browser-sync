import pathLib from 'path';

const getBaseDir = ({ path, publicPath }) => {
  if (!publicPath || publicPath === '/') {
    return path;
  }

  const relativePath = pathLib.resolve(publicPath)
    .split('/')
    .filter((item) => item.length)
    .map(() => '..')
    .join('/');

  return pathLib.join(path, relativePath);
};

export default getBaseDir;
