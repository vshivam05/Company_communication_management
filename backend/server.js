const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const communicationMethodRoutes = require('./routes/communicationMethodRoutes');
const companyRoutes = require('./routes/companyRoutes'); // Import company routes
const communicationRoutes = require('./routes/communicationRoutes'); // Import communication routes

const app = express();




app.use(cors());
app.use(express.json());

app.use('/api/companies',  companyRoutes); // Use middleware for company routes
app.use('/api/users', userRoutes);
app.use('/api/communication-methods', communicationMethodRoutes);
app.use('/api/communications', communicationRoutes); // Use middleware for communication routes

const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://shivamverma:Pa55word@cluster0.l88hq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((error) => {
    console.error('Database connection error:', error);
});
