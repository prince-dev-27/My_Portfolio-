const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Experience = require('../models/Experience');
const Testimonial = require('../models/Testimonial');
const Message = require('../models/Message');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://undaviyaprince27_db_user:princeundaviya@ac-bkzdycn-shard-00-00.zmq8sva.mongodb.net:27017,ac-bkzdycn-shard-00-01.zmq8sva.mongodb.net:27017,ac-bkzdycn-shard-00-02.zmq8sva.mongodb.net:27017/prince-portfolio?replicaSet=atlas-dhpfbt-shard-0&ssl=true&authSource=admin';

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await Admin.deleteMany({});
    await Project.deleteMany({});
    await Skill.deleteMany({});
    await Experience.deleteMany({});
    await Testimonial.deleteMany({});
    await Message.deleteMany({});

    // Seed Admin
    const seedUsername = process.env.SEED_ADMIN_USERNAME || 'prince';
    const seedPassword = process.env.SEED_ADMIN_PASSWORD || 'Admin@LocalDev2026!';
    const seedName = process.env.SEED_ADMIN_NAME || 'Prince Undaviya';
    const seedEmail = process.env.SEED_ADMIN_EMAIL || 'prince@undaviya.dev';

    const hashedPassword = await bcrypt.hash(seedPassword, 10);
    await Admin.create({
      username: seedUsername,
      password: hashedPassword,
      name: seedName,
      email: seedEmail
    });
    console.log(`Admin seeded (username: ${seedUsername})`);

    // Seed Projects
    await Project.insertMany([
      {
        title: 'Full Stack E-Commerce Platform',
        description: 'Enterprise-grade e-commerce application with secure payment gateway, real-time inventory tracking, and advanced admin analytics dashboard.',
        longDescription: 'Built with React, Node.js, Express, and MongoDB. Features JWT authentication, role-based access control, Stripe payment integration, Redis caching, and comprehensive order management.',
        category: 'Full Stack',
        technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Stripe'],
        imageUrl: 'https://images.unsplash.com/photo-1557821552-1710517667fc?auto=format&fit=crop&w=800&q=80',
        githubUrl: 'https://github.com/princeundaviya/ecommerce-platform',
        liveUrl: 'https://ecommerce-demo.undaviya.dev',
        featured: true,
        order: 1
      },
      {
        title: 'AI Code Assistant & Reviewer',
        description: 'Intelligent developer tool that analyzes codebases, detects security vulnerabilities, and suggests optimized refactoring patterns.',
        longDescription: 'Powered by modern LLM APIs and custom AST parsers. Provides real-time code reviews, automated test generation, and seamless IDE extension integration.',
        category: 'AI / ML',
        technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'OpenAI API'],
        imageUrl: 'https://images.unsplash.com/photo-1618401471353-b98aedd04e11?auto=format&fit=crop&w=800&q=80',
        githubUrl: 'https://github.com/princeundaviya/ai-code-reviewer',
        liveUrl: 'https://aireview.undaviya.dev',
        featured: true,
        order: 2
      },
      {
        title: 'Real-Time Project Management Suite',
        description: 'Collaborative workspace platform featuring Kanban boards, live chat, task dependencies, and automated sprint reporting.',
        longDescription: 'Real-time synchronization using WebSockets (Socket.io), robust REST API architecture, secure JWT sessions, and highly responsive Tailwind UI.',
        category: 'Full Stack',
        technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Express'],
        imageUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
        githubUrl: 'https://github.com/princeundaviya/project-suite',
        liveUrl: 'https://pm.undaviya.dev',
        featured: true,
        order: 3
      }
    ]);
    console.log('Projects seeded');

    // Seed Skills (4 Categories requested)
    await Skill.insertMany([
      // Frontend Development (including HTML5, CSS3, JavaScript, TypeScript, React.js, Tailwind CSS)
      { name: 'HTML5', category: 'Frontend Development', proficiency: 95, icon: 'html5' },
      { name: 'CSS3', category: 'Frontend Development', proficiency: 95, icon: 'css3' },
      { name: 'JavaScript', category: 'Frontend Development', proficiency: 95, icon: 'javascript' },
      { name: 'TypeScript', category: 'Frontend Development', proficiency: 90, icon: 'typescript' },
      { name: 'React.js', category: 'Frontend Development', proficiency: 95, icon: 'react' },
      { name: 'Tailwind CSS', category: 'Frontend Development', proficiency: 95, icon: 'tailwind' },

      // Backend Development
      { name: 'Node.js', category: 'Backend Development', proficiency: 92, icon: 'nodejs' },
      { name: 'Express.js', category: 'Backend Development', proficiency: 90, icon: 'express' },

      // Database
      { name: 'MongoDB', category: 'Database', proficiency: 90, icon: 'mongodb' },
      { name: 'PostgreSQL', category: 'Database', proficiency: 85, icon: 'postgresql' },

      // Development Tools & Platforms
      { name: 'Git', category: 'Development Tools & Platforms', proficiency: 92, icon: 'git' },
      { name: 'GitHub', category: 'Development Tools & Platforms', proficiency: 92, icon: 'github' },
      { name: 'Vercel', category: 'Development Tools & Platforms', proficiency: 90, icon: 'vercel' },
      { name: 'Postman', category: 'Development Tools & Platforms', proficiency: 88, icon: 'postman' }
    ]);
    console.log('Skills seeded');

    // Seed Experience
    await Experience.insertMany([
      {
        title: 'Senior Full Stack Developer',
        company: 'TechCorp Solutions',
        location: 'Remote',
        period: '2023 - Present',
        description: [
          'Architected and deployed scalable full-stack applications using React, Node.js, and MongoDB.',
          'Optimized database queries and API response times by 40% using indexing and Redis caching.',
          'Mentored junior developers and established strict code review and testing protocols.'
        ],
        type: 'Work'
      },
      {
        title: 'Full Stack Web Developer',
        company: 'Innovate Digital Labs',
        location: 'Ahmedabad, India',
        period: '2021 - 2023',
        description: [
          'Developed responsive frontend interfaces with React and Tailwind CSS.',
          'Built robust RESTful backend services and integrated secure payment gateways.',
          'Collaborated with UI/UX designers to implement pixel-perfect, accessible user experiences.'
        ],
        type: 'Work'
      },
      {
        title: 'Bachelor of Technology in Computer Engineering',
        company: 'Gujarat Technological University',
        location: 'Gujarat, India',
        period: '2017 - 2021',
        description: [
          'Graduated with honors focusing on Software Engineering, Data Structures, and Database Management Systems.',
          'Led university coding club and won multiple hackathons.'
        ],
        type: 'Education'
      }
    ]);
    console.log('Experience seeded');

    // Seed Testimonials
    await Testimonial.insertMany([
      {
        name: 'Sarah Jenkins',
        role: 'Engineering Director',
        company: 'TechCorp Solutions',
        content: 'Prince is an exceptional full-stack developer. His deep understanding of React and Node.js architecture combined with his attention to detail resulted in a flawless product launch.',
        approved: true
      },
      {
        name: 'David Vance',
        role: 'CTO',
        company: 'Innovate Digital Labs',
        content: 'Working with Prince was a fantastic experience. He delivers clean, maintainable code on time and has great problem-solving skills when tackling complex backend challenges.',
        approved: true
      }
    ]);
    console.log('Testimonials seeded');

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedData();
