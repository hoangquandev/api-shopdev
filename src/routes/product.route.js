const router = require('express').Router()
const ctrls = require('../controllers/product.controller')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')



router.post('/', [verifyAccessToken, isAdmin], ctrls.createProduct)
router.get('/', ctrls.getProducts)


router.put('/:id', [verifyAccessToken, isAdmin], ctrls.updateProduct)
router.delete('/:id', [verifyAccessToken, isAdmin], ctrls.deleteProduct)
router.get('/:slug', ctrls.getProduct)


module.exports = router