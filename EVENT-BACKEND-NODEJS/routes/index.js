import { Router } from 'express';

const router = Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { message: 'This is An api platform for Event managment app' , title : "Event Api Docs" });
});

export default router;
