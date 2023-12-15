const router = require('express').Router()
const ctrls = require('../controllers/brand.controller')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')



router.post('/', [verifyAccessToken, isAdmin], ctrls.createBrand)
router.get('/', ctrls.getBrands)


router.put('/:pid', [verifyAccessToken, isAdmin], ctrls.updateBrand)
router.delete('/:pid', [verifyAccessToken, isAdmin], ctrls.deleteBrand)
// router.get('/:pid', ctrls.getProduct)


module.exports = router