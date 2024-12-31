const Communication = require('../models/Communication');
const asyncHandler = require('express-async-handler');
const moment = require('moment');

// @desc    Get overdue and today's communications
// @route   GET /api/notifications/filtered
// @access  Private
const getFilteredNotifications = asyncHandler(async (req, res) => {
    const today = moment.utc().startOf('day'); // Ensure UTC comparison
    console.log("Today: ", today.toDate()); // Log start of today (UTC)
    console.log("End of Today: ", today.endOf('day').toDate()); // Log end of today (UTC)
    
    // Overdue communications
    const overdue = await Communication.find({
        dueDate: { $lt: today.toDate() },
        completed: false
    }).sort({ dueDate: 1 });

    // Today's communications
    const todays = await Communication.find({
        dueDate: { $gte: today.toDate(), $lt: today.endOf('day').toDate() },
        completed: false
    }).sort({ dueDate: 1 });

    console.log("Overdue communications:", overdue);
    console.log("Today's communications:", todays);

    res.json({
        overdue,
        todays
    });
});

// @desc    Get notification counts
// @route   GET /api/notifications/count
// @access  Private
const getNotificationCounts = asyncHandler(async (req, res) => {
    const today = moment.utc().startOf('day'); // Ensure UTC comparison
    console.log("Today: ", today.toDate()); // Log start of today (UTC)
    
    // Count overdue communications
    const overdueCount = await Communication.countDocuments({
        dueDate: { $lt: today.toDate() },
        completed: false
    });

    // Count today's communications
    const todaysCount = await Communication.countDocuments({
        dueDate: { $gte: today.toDate(), $lt: today.endOf('day').toDate() },
        completed: false
    });

    res.json({
        overdue: overdueCount,
        todays: todaysCount
    });
});

module.exports = {
    getFilteredNotifications,
    getNotificationCounts
};
