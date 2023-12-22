const SiteSetting = require('../models/siteSetting.model');
const sendResponse = require('../utils/sendResponse');

// Controller methods
const getSiteSettings = async (req, res) => {
    try {
        const siteSettings = await SiteSetting.findOne(); // Assuming only one site setting document
        sendResponse(res, 200, 'Site settings retrieved successfully', siteSettings);
    } catch (error) {
        sendResponse(res, 500, 'Internal Server Error', null, error);
    }
};

const updateGeneralSettings = async (req, res) => {
    const { logo, sitename, siteDescription } = req.body;

    try {
        let siteSettings = await SiteSetting.findOne();

        if (!siteSettings) {
            // If there are no existing site settings, create a new document
            siteSettings = new SiteSetting({
                general: {
                    logo,
                    sitename,
                    siteDescription,
                },
            });
        } else {
            // If site settings already exist, update the existing document
            siteSettings.general.logo = logo;
            siteSettings.general.sitename = sitename;
            siteSettings.general.siteDescription = siteDescription;
        }

        await siteSettings.save();

        sendResponse(res, 200, 'General settings updated successfully', siteSettings);
    } catch (error) {
        sendResponse(res, 500, 'Internal Server Error', null, error);
    }
};

const updateTopbarSettings = async (req, res) => {
    const { phone, email } = req.body;

    try {
        let siteSettings = await SiteSetting.findOne();

        if (!siteSettings) {
            // If there are no existing site settings, create a new document
            siteSettings = new SiteSetting({
                topbar: {
                    phone,
                    email,
                },
            });
        } else {
            // If site settings already exist, update the existing document
            siteSettings.topbar.phone = phone;
            siteSettings.topbar.email = email;
        }

        await siteSettings.save();

        sendResponse(res, 200, 'Topbar settings updated successfully', siteSettings);
    } catch (error) {
        sendResponse(res, 500, 'Internal Server Error', null, error);
    }
};

const addBanner = async (req, res) => {
    const { image } = req.body;

    try {
        let siteSettings = await SiteSetting.findOne();

        if (!siteSettings) {
            // If there are no existing site settings, create a new document
            siteSettings = new SiteSetting({
                bannerSlider: [{ image }],
            });
        } else {
            // If site settings already exist, add a new banner to the existing document
            siteSettings.bannerSlider.push({ image });
        }

        await siteSettings.save();

        sendResponse(res, 200, 'Banner added successfully', siteSettings);
    } catch (error) {
        sendResponse(res, 500, 'Internal Server Error', null, error);
    }
};

const removeBanner = async (req, res) => {
    const { bannerId } = req.params;

    try {
        let siteSettings = await SiteSetting.findOne();

        if (!siteSettings) {
            sendResponse(res, 404, 'Site settings not found');
            return;
        }

        // Find the index of the banner to remove
        const bannerIndex = siteSettings.bannerSlider.findIndex(banner => banner._id == bannerId);

        if (bannerIndex === -1) {
            sendResponse(res, 404, 'Banner not found');
            return;
        }

        // Remove the banner from the array
        siteSettings.bannerSlider.splice(bannerIndex, 1);

        await siteSettings.save();

        sendResponse(res, 200, 'Banner removed successfully', siteSettings);
    } catch (error) {
        sendResponse(res, 500, 'Internal Server Error', null, error);
    }
};

module.exports = {
    getSiteSettings,
    updateGeneralSettings,
    updateTopbarSettings,
    addBanner,
    removeBanner,
};