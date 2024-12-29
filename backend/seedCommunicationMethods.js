import mongoose from 'mongoose';
import CommunicationMethod from './models/CommunicationMethod.js';

const defaultMethods = [
    { name: 'LinkedIn Post', description: 'Post on LinkedIn', sequence: 1, mandatory: true },
    { name: 'LinkedIn Message', description: 'Message on LinkedIn', sequence: 2, mandatory: false },
    { name: 'Email', description: 'Send an email', sequence: 3, mandatory: false },
    { name: 'Phone Call', description: 'Make a phone call', sequence: 4, mandatory: false },
    { name: 'Other', description: 'Other communication methods', sequence: 5, mandatory: false },
];

const seedCommunicationMethods = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/your_database_name', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        await CommunicationMethod.deleteMany({});
        await CommunicationMethod.insertMany(defaultMethods);
        console.log('Default communication methods seeded successfully!');
    } catch (error) {
        console.error('Error seeding communication methods:', error);
    } finally {
        mongoose.connection.close();
    }
};

seedCommunicationMethods();
