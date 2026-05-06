const fs = require('fs');

const dataStr = fs.readFileSync('src/data/mockData.js', 'utf-8');
const beforeProjects = dataStr.substring(0, dataStr.indexOf('export const PROJECTS ='));
const afterProjectsMatch = dataStr.match(/export const JOBS =/);
const afterProjects = dataStr.substring(afterProjectsMatch.index);

const replacement = `export const PROJECT_LIBRARY = [
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
      suggestedStructure: '/src\\n  /components\\n    ProductGallery.jsx\\n    ProductInfo.jsx\\n    AddToCart.jsx\\n  App.jsx'
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
      suggestedStructure: '/src\\n  /controllers\\n  /models\\n  /routes\\n  server.js'
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

`;

fs.writeFileSync('src/data/mockData.js', beforeProjects + replacement + afterProjects);
console.log('Successfully updated mockData.js');
