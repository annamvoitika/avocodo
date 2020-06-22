var HomeController = {
  Index: function(req, res) {
    res.render('home/index', { title: 'Avocodo' });
  }
};

module.exports = HomeController;
