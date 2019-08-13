var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/test', function(req, res, next) {

  logger.fatal("test info")
  logger.error("test info")
  logger.warn("test info")
  logger.info("test info ==>", req.query.code)
  logger.debug("test info")
  logger.trace("test info")
  
  res.send("/test")
});

module.exports = router;
