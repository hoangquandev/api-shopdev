const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const siteSettingSchema = new Schema({
    general: {
        logo: String,
        sitename: String,
        siteDescription: String,
    },
    topbar: {
        phone: String,
        email: String,
    },
    bannerSlider: [
        {
            image: String,
            // You can add more fields for each slider image
        },
    ],
});

const SiteSetting = mongoose.model('SiteSetting', siteSettingSchema);

module.exports = SiteSetting;