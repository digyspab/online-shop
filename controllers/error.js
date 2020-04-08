/**
 * @param 
 * @description this controller handle all unhandled routes of page
 * @method GET
 */
exports.get404 = (req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found', path: '/404' });
};
