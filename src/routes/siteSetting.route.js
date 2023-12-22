const express = require('express');
const router = express.Router();
const siteSettingController = require('../controllers/siteSetting.controller');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

// Define routes for site settings
router.get('', siteSettingController.getSiteSettings);
router.put('/update-general', verifyAccessToken, isAdmin, siteSettingController.updateGeneralSettings);
router.put('/update-topbar', verifyAccessToken, isAdmin, siteSettingController.updateTopbarSettings);
router.post('/add-banner', verifyAccessToken, isAdmin, siteSettingController.addBanner);
router.delete('/remove-banner/:bannerId', verifyAccessToken, isAdmin, siteSettingController.removeBanner);

module.exports = router;