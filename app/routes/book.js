var express = require('express');
var router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
var book_controller = require('../controllers/book');


// a simple test url to check that all of our files are communicating correctly.
//router.get('/test', book_controller.test);

router.get('/', book_controller.getBooks);

router.post('/', book_controller.postBook);

router.get('/:id', book_controller.getBook);

router.put('/:id', book_controller.updateBook);

router.delete('/:id', book_controller.deleteBook);


module.exports = router;