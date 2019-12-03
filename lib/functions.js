const flatten = arr =>
  arr.reduce((acc, next) => acc.concat(Array.isArray(next) ? flatten(next) : next), []);

const getImgurLink = id => `https://i.imgur.com/${id}.png`;

module.exports = {
  flatten,
  getImgurLink
};
