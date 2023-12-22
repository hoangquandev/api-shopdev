const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('document');
});
router.get('/categories', (req, res) => {
    res.render('categoriesApi');
});
router.get('/brand', (req, res) => {
    res.render('brandsApi');
});
router.get('/products', (req, res) => {
    res.render('productApiDocumentation');
});

module.exports = router