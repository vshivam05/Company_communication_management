const express = require('express');
const router = express.Router();
const {
    getFilteredNotifications,
    getNotificationCounts,
} = require('../controllers/notificationController');

router.get('/filtered', getFilteredNotifications);
router.get('/count', getNotificationCounts);

module.exports = router;
