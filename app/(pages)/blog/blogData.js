// Blog posts data - replace with your actual blog posts
export const blogPosts = [
  {
    id: 1,
    slug: "the-future-of-ui-ux-design-in-2024",
    title: "The Future of UI/UX Design in 2024",
    excerpt:
      "Exploring the latest trends and innovations shaping the design landscape this year. From AI-powered design tools to sustainable design practices, discover what's next in the world of digital design.",
    content: `
      <p>The world of UI/UX design is constantly evolving, and 2024 brings exciting new trends and technologies that are reshaping how we create digital experiences.</p>
      
      <h2>AI-Powered Design Tools</h2>
      <p>Artificial intelligence is revolutionizing the design process. Tools like Figma's AI features and Midjourney are helping designers create faster and more efficiently. AI can now generate design variations, suggest color palettes, and even create entire layouts based on simple prompts.</p>
      
      <h2>Sustainable Design Practices</h2>
      <p>As environmental concerns grow, designers are focusing on creating more sustainable digital products. This includes optimizing for energy efficiency, reducing data usage, and designing for longevity rather than planned obsolescence.</p>
      
      <h2>Accessibility First</h2>
      <p>Accessibility is no longer an afterthought. Designers are prioritizing inclusive design from the start, ensuring that digital products are usable by everyone, regardless of their abilities.</p>
      
      <h2>Conclusion</h2>
      <p>The future of UI/UX design is bright, with new technologies and practices that make design more efficient, inclusive, and sustainable. As designers, we must stay ahead of these trends to create the best possible experiences for our users.</p>
    `,
    category: "Design",
    date: "March 15, 2024",
    readTime: "5 min read",
    image: "/projects/ecommerce.png",
    author: "Owen Digitals",
  },
  {
    id: 2,
    slug: "building-scalable-nextjs-applications",
    title: "Building Scalable Next.js Applications",
    excerpt:
      "Best practices and patterns for creating maintainable and performant web applications. Learn about server components, caching strategies, and optimization techniques.",
    content: `
      <p>Next.js has become the go-to framework for building modern React applications. In this article, we'll explore best practices for creating scalable and maintainable Next.js applications.</p>
      
      <h2>Server Components</h2>
      <p>Next.js 13+ introduced Server Components, which allow you to render components on the server. This reduces the JavaScript bundle size and improves performance by moving computation to the server.</p>
      
      <h2>Caching Strategies</h2>
      <p>Effective caching is crucial for performance. Next.js provides multiple caching options including static generation, server-side rendering, and incremental static regeneration.</p>
      
      <h2>Code Splitting</h2>
      <p>Proper code splitting ensures that users only download the JavaScript they need. Use dynamic imports and React.lazy to split your code effectively.</p>
      
      <h2>Conclusion</h2>
      <p>Building scalable Next.js applications requires careful planning and following best practices. By leveraging server components, effective caching, and code splitting, you can create applications that perform well at scale.</p>
    `,
    category: "Business",
    date: "March 10, 2024",
    readTime: "8 min read",
    image: "/projects/finddr.png",
    author: "Owen Digitals",
  },
  {
    id: 3,
    slug: "design-systems-complete-guide",
    title: "Design Systems: A Complete Guide",
    excerpt:
      "How to create and maintain effective design systems that scale with your team. From component libraries to documentation, we cover everything you need to know.",
    content: `
      <p>Design systems are essential for maintaining consistency and efficiency in large-scale projects. This guide will walk you through creating and maintaining an effective design system.</p>
      
      <h2>What is a Design System?</h2>
      <p>A design system is a collection of reusable components, guided by clear standards, that can be assembled to build any number of applications.</p>
      
      <h2>Building Your Component Library</h2>
      <p>Start by identifying common patterns in your designs. Create reusable components that can be customized through props and theming.</p>
      
      <h2>Documentation is Key</h2>
      <p>Good documentation ensures that your design system is actually used. Document usage guidelines, code examples, and design principles.</p>
      
      <h2>Conclusion</h2>
      <p>A well-maintained design system can significantly improve your team's productivity and ensure consistency across all your products.</p>
    `,
    category: "Design",
    date: "March 5, 2024",
    readTime: "6 min read",
    image: "/projects/true-north.png",
    author: "Owen Digitals",
  },
  {
    id: 4,
    slug: "accessibility-modern-web-design",
    title: "Accessibility in Modern Web Design",
    excerpt:
      "Creating inclusive digital experiences that work for everyone. Learn about WCAG guidelines, semantic HTML, and accessibility testing tools.",
    content: `
      <p>Accessibility should be a priority in every web project. This article covers essential practices for creating accessible web experiences.</p>
      
      <h2>WCAG Guidelines</h2>
      <p>The Web Content Accessibility Guidelines (WCAG) provide a framework for making web content accessible. Follow WCAG 2.1 Level AA as a minimum standard.</p>
      
      <h2>Semantic HTML</h2>
      <p>Using semantic HTML elements helps screen readers understand your content. Use proper heading hierarchy, landmarks, and ARIA labels when necessary.</p>
      
      <h2>Testing Tools</h2>
      <p>Tools like axe DevTools, WAVE, and Lighthouse can help you identify accessibility issues in your designs.</p>
      
      <h2>Conclusion</h2>
      <p>Creating accessible websites isn't just the right thing to do—it also improves your site for all users and can help with SEO.</p>
    `,
    category: "Design",
    date: "February 28, 2024",
    readTime: "7 min read",
    image: "/projects/web-kitchen.png",
    author: "Owen Digitals",
  },
  {
    id: 5,
    slug: "performance-optimization-techniques",
    title: "Performance Optimization Techniques",
    excerpt:
      "Speed up your websites with these proven optimization strategies. From image optimization to code splitting, improve your site's performance.",
    content: `
      <p>Performance is crucial for user experience and SEO. Here are proven techniques to optimize your website's performance.</p>
      
      <h2>Image Optimization</h2>
      <p>Optimize images by using modern formats like WebP, implementing lazy loading, and serving appropriately sized images for different devices.</p>
      
      <h2>Code Splitting</h2>
      <p>Split your JavaScript bundles to load only what's needed. Use dynamic imports and route-based code splitting.</p>
      
      <h2>Caching Strategies</h2>
      <p>Implement effective caching at multiple levels: browser caching, CDN caching, and server-side caching.</p>
      
      <h2>Conclusion</h2>
      <p>Performance optimization is an ongoing process. Regularly audit your site and implement these techniques to keep it fast.</p>
    `,
    category: "Business",
    date: "February 20, 2024",
    readTime: "6 min read",
    image: "/projects/jedidah.png",
    author: "Owen Digitals",
  },
  {
    id: 6,
    slug: "psychology-color-ui-design",
    title: "The Psychology of Color in UI Design",
    excerpt:
      "Understanding how colors influence user behavior and emotions. Learn to choose color palettes that enhance user experience and convey the right message.",
    content: `
      <p>Color is one of the most powerful tools in a designer's arsenal. Understanding color psychology can help you create more effective user interfaces.</p>
      
      <h2>Color and Emotion</h2>
      <p>Different colors evoke different emotions. Red can create urgency, blue conveys trust, and green suggests growth and success.</p>
      
      <h2>Cultural Considerations</h2>
      <p>Color meanings vary across cultures. Research your target audience to ensure your color choices resonate positively.</p>
      
      <h2>Accessibility</h2>
      <p>Ensure sufficient color contrast for readability. Use tools to check that your color combinations meet WCAG standards.</p>
      
      <h2>Conclusion</h2>
      <p>Thoughtful color choices can significantly impact user experience. Choose colors that align with your brand and support your users' goals.</p>
    `,
    category: "Design",
    date: "February 15, 2024",
    readTime: "5 min read",
    image: "/projects/organstation.png",
    author: "Owen Digitals",
  },
  {
    id: 7,
    slug: "my-journey-as-a-creative",
    title: "My Journey as a Creative Professional",
    excerpt:
      "Reflecting on my path from aspiring designer to running my own creative studio. The challenges, lessons learned, and what keeps me motivated.",
    content: `
      <p>Looking back on my journey, I can see how each experience has shaped me into the creative professional I am today.</p>
      
      <h2>The Early Days</h2>
      <p>Starting out, I was fascinated by how design could solve problems and create beautiful experiences. Every project was a learning opportunity.</p>
      
      <h2>Building a Career</h2>
      <p>As I grew, I learned the importance of balancing creativity with business acumen. Running a creative business requires more than just design skills.</p>
      
      <h2>Lessons Learned</h2>
      <p>The biggest lesson? Never stop learning. The design industry evolves rapidly, and staying curious is essential for growth.</p>
      
      <h2>Conclusion</h2>
      <p>My journey continues, and I'm excited about what's next. Every day brings new challenges and opportunities to create something meaningful.</p>
    `,
    category: "Personal Life",
    date: "February 10, 2024",
    readTime: "4 min read",
    image: "/projects/ecommerce.png",
    author: "Owen Digitals",
  },
  {
    id: 8,
    slug: "building-a-creative-business",
    title: "Building a Creative Business from Scratch",
    excerpt:
      "Insights on starting and growing a creative agency. From finding clients to managing projects, learn what it takes to build a successful creative business.",
    content: `
      <p>Starting a creative business is both exciting and challenging. Here's what I've learned from building my own creative studio.</p>
      
      <h2>Finding Your Niche</h2>
      <p>Identify what makes you unique. Specializing in a specific area can help you stand out and attract the right clients.</p>
      
      <h2>Client Relationships</h2>
      <p>Building strong relationships with clients is crucial. Communication, reliability, and delivering quality work are the foundations of success.</p>
      
      <h2>Managing Growth</h2>
      <p>As your business grows, you'll need systems and processes. Invest in tools and workflows that scale with your business.</p>
      
      <h2>Conclusion</h2>
      <p>Building a creative business takes time, dedication, and a willingness to learn. Stay focused on your goals and keep pushing forward.</p>
    `,
    category: "Business",
    date: "February 5, 2024",
    readTime: "6 min read",
    image: "/projects/finddr.png",
    author: "Owen Digitals",
  },
  {
    id: 9,
    slug: "work-life-balance-creative",
    title: "Finding Balance: Life as a Creative Professional",
    excerpt:
      "How I maintain work-life balance while running a creative business. Tips for staying productive without burning out.",
    content: `
      <p>Maintaining balance is one of the biggest challenges for creative professionals. Here's how I've learned to manage it.</p>
      
      <h2>Setting Boundaries</h2>
      <p>It's important to set clear boundaries between work and personal time. This helps prevent burnout and keeps you fresh creatively.</p>
      
      <h2>Time Management</h2>
      <p>Effective time management is key. I use techniques like time blocking and the Pomodoro method to stay focused and productive.</p>
      
      <h2>Taking Breaks</h2>
      <p>Regular breaks are essential for creativity. Sometimes the best ideas come when you step away from your work.</p>
      
      <h2>Conclusion</h2>
      <p>Finding balance is an ongoing process. What works for me might not work for you, but the key is to be intentional about how you spend your time.</p>
    `,
    category: "Personal Life",
    date: "January 28, 2024",
    readTime: "5 min read",
    image: "/projects/true-north.png",
    author: "Owen Digitals",
  },
];

// Helper function to get post by slug
export function getPostBySlug(slug) {
  return blogPosts.find((post) => post.slug === slug);
}

// Helper function to get all slugs
export function getAllSlugs() {
  return blogPosts.map((post) => post.slug);
}

