const contactInfo = [
  {
    name: "Kelsey Ann Corro",
    phoneNumber: "(562) 228-3300",
    email: "kelseyann77@gmail.com",
    linkedin: "linkedin.com/in/kelsey-corro",
    github: "github.com/kelseyann77",
    citizenship: "US Citizen",
    clearance: "Active Q-Clearance",
  },
];

const jobData = [
  {
    employer: "Sandia National Laboratories",
    location: "Remote",
    title: "Software Engineer",
    startDate: "May 2024",
    endDate: "Present",
    description: [
      "Tune Amazon S3 Upload function utilizing AWS CLI commands and reduced code from 400+ lines of GoLang code to 3 lines of AWS CLI code and improved file transfer by 150 – 200%",
      "Formulate a script using Python, MySQL, and SQLAlchemy that allows for the syncing of databases with different schemas",
      "Improve front end UIs written in HTML, CSS, JavaScript, and Python to be more user friendly and responsive",
      "Utilize CI/CD pipeline through GitLab to create merge requests and productionize scripts for slimmed down schema, database pruning mechanism, and database sync which are currently in production for internal use",
      "Operate within an Agile environment with 10 team members, participating in 1-month sprints; author user stories and actively participate in bi-weekly stand up meetings to report project progress and collaborate with team members; occasionally substitute as scrum master",
    ],
  },
  {
    employer: "Sandia National Laboratories",
    location: "Albuquerque, NM | Remote",
    title: "Graduate R&D Software Engineering Intern",
    startDate: "May 2023",
    endDate: "May 2024",
    description: [
      "Investigated a legacy database schema to identify the relevance and relationship between existing tables and improve the schema by reducing the number of tables from over 140 tables to 2 tables with relevant information",
      "Created a database pruning mechanism to delete specific entries from the database utilizing MySQL, MariaDB, Systemd Service & Timer, and Bash to maintain the database and reduce memory consumption for cost saving and efficiency",
      "Packaged, launched, and deployed database pruning mechanism through RPM Package Manager & Ansible for automation",
      "Enhanced understanding and maintenance of cloud systems and databases through independent learning of system administration tools, including Amazon Web Services (Amazon EC2 and Amazon S3) and Docker",
    ],
  },
  {
    employer: "New Mexico State University",
    location: "Las Cruces, NM",
    title: "Bioinformatics Graduate Research Assistant",
    startDate: "May 2021",
    endDate: "March 2022",
    description: [
      "Executed programs on Linux and command line and use high performance computing (HPC) to process large dataset files",
      "Utilized R/R Studio and bioinformatics to study genomic relationship between diabetes and acetylator phenotypes associated with NAT 1 and NAT2 single nucleotide polymorphisms (SNPs) to improve drug efficacy",
    ],
  },
  {
    employer: "City of Tallahassee Water Quality Lab",
    location: "Tallahassee, FL",
    title: "Chemist",
    startDate: "January 2018",
    endDate: "June 2020",
    description: [
      "Ensured the safety of drinking water for the city of Tallahassee by analyzing water samples for various metal content",
      "Operated and maintained instruments, and performed data entry in Laboratory Information Management System (LIMS)",
    ],
  },
];

const educationData = [
  {
    school: "New Mexico State University",
    location: "Las Cruces, NM",
    degree: "Masters of Science",
    major: "Computer Science",
    gpa: 3.9,
    startDate: "January 2021",
    endDate: "May 2024",
  },
  {
    school: "University of California, Irvine",
    location: "Irvine, CA",
    degree: "Bachelor of Science",
    major: "Computer Science",
    gpa: 3.1,
    startDate: "September 2011",
    endDate: "June 2015",
  },
];

const languages = [
  "Python",
  "Java",
  "SQL",
  "HTML",
  "JavaScript",
  "CSS",
  "React",
  "JSX",
  "C",
  "C++",
  "R",
  "Bash",
];

const tools = [
  "Linux",
  "Visual Studio Code",
  "GitHub",
  "GitLab",
  "Ansible",
  "RPM Package Manager",
  "MySQL",
  "MariaDB",
  "MongoDB",
  "Cloudflare Workers KV",
  "Systemd",
  "Cron",
  "Docker",
  "Amazon Web Services (AWS)",
  "AWS EC2",
  "AWS S3",
  "AWS Command Line Interface",
  "Node.js",
  "Express",
];

const certifications = [
  "AWS Certified Cloud Practitioner",
  "Udemy - R Programming for Statistics & Data Science",
  "Udemy - The Ultimate React Course 2024: React, Next.js, Redux & More [in progress]",
];

const projectsData = [
  {
    name: "Accessible Recipes Website - Sensitivity Savors",
    tools: [
      "GitHub",
      "HTML",
      "CSS",
      "JavaScript",
      "Node.js",
      "MongoDB",
      "Python",
    ],
    description: [
      "Designed and implemented a recipe database schema to efficiently store necessary information for a recipes website",
      "Led a team in developing an accessible recipes web application that integrated client/server, web-based architecture, featuring a color-blind friendly color scheme, dyslexia friendly font, and more recipes in diverse diet categories",
      "Integrated backend and frontend connection of web application utilizing Node JS, Express, Mongoose, and MongoDB",
    ],
  },
  {
    name: "Pet Rock Sitting Website - Pebble Paradise",
    tools: ["GitHub", "HTML", "CSS", "JavaScript", "Cloudflare Workers KV"],
    description: [
      "Delegated tasks and utilized Github for group collaboration to create a non-commercial website for a pet rock sitting service",
      "Used HTML and CSS for front end web development and to implement web design",
      "Built a unique visitor counter for the website through back end web development with JavaScript and Cloudflare Workers KV",
    ],
  },
  {
    name: "Detecting Fake News Using Machine Learning ",
    tools: ["Python", "Linguistic Inquiry and Word Count (LIWC)"],
    description: [
      "Processed a fake news dataset obtained from Kaggle using the natural language processing software LIWC",
      "Utilized Python to implement several machine learning models such as decision tree classification, logistic regression, naive bayes, and support vector machines to classify news from dataset into two categories: fake news and real news",
    ],
  },
  {
    name: "An Analysis of Monkeypox Communication Among LGBTQ+ People on Social Media ",
    tools: ["Python", "Linguistic Inquiry and Word Count (LIWC)"],
    description: [
      "Used Python code to web scrape comments from top ten LGBTQ+ subreddits from Reddit posted from May 2022 - October 2022 to obtain a raw dataset and processed raw dataset using natural language processing software LIWC",
      "Performed cluster analyses and created parallel coordinate plots utilizing pandas, numpy, scikit-learn, and matplotlib through Python to effectively communicate findings from data",
    ],
  },
];

export {
  contactInfo,
  jobData,
  educationData,
  languages,
  tools,
  certifications,
  projectsData,
};
