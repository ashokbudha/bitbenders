export const ROLES = [
  {
    id: 'frontend-dev',
    title: 'Frontend Developer (React)',
    dayToDay: 'Building user interfaces, fixing UI bugs, and connecting to backend APIs.',
    exampleTasks: [
      'Convert Figma designs into React components',
      'Make websites look good on mobile phones',
      'Fetch and display data from a REST API',
    ],
    expectations: 'Solid grasp of HTML/CSS/JS, basic React knowledge, and eagerness to learn.',
    notFor: 'People who prefer dealing with databases, servers, or hate visual design.',
    reqSkills: ['HTML/CSS', 'JavaScript', 'React', 'Git'],
    softSkills: ['Attention to detail', 'Visual awareness', 'Empathy for user experience'],
    tools: ['VS Code', 'Chrome DevTools', 'Figma (Viewer)'],
    fit: 'You enjoy seeing visual results immediately and love building interactive elements.',
    exampleProjects: ['Portfolio website', 'Weather dashboard', 'E-commerce product page'],
    opportunities: ['Frontend Intern', 'Junior React Developer', 'Freelance Web Developer']
  },
  {
    id: 'backend-dev',
    title: 'Backend Developer (Node.js)',
    dayToDay: 'Creating APIs, managing databases, and ensuring server logic runs securely and smoothly.',
    exampleTasks: [
      'Build a secure login and authentication system',
      'Design database tables and relationships',
      'Optimize slow data queries'
    ],
    expectations: 'Logical thinking, strong problem-solving skills, and comfortable working without a graphical interface.',
    notFor: 'People who need visual feedback for everything they build.',
    reqSkills: ['Node.js', 'Express', 'SQL/NoSQL', 'API Design'],
    softSkills: ['Logical thinking', 'System design', 'Security awareness'],
    tools: ['Postman', 'Docker', 'Database IDEs'],
    fit: 'You like organizing data, solving logical puzzles, and making things work efficiently behind the scenes.',
    exampleProjects: ['Task management API', 'User authentication system', 'Database schema design'],
    opportunities: ['Backend Intern', 'Junior API Developer', 'Node.js Trainee']
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Designer',
    dayToDay: 'Designing wireframes, prototyping user journeys, and ensuring the product is easy to use.',
    exampleTasks: [
      'Create high-fidelity screens in Figma',
      'Map out the user flow for a checkout process',
      'Interview users to find usability issues'
    ],
    expectations: 'Strong visual intuition, deep empathy for users, and willingness to iterate based on feedback.',
    notFor: 'People who want to write code or dislike talking to users.',
    reqSkills: ['User Research', 'Wireframing', 'Prototyping', 'Visual Design'],
    softSkills: ['Empathy', 'Communication', 'Open to critique'],
    tools: ['Figma', 'Miro', 'Notion'],
    fit: 'You have a good eye for aesthetics and care deeply about how users feel when using an app.',
    exampleProjects: ['Food delivery app prototype', 'Landing page redesign', 'Design system setup'],
    opportunities: ['UI/UX Intern', 'Junior Product Designer', 'Freelance Designer']
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing Executive',
    dayToDay: 'Running ad campaigns, managing social media presence, and analyzing website traffic.',
    exampleTasks: [
      'Create Meta Ads for a local restaurant',
      'Write SEO-friendly blog posts',
      'Analyze Google Analytics reports',
    ],
    expectations: 'Understands social platforms, basic copywriting skills, and comfortable with numbers.',
    notFor: 'People who dislike writing, communication, or tracking metrics.',
    reqSkills: ['Copywriting', 'SEO', 'Meta Ads', 'Analytics'],
    softSkills: ['Creativity', 'Data-driven mindset', 'Adaptability'],
    tools: ['Meta Business Suite', 'Google Analytics', 'Canva'],
    fit: 'You are creative, understand trends, and like measuring the success of your campaigns.',
    exampleProjects: ['Social media content calendar', 'Mock ad campaign', 'SEO audit report'],
    opportunities: ['Marketing Intern', 'SEO Executive', 'Social Media Trainee']
  },
  {
    id: 'qa-tester',
    title: 'QA Tester (Manual)',
    dayToDay: 'Testing software applications to find bugs before real users do.',
    exampleTasks: [
      'Click through a newly developed feature to try and break it',
      'Write clear bug reports for developers',
      'Verify that previously reported bugs are fixed',
    ],
    expectations: 'High attention to detail, structured thinking, and clear written communication.',
    notFor: 'People who dislike repetitive tasks or lack patience.',
    reqSkills: ['Test Planning', 'Bug Reporting', 'Agile Methodologies'],
    softSkills: ['Attention to detail', 'Patience', 'Clear communication'],
    tools: ['Jira', 'Postman', 'TestRail'],
    fit: 'You have a knack for finding flaws, breaking things systematically, and documenting issues.',
    exampleProjects: ['Checkout flow test plan', 'API testing suite', 'Detailed bug report logs'],
    opportunities: ['QA Intern', 'Junior QA Tester', 'Manual Testing Trainee']
  },
];

export const ROADMAPS = {
  'frontend-dev': [
    { id: 1, title: 'HTML, CSS & Responsiveness', why: 'Every web page needs structure and style. Companies need mobile-friendly sites.', output: 'A responsive personal portfolio page.' },
    { id: 2, title: 'JavaScript Fundamentals', why: 'To make websites interactive and handle logic.', output: 'A working to-do list app.' },
    { id: 3, title: 'React Basics', why: 'Most modern Nepali tech companies use React for frontends.', output: 'A simple weather app fetching from an API.' },
    { id: 4, title: 'Git & GitHub', why: 'To collaborate with other developers safely.', output: 'Pushing your projects to GitHub.' },
  ],
  'backend-dev': [
    { id: 1, title: 'JavaScript/Node.js Basics', why: 'The foundation of running JS on the server.', output: 'A basic console application.' },
    { id: 2, title: 'Express & REST APIs', why: 'To create endpoints that frontends can consume.', output: 'A simple CRUD API.' },
    { id: 3, title: 'Database Fundamentals', why: 'To persist data permanently.', output: 'Connecting the API to a database.' },
    { id: 4, title: 'Authentication & Security', why: 'To protect user data.', output: 'Adding login/signup to the API.' },
  ],
  'ui-ux': [
    { id: 1, title: 'Design Principles & Typography', why: 'The core of making interfaces look good.', output: 'A style guide document.' },
    { id: 2, title: 'Figma Basics', why: 'The industry standard tool for UI design.', output: 'A recreated popular app screen.' },
    { id: 3, title: 'User Flows & Wireframing', why: 'To plan how users move through an app.', output: 'Low-fidelity wireframes for an app.' },
    { id: 4, title: 'Prototyping', why: 'To make designs interactive for testing.', output: 'A clickable prototype in Figma.' },
  ],
  'digital-marketing': [
    { id: 1, title: 'Social Media Management', why: 'Core channel for most Nepali businesses.', output: '1-month content calendar.' },
    { id: 2, title: 'Meta Ads (Facebook/Instagram)', why: 'Primary way to acquire customers locally.', output: 'A mock ad campaign setup.' },
    { id: 3, title: 'SEO Basics', why: 'To get free traffic from Google.', output: 'On-page SEO audit for a local site.' },
    { id: 4, title: 'Analytics & Reporting', why: 'To prove your campaigns are working.', output: 'A simple performance report.' },
  ],
  'qa-tester': [
    { id: 1, title: 'Software Testing Life Cycle', why: 'Understand how software is built and tested.', output: 'A test plan document.' },
    { id: 2, title: 'Writing Test Cases', why: 'Structured way to test every scenario.', output: 'Test cases for a login page.' },
    { id: 3, title: 'Bug Reporting', why: 'Developers need to know exactly how to reproduce the issue.', output: 'A detailed Jira-style bug report.' },
    { id: 4, title: 'API Testing Basics (Postman)', why: 'Many modern apps require backend testing.', output: 'Testing a public API endpoint.' },
  ],
};

export const PROJECT_LIBRARY = [
  {
    id: 'p-fe-1',
    careerPath: 'frontend-dev',
    type: 'mini',
    title: 'Personal Portfolio Landing Page',
    shortDescription: 'A static single-page portfolio using HTML and CSS.',
    difficulty: 'Beginner',
    skillsUsed: ['HTML', 'CSS', 'Flexbox/Grid'],
    proves: 'Ability to structure a page and make it look good.',
    estimatedTime: '1 day',
    prerequisites: [1],
    blueprint: null,
  },
  {
    id: 'p-fe-2',
    careerPath: 'frontend-dev',
    type: 'guided',
    title: 'E-commerce Product Page',
    shortDescription: 'Responsive layout, working image gallery, and Add to Cart state.',
    difficulty: 'Intermediate',
    skillsUsed: ['React', 'CSS', 'State Management', 'Responsive Design', 'Git'],
    proves: 'Ability to manage complex UI state and handle standard e-commerce features.',
    estimatedTime: '3-5 days',
    prerequisites: [1, 2, 3],
    blueprint: {
      goal: 'Build a fully responsive product detail page for an online store.',
      problemSolved: 'Allows users to view product details, select options, and add items to their cart seamlessly.',
      targetUser: 'Online shoppers',
      coreFeatures: ['Image Gallery', 'Product Details', 'Variant Selection', 'Add to Cart functionality'],
      suggestedTechStack: ['React', 'Tailwind CSS', 'Vite'],
      suggestedStructure: '/src\n  /components\n    ProductGallery.jsx\n    ProductInfo.jsx\n    AddToCart.jsx\n  App.jsx'
    },
    scopes: {
      minimum: { id: 'minimum', title: 'Minimum / MVP', description: 'Basic layout with static data.', features: ['Static layout', 'Basic CSS', 'No interactive state'] },
      standard: { id: 'standard', title: 'Standard / Portfolio-Ready', description: 'Interactive gallery and cart state.', features: ['Interactive image gallery', 'Add to cart state handling', 'Responsive design'] },
      advanced: { id: 'advanced', title: 'Advanced / Extension', description: 'API integration and advanced state.', features: ['Fetch product data from mock API', 'Cart context', 'Local storage persistence'] }
    },
    milestones: [
      { id: 'm1', title: 'Understand and Plan', description: 'Review the project blueprint and decide on your scope.', tasks: ['Read project goal', 'Select scope level', 'Set up local environment'], estimatedTime: '1 hour', hints: ['Use Vite for a fast React setup: npm create vite@latest my-project'] },
      { id: 'm2', title: 'Build UI Components', description: 'Create the visual structure without logic.', tasks: ['Build Header', 'Build Image Gallery UI', 'Build Product Info UI'], estimatedTime: '3 hours', hints: ['Start with hardcoded data to get the styling right before adding state.'] },
      { id: 'm3', title: 'Add Interactivity & State', description: 'Make the gallery clickable and add to cart work.', tasks: ['Implement useState for active image', 'Implement cart state', 'Add to cart button logic'], estimatedTime: '2 hours', hints: ['Store the selected image index in state.'] },
      { id: 'm4', title: 'Polish & Deploy', description: 'Finalize responsiveness and put it live.', tasks: ['Check mobile view', 'Deploy to Vercel/Netlify'], estimatedTime: '1 hour', hints: ['Vercel offers an easy way to deploy Vite React apps for free. Just link your GitHub.'] }
    ],
    rubric: {
      minimum: ['Static layout complete', 'Visible on desktop'],
      standard: ['Responsive on all devices', 'Image gallery is interactive', 'Add to cart updates a counter'],
      advanced: ['Data fetched from API', 'Cart state persists on reload', 'Complex variant selection works']
    }
  },
  {
    id: 'p-be-1',
    careerPath: 'backend-dev',
    type: 'guided',
    title: 'Task Management API',
    shortDescription: 'A working REST API with authentication and CRUD operations.',
    difficulty: 'Intermediate',
    skillsUsed: ['Node.js', 'Express', 'JWT', 'REST APIs', 'Database'],
    proves: 'Ability to handle secure API design and database relationships.',
    estimatedTime: '3-5 days',
    prerequisites: [1, 2, 3],
    blueprint: {
      goal: 'Build a secure API for a task management application.',
      problemSolved: 'Allows a frontend to authenticate users and manage their tasks securely.',
      targetUser: 'Frontend applications / Mobile apps',
      coreFeatures: ['User Auth', 'Task CRUD', 'Filtering/Pagination'],
      suggestedTechStack: ['Node.js', 'Express', 'MongoDB'],
      suggestedStructure: '/src\n  /controllers\n  /models\n  /routes\n  server.js'
    },
    scopes: {
      minimum: { id: 'minimum', title: 'Minimum / MVP', description: 'Basic CRUD operations.', features: ['Task creation, reading, updating, deleting'] },
      standard: { id: 'standard', title: 'Standard / Portfolio-Ready', description: 'Authentication and user-owned tasks.', features: ['JWT Auth', 'Tasks belong to users', 'Error handling'] },
      advanced: { id: 'advanced', title: 'Advanced / Extension', description: 'Pagination, filtering, and role-based access.', features: ['Pagination on task lists', 'Admin roles', 'Rate limiting'] }
    },
    milestones: [
      { id: 'm1', title: 'Set up Server & Database', description: 'Initialize Express and connect to DB.', tasks: ['Setup Express app', 'Connect to DB', 'Create basic /health route'], estimatedTime: '1 hour', hints: ['Use mongoose if using MongoDB.'] },
      { id: 'm2', title: 'User Authentication', description: 'Register, login, and JWT generation.', tasks: ['User model', 'Register route', 'Login route', 'JWT Middleware'], estimatedTime: '3 hours', hints: ['Hash passwords with bcrypt before saving to DB.'] },
      { id: 'm3', title: 'Task Management', description: 'CRUD endpoints for tasks tied to users.', tasks: ['Task model', 'Create Task route', 'Get Tasks route', 'Update/Delete routes'], estimatedTime: '3 hours', hints: ['Ensure the user ID from the JWT token is saved with the task.'] },
      { id: 'm4', title: 'Testing & Polish', description: 'Test endpoints with Postman and handle errors gracefully.', tasks: ['Postman collection', 'Global error handler', 'Deploy to Render/Railway'], estimatedTime: '2 hours', hints: ['Never trust user input, always validate data before saving.'] }
    ],
    rubric: {
      minimum: ['CRUD operations work via Postman'],
      standard: ['Auth is secure, users can only see their own tasks'],
      advanced: ['Pagination works, API is deployed live and documented']
    }
  }
];

