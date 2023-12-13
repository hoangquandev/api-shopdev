const router = require('express').Router()
const ctrls = require('../controllers/category.controller')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')



router.post('/', [verifyAccessToken, isAdmin], ctrls.createCategory)
router.get('/', ctrls.getCategories)


router.put('/:pid', [verifyAccessToken, isAdmin], ctrls.updateCategory)
router.delete('/:pid', [verifyAccessToken, isAdmin], ctrls.deleteCategory)
// router.get('/:pid', ctrls.getProduct)


module.exports = router