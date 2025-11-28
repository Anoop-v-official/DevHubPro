-- Add a sample blog post
INSERT INTO Contribution (
  id,
  userId,
  type,
  title,
  content,
  status,
  category,
  tags,
  submittedAt,
  reviewedAt
) VALUES (
  'blog-' || hex(randomblob(16)),
  'cmifv31mj0004nrkpn25udcy4',
  'article',
  'Getting Started with DevHub Pro',
  '# Welcome to DevHub Pro

This is your first blog post! DevHub Pro is a comprehensive platform for developers.

## Features
- 50+ Free Developer Tools
- Code Playground
- Error Solutions Database
- Blog Platform

## Getting Started
Simply explore the tools and start coding!

**Happy Coding!** 🚀',
  'approved',
  'Tutorial',
  '["tutorial", "getting-started", "devhub"]',
  datetime('now'),
  datetime('now')
);

-- Add a sample error post
INSERT INTO ErrorPost (
  id,
  userId,
  title,
  description,
  errorMessage,
  language,
  tags,
  attempted,
  status,
  createdAt,
  updatedAt,
  views,
  voteCount
) VALUES (
  'error-' || hex(randomblob(16)),
  'cmifv31mj0004nrkpn25udcy4',
  'React useState not updating immediately',
  'I am calling setState but the value does not update immediately when I console.log it.',
  'Console shows old value after setState call',
  'JavaScript',
  '["react", "hooks", "state"]',
  'I tried adding useEffect but still seeing the issue',
  'open',
  datetime('now'),
  datetime('now'),
  0,
  0
);