export const CAPSTONE_IDEAS = [
  {
    id: 'cap-fe-1',
    careerPath: 'frontend-dev',
    title: 'Portfolio + Dashboard Hybrid',
    whyFits: 'Demonstrates both public-facing UI and internal state management.',
    skillsProved: ['React Router', 'Context API', 'Complex Layouts', 'Auth Flow'],
    hiringValue: 'Highly relevant for SaaS or tech companies looking for dashboard developers.',
    estimatedComplexity: 'High (1-2 weeks)',
    scopeRecommendation: 'Build 3 public pages and a 2-page admin dashboard with mocked authentication.'
  },
  {
    id: 'cap-fe-2',
    careerPath: 'frontend-dev',
    title: 'Job Portal Frontend',
    whyFits: 'Requires dynamic filtering, list rendering, and complex forms.',
    skillsProved: ['Advanced React', 'State Management', 'API Integration', 'Form Validation'],
    hiringValue: 'Proves you can handle data-heavy applications and complex UI logic.',
    estimatedComplexity: 'High (1-2 weeks)',
    scopeRecommendation: 'Implement Job Listing, Filtering, Job Detail, and Mock Application form.'
  },
  {
    id: 'cap-be-1',
    careerPath: 'backend-dev',
    title: 'E-commerce Inventory & Auth API',
    whyFits: 'Core business logic for any store. Shows you can handle complex relations.',
    skillsProved: ['JWT Auth', 'Complex SQL/NoSQL Relations', 'Data Validation', 'Payment Mocking'],
    hiringValue: 'Critical skill for product companies and digital agencies.',
    estimatedComplexity: 'High (2 weeks)',
    scopeRecommendation: 'Users, Roles, Products, Categories, and Orders endpoints with role-based access control.'
  }
];

export const JOBS = [
  { 
    id: 1, 
    roleId: 'frontend-dev', 
    company: 'Kathmandu Tech Solutions', 
    title: 'Frontend Intern', 
    type: 'internship', // internship, trainee, junior
    location: 'Kathmandu (Onsite)',
    expectations: 'Knows React basics, eager to learn. Must have 1 portfolio project.',
    requirements: {
      courses: [1, 2], // HTML/CSS and JS
      projects: 0, // No full capstone required
      skills: ['HTML', 'CSS', 'JavaScript']
    }
  },
  { 
    id: 2, 
    roleId: 'frontend-dev', 
    company: 'Himalaya Digital', 
    title: 'Junior Frontend Developer', 
    type: 'junior',
    location: 'Lalitpur (Hybrid)',
    expectations: 'Understands CSS, React, and Git. Good communication skills.',
    requirements: {
      courses: [1, 2, 3, 4], // Full roadmap
      projects: 1, // Capstone required
      skills: ['React', 'Git', 'Responsive Design']
    }
  },
  { 
    id: 3, 
    roleId: 'digital-marketing', 
    company: 'Everest Agencies', 
    title: 'Marketing Trainee', 
    type: 'trainee',
    location: 'Remote',
    expectations: 'Creative, active on social media, willing to learn Meta Ads.',
    requirements: {
      courses: [1], // Social Media
      projects: 0,
      skills: ['Social Media', 'Communication']
    }
  },
  { 
    id: 4, 
    roleId: 'digital-marketing', 
    company: 'Kathmandu Tech Solutions', 
    title: 'Junior Digital Marketer', 
    type: 'junior',
    location: 'Kathmandu (Onsite)',
    expectations: 'Can write basic copy and understand analytics.',
    requirements: {
      courses: [1, 2, 3, 4],
      projects: 1,
      skills: ['Meta Ads', 'SEO', 'Analytics']
    }
  },
  { 
    id: 5, 
    roleId: 'qa-tester', 
    company: 'QualityTech Nepal', 
    title: 'QA Intern', 
    type: 'internship',
    location: 'Pokhara (Hybrid)',
    expectations: 'Attention to detail, knows basic testing concepts.',
    requirements: {
      courses: [1, 2],
      projects: 0,
      skills: ['Manual Testing', 'Test Cases']
    }
  },
];

export const MOCK_STUDENTS = [
  {
    id: 's1',
    name: 'Aayush Sharma',
    careerPath: 'frontend-dev',
    location: 'Kathmandu',
    availabilityStatus: 'Actively looking',
    completedCourses: [1, 2, 3, 4],
    completedProjects: [{ id: 'frontend-dev', link: 'github.com/aayush' }],
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Git'],
    portfolioUrl: 'aayush.dev'
  },
  {
    id: 's2',
    name: 'Pooja Thapa',
    careerPath: 'frontend-dev',
    location: 'Lalitpur',
    availabilityStatus: 'Actively looking',
    completedCourses: [1, 2],
    completedProjects: [],
    skills: ['HTML', 'CSS', 'JavaScript'],
    portfolioUrl: null
  },
  {
    id: 's3',
    name: 'Bikash Nepal',
    careerPath: 'digital-marketing',
    location: 'Remote',
    availabilityStatus: 'Open to offers',
    completedCourses: [1, 2, 3],
    completedProjects: [{ id: 'digital-marketing', link: 'drive.google.com/bikash' }],
    skills: ['Social Media', 'Meta Ads', 'SEO'],
    portfolioUrl: null
  }
];
