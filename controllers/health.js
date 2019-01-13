const health = (req, res) => {
  res.send({
    status: 200,
    statusText: 'ok',
  });
};

module.exports = health;
