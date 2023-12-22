const router = require('express').Router()
const ctrls = require('../controllers/brand.controller')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')



router.post('/', [verifyAccessToken, isAdmin], ctrls.createBrand)
router.get('/', ctrls.getAllBrand)


router.get('/:brandId', ctrls.getBrand)
router.put('/:brandId', [verifyAccessToken, isAdmin], ctrls.updateBrand)
router.delete('/:brandId', [verifyAccessToken, isAdmin], ctrls.deleteBrand)


module.exports = router