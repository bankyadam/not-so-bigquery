module.exports = (_req, res, next) => {
  res.set({
    'x-content-type-options': 'nosniff',
    'x-frame-options': 'SAMEORIGIN',
    'x-xss-protection': '0'
  });
  next();
};
