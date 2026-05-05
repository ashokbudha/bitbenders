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

export const PROJECTS = {
  'frontend-dev': {
    title: 'E-commerce Product Page',
    why: 'Nepali agencies constantly build e-commerce sites. They need developers who can build pixel-perfect, responsive product pages.',
    goodEnough: 'Responsive layout, working image gallery, and \'Add to Cart\' button state change. No backend needed.',
    tasks: [
      { id: 1, instruction: 'Set up a React project and create the basic layout (Header, Product Info, Footer).', outcome: 'A blank but structured page.' },
      { id: 2, instruction: 'Style the product details (Title, Price, Description) based on a simple design.', outcome: 'Text looks good and is readable.' },
      { id: 3, instruction: 'Build an image gallery where clicking a thumbnail changes the main image.', outcome: 'Working image gallery.' },
      { id: 4, instruction: 'Make the page responsive for mobile phones.', outcome: 'Looks good on small screens.' },
    ]
  },
  'backend-dev': {
    title: 'Task Management API',
    why: 'Every company needs internal tools. Building a secure API with relationships is a common requirement.',
    goodEnough: 'A working REST API with authentication and CRUD operations for tasks and users.',
    tasks: [
      { id: 1, instruction: 'Set up an Express server and define routes.', outcome: 'Server running with empty endpoints.' },
      { id: 2, instruction: 'Connect to a database and create models.', outcome: 'Database schema established.' },
      { id: 3, instruction: 'Implement JWT authentication.', outcome: 'Secure login and registration.' },
    ]
  },
  'ui-ux': {
    title: 'Food Delivery App Redesign',
    why: 'Agencies look for designers who can improve existing experiences and create polished mobile UI.',
    goodEnough: 'A complete Figma file with a 3-screen interactive prototype.',
    tasks: [
      { id: 1, instruction: 'Audit an existing app and sketch wireframes.', outcome: 'Wireframes ready.' },
      { id: 2, instruction: 'Design high-fidelity screens using a component library.', outcome: 'Beautiful UI screens.' },
      { id: 3, instruction: 'Link screens together in a prototype.', outcome: 'Clickable prototype.' },
    ]
  },
  'digital-marketing': {
    title: 'Local Restaurant Launch Campaign',
    why: 'Agencies need marketers who can handle end-to-end campaigns for local clients.',
    goodEnough: 'A complete campaign plan with ad creatives, targeting details, and budget breakdown.',
    tasks: [
      { id: 1, instruction: 'Define the target audience and budget for a new cafe in Kathmandu.', outcome: 'Audience persona document.' },
      { id: 2, instruction: 'Create 3 sample social media posts (Canva or text).', outcome: 'Content assets.' },
      { id: 3, instruction: 'Setup the Meta Ad targeting strategy.', outcome: 'Ad targeting plan.' },
    ]
  },
  'qa-tester': {
    title: 'E-commerce Checkout Testing',
    why: 'Checkout is the most critical part of an e-commerce app. A bug here costs money.',
    goodEnough: 'A comprehensive list of test cases and at least 3 simulated bug reports.',
    tasks: [
      { id: 1, instruction: 'Write test cases for adding items to the cart.', outcome: 'Test case document.' },
      { id: 2, instruction: 'Write test cases for the payment gateway simulation.', outcome: 'Test case document.' },
      { id: 3, instruction: 'Write 3 bug reports for common issues (e.g. negative quantity).', outcome: 'Bug reports.' },
    ]
  }
};

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
