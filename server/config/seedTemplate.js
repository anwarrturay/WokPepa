require('dotenv').config();
const mongoose = require('mongoose');
const Template = require('../models/Template');

const DATABASE_URI = process.env.DATABASE_URI;

const templates = [
    {
        userId: new mongoose.Types.ObjectId(),
        title: 'Classic Resume',
        personalDetails: {
            name: 'John Doe',
            email: 'john.doe@example.com',
            phone: '+1234567890',
            address: '123 Main Street, City, Country'
        },
        experience: [
            {
                company: 'Tech Solutions Inc.',
                role: 'Software Engineer',
                duration: 'Jan 2020 - Present',
                description: 'Developed web applications using the MERN stack and improved system performance.'
            }
        ],
        education: [
            {
                school: 'University of Technology',
                degree: 'B.Sc. Computer Science',
                year: '2014 - 2018'
            }
        ],
        skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
        image: 'https://via.placeholder.com/150',
        createdAt: new Date()
    },
    {
        userId: new mongoose.Types.ObjectId(),
        title: 'Modern Resume',
        personalDetails: {
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            phone: '+9876543210',
            address: '456 Elm Street, City, Country'
        },
        experience: [
            {
                company: 'FinTech Corp.',
                role: 'Backend Developer',
                duration: 'Feb 2021 - Present',
                description: 'Implemented API services and optimized database queries.'
            }
        ],
        education: [
            {
                school: 'State University',
                degree: 'M.Sc. Software Engineering',
                year: '2016 - 2018'
            }
        ],
        skills: ['Python', 'Django', 'GraphQL', 'AWS'],
        image: 'https://via.placeholder.com/150',
        createdAt: new Date()
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(DATABASE_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Connected to MongoDB...');
        
        await Template.deleteMany({});
        await Template.insertMany(templates);
        
        console.log('Predefined templates added successfully!');
    } catch (error) {
        console.error('Error seeding templates:', error);
    } finally {
        mongoose.connection.close(() => {
            console.log('MongoDB connection closed.');
            process.exit(0); // Ensures the script exits cleanly
        });
    }
};

seedDB();
