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
  },
];

export const ROADMAPS = {
  'frontend-dev': [
    { id: 1, title: 'HTML, CSS & Responsiveness', why: 'Every web page needs structure and style. Companies need mobile-friendly sites.', output: 'A responsive personal portfolio page.' },
    { id: 2, title: 'JavaScript Fundamentals', why: 'To make websites interactive and handle logic.', output: 'A working to-do list app.' },
    { id: 3, title: 'React Basics', why: 'Most modern Nepali tech companies use React for frontends.', output: 'A simple weather app fetching from an API.' },
    { id: 4, title: 'Git & GitHub', why: 'To collaborate with other developers safely.', output: 'Pushing your projects to GitHub.' },
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
  { id: 1, roleId: 'frontend-dev', company: 'Kathmandu Tech Solutions', title: 'Frontend Intern', expectations: 'Knows React basics, eager to learn. Must have 1 portfolio project.' },
  { id: 2, roleId: 'frontend-dev', company: 'Himalaya Digital', title: 'Junior Frontend Developer', expectations: 'Understands CSS, React, and Git. Good communication skills.' },
  { id: 3, roleId: 'digital-marketing', company: 'Everest Agencies', title: 'Marketing Intern', expectations: 'Creative, active on social media, willing to learn Meta Ads.' },
  { id: 4, roleId: 'digital-marketing', company: 'Kathmandu Tech Solutions', title: 'Junior Digital Marketer', expectations: 'Can write basic copy and understand analytics.' },
  { id: 5, roleId: 'qa-tester', company: 'QualityTech Nepal', title: 'QA Trainee', expectations: 'Attention to detail, knows basic testing concepts.' },
  { id: 6, roleId: 'qa-tester', company: 'Himalaya Digital', title: 'Junior QA Engineer', expectations: 'Can write clear test cases and bug reports.' },
];
