function createLink(filename) {
  return `<a href="/${encodeURIComponent(filename)}">${filename}</a><br>\n`;
}

module.exports = {
  createLink,
};
