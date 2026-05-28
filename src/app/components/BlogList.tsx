import { Calendar, Clock } from 'lucide-react';

interface BlogListProps {
  onBlogSelect: (blogId: string) => void;
}

const blogPosts = [
  {
    id: '1',
    title: 'The Science Behind the Pomodoro Technique',
    excerpt: 'Discover how time-blocking and focused work sessions can dramatically improve your productivity and mental clarity.',
    date: 'May 15, 2026',
    readTime: '5 min read',
    category: 'Productivity',
  },
  {
    id: '2',
    title: 'How to Build Sustainable Study Habits',
    excerpt: 'Learn evidence-based strategies for creating study routines that actually stick and deliver long-term results.',
    date: 'May 10, 2026',
    readTime: '7 min read',
    category: 'Study Tips',
  },
  {
    id: '3',
    title: 'Deep Work vs Shallow Work: Understanding the Difference',
    excerpt: 'Explore the concept of deep work and why it matters more than ever in our distraction-filled world.',
    date: 'May 5, 2026',
    readTime: '6 min read',
    category: 'Focus',
  },
  {
    id: '4',
    title: 'The Perfect Break: What to Do Between Study Sessions',
    excerpt: 'Maximize your break time with activities that actually help you recharge and maintain peak performance.',
    date: 'April 28, 2026',
    readTime: '4 min read',
    category: 'Wellness',
  },
  {
    id: '5',
    title: 'Time Blocking for Students: A Complete Guide',
    excerpt: 'Master the art of time blocking to balance coursework, extracurriculars, and personal time effectively.',
    date: 'April 20, 2026',
    readTime: '8 min read',
    category: 'Study Tips',
  },
  {
    id: '6',
    title: 'Why Short Breaks Make You More Productive',
    excerpt: 'Scientific research shows that regular breaks boost creativity, memory retention, and overall work quality.',
    date: 'April 12, 2026',
    readTime: '5 min read',
    category: 'Productivity',
  },
];

export function BlogList({ onBlogSelect }: BlogListProps) {
  return (
    <div className="px-16 py-24 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-7xl mb-4">Study Timer Blog</h1>
          <p className="text-muted-foreground text-xl">
            Tips, insights, and strategies for better focus and productivity
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-16">
          {blogPosts.map((post) => (
            <button
              key={post.id}
              onClick={() => onBlogSelect(post.id)}
              className="bg-card border border-border rounded-3xl p-8 text-left transition-all hover:scale-[1.02] hover:shadow-xl group"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-primary text-sm uppercase tracking-wide">
                  {post.category}
                </span>
              </div>
              <h2 className="text-3xl mb-4 group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
