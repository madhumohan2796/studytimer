import { ArrowLeft, Calendar, Clock } from 'lucide-react';

interface BlogPostProps {
  blogId: string;
  onBack: () => void;
}

const blogContent: Record<string, any> = {
  '1': {
    title: 'The Science Behind the Pomodoro Technique',
    date: 'May 15, 2026',
    readTime: '5 min read',
    category: 'Productivity',
    content: `
      <p>The Pomodoro Technique, developed by Francesco Cirillo in the late 1980s, has become one of the most popular time management methods worldwide. But what makes this simple technique so effective?</p>

      <h2>Understanding the Brain Science</h2>
      <p>Research in cognitive psychology shows that our brains work best in focused bursts. The Pomodoro Technique leverages this by breaking work into 25-minute intervals, allowing your brain to maintain high levels of concentration without burning out.</p>

      <p>Studies have demonstrated that sustained attention begins to decline after about 20-30 minutes of continuous work. By taking regular breaks, you give your prefrontal cortex—the part of your brain responsible for complex thinking and decision-making—time to reset and recharge.</p>

      <h2>The Power of Time Constraints</h2>
      <p>When you know you only have 25 minutes to work on a task, you're more likely to enter a state of flow. The time constraint creates a sense of urgency that helps overcome procrastination and eliminates the feeling of having endless time to complete something.</p>

      <h2>Break Time Benefits</h2>
      <p>The 5-minute breaks between Pomodoros aren't just rest periods—they're crucial for memory consolidation. During these breaks, your brain processes and stores the information you've just learned or worked with, making your study sessions more effective.</p>

      <h2>Implementing the Technique</h2>
      <p>To get started with the Pomodoro Technique:</p>
      <ul>
        <li>Choose a task you want to work on</li>
        <li>Set your timer for 25 minutes</li>
        <li>Work with complete focus until the timer rings</li>
        <li>Take a 5-minute break</li>
        <li>After four Pomodoros, take a longer 15-30 minute break</li>
      </ul>

      <p>The beauty of this technique is its simplicity. You don't need special tools or extensive planning—just a timer and the commitment to focused work.</p>
    `,
  },
  '2': {
    title: 'How to Build Sustainable Study Habits',
    date: 'May 10, 2026',
    readTime: '7 min read',
    category: 'Study Tips',
    content: `
      <p>Building study habits that last requires more than just willpower—it requires a systematic approach grounded in behavioral science.</p>

      <h2>Start Small and Scale Gradually</h2>
      <p>One of the biggest mistakes students make is trying to overhaul their entire study routine overnight. Instead, start with just one 25-minute study session per day. Once that becomes automatic, gradually add more sessions.</p>

      <h2>Stack Your Habits</h2>
      <p>Habit stacking is a powerful technique where you attach a new habit to an existing one. For example: "After I pour my morning coffee, I will study for 25 minutes." This leverages existing neural pathways to make the new habit stick faster.</p>

      <h2>Create Environmental Cues</h2>
      <p>Your environment plays a crucial role in habit formation. Designate a specific study space that your brain associates with focused work. Keep your study materials visible and easily accessible to reduce friction.</p>

      <h2>Track Your Progress</h2>
      <p>Research shows that people who track their habits are significantly more likely to maintain them. Use a simple calendar or app to mark off each successful study session. The visual record of your progress creates motivation to keep the streak going.</p>

      <h2>Build in Accountability</h2>
      <p>Share your study goals with a friend or study partner. Public commitment increases follow-through, and having someone to check in with makes you more likely to stick with your routine even when motivation wanes.</p>

      <p>Remember, sustainable habits aren't built on motivation—they're built on systems. Focus on making studying easy, automatic, and rewarding, and the results will follow.</p>
    `,
  },
  '3': {
    title: 'Deep Work vs Shallow Work: Understanding the Difference',
    date: 'May 5, 2026',
    readTime: '6 min read',
    category: 'Focus',
    content: `
      <p>In his groundbreaking book "Deep Work," Cal Newport distinguishes between two types of work that occupy our days. Understanding this distinction is crucial for maximizing your productivity and achieving meaningful results.</p>

      <h2>What is Deep Work?</h2>
      <p>Deep work is professional activity performed in a state of distraction-free concentration that pushes your cognitive capabilities to their limit. These efforts create new value, improve your skills, and are hard to replicate.</p>

      <p>Examples include: writing a research paper, solving complex mathematical problems, learning a new programming language, or mastering a difficult musical piece.</p>

      <h2>What is Shallow Work?</h2>
      <p>Shallow work consists of non-cognitively demanding, logistical-style tasks often performed while distracted. These tasks don't create much new value and are easy to replicate.</p>

      <p>Examples include: responding to emails, attending meetings, organizing files, or scrolling through social media.</p>

      <h2>Why Deep Work Matters More</h2>
      <p>In our increasingly connected world, the ability to perform deep work is becoming rare—and therefore increasingly valuable. Those who cultivate this skill will thrive, while those who don't will struggle to compete.</p>

      <h2>Protecting Your Deep Work Time</h2>
      <p>To maximize deep work in your schedule:</p>
      <ul>
        <li>Schedule specific blocks for deep work and treat them as non-negotiable</li>
        <li>Eliminate all distractions: turn off notifications, close unnecessary tabs, put your phone in another room</li>
        <li>Start with shorter sessions (25-50 minutes) and gradually build up your capacity</li>
        <li>Batch shallow work into dedicated time blocks rather than letting it interrupt deep work</li>
      </ul>

      <p>The modern world constantly pulls us toward shallow work. Resisting this pull and protecting time for deep work is one of the most valuable skills you can develop.</p>
    `,
  },
  '4': {
    title: 'The Perfect Break: What to Do Between Study Sessions',
    date: 'April 28, 2026',
    readTime: '4 min read',
    category: 'Wellness',
    content: `
      <p>How you spend your breaks between study sessions can be just as important as how you spend your study time. The right break activities help you recharge, while the wrong ones can leave you more drained than before.</p>

      <h2>Movement-Based Breaks</h2>
      <p>Physical movement is one of the best ways to refresh your brain. Try:</p>
      <ul>
        <li>A short walk around the block</li>
        <li>Simple stretches at your desk</li>
        <li>A few minutes of yoga</li>
        <li>Dancing to a favorite song</li>
      </ul>
      <p>Movement increases blood flow to the brain, delivering oxygen and nutrients that help you think more clearly.</p>

      <h2>Nature Exposure</h2>
      <p>Even brief exposure to nature can restore mental energy. If possible, step outside and look at trees, the sky, or water. If you can't go outside, looking at images of nature or keeping plants nearby can provide similar benefits.</p>

      <h2>Mindfulness and Meditation</h2>
      <p>A short meditation or breathing exercise can help reset your nervous system. Try the 4-7-8 breathing technique: inhale for 4 counts, hold for 7 counts, exhale for 8 counts. Repeat 3-4 times.</p>

      <h2>What to Avoid</h2>
      <p>Certain activities might seem relaxing but actually drain your mental energy:</p>
      <ul>
        <li>Social media scrolling—it's designed to be addictive and hard to stop</li>
        <li>Starting a new cognitively demanding task</li>
        <li>Watching videos or TV shows—easy to get sucked in beyond your break time</li>
      </ul>

      <p>The goal of a break is to give your mind a rest while keeping your energy up. Choose activities that are genuinely restorative, not just superficially entertaining.</p>
    `,
  },
  '5': {
    title: 'Time Blocking for Students: A Complete Guide',
    date: 'April 20, 2026',
    readTime: '8 min read',
    category: 'Study Tips',
    content: `
      <p>Time blocking is a time management method that involves dividing your day into blocks of time, with each block dedicated to a specific task or type of work. For students juggling multiple classes, assignments, and activities, this technique can be transformative.</p>

      <h2>Why Time Blocking Works</h2>
      <p>When you time block, you make decisions about your time in advance, rather than constantly asking yourself "what should I work on next?" This reduces decision fatigue and makes it easier to get started on important tasks.</p>

      <h2>How to Create Your Time Blocks</h2>
      <p>Start by listing all your commitments: classes, study time, meals, sleep, exercise, social activities, and free time. Then create blocks for each:</p>

      <h3>Fixed Blocks</h3>
      <p>These are non-negotiable commitments like class times, work shifts, or team practice. Schedule these first.</p>

      <h3>Priority Blocks</h3>
      <p>Dedicate your peak energy hours to your most important or difficult work. For most people, this is 2-4 hours after waking up.</p>

      <h3>Maintenance Blocks</h3>
      <p>Schedule time for routine tasks like email, organizing notes, or meal prep. Batching these activities is more efficient than scattering them throughout the day.</p>

      <h3>Buffer Blocks</h3>
      <p>Leave some unscheduled time between blocks for transitions, unexpected issues, or tasks that run over.</p>

      <h2>Common Mistakes to Avoid</h2>
      <ul>
        <li>Overestimating how much you can accomplish in a time block</li>
        <li>Not building in breaks between blocks</li>
        <li>Creating blocks that are too rigid—allow for some flexibility</li>
        <li>Forgetting to schedule time for rest and recreation</li>
      </ul>

      <h2>Tools for Time Blocking</h2>
      <p>You can use digital calendars like Google Calendar, specialized apps like Todoist or Notion, or simply a paper planner. The key is consistency—stick with one system long enough for it to become habitual.</p>

      <p>Time blocking isn't about cramming more into your day. It's about being intentional with your time and ensuring your schedule aligns with your priorities.</p>
    `,
  },
  '6': {
    title: 'Why Short Breaks Make You More Productive',
    date: 'April 12, 2026',
    readTime: '5 min read',
    category: 'Productivity',
    content: `
      <p>It might seem counterintuitive, but taking regular short breaks can actually increase your overall productivity. Here's what the science says.</p>

      <h2>The Ultradian Rhythm</h2>
      <p>Your body operates on an ultradian rhythm—a 90-120 minute cycle of peak performance followed by a natural dip in energy and focus. Fighting this rhythm leads to diminishing returns. Working with it by taking breaks maximizes your effectiveness.</p>

      <h2>Attention Restoration Theory</h2>
      <p>Researchers have found that our ability to concentrate is a limited resource. When you focus intensely, you deplete this resource. Short breaks help restore your attention capacity, allowing you to return to work with renewed focus.</p>

      <h2>Memory Consolidation</h2>
      <p>Studies show that your brain continues processing information during breaks. This is called "offline learning," and it's crucial for moving information from short-term to long-term memory. Without breaks, you learn less effectively.</p>

      <h2>Creativity Boost</h2>
      <p>Some of our best ideas come when we're not actively working on a problem. Breaks allow your mind to make unexpected connections and find creative solutions that wouldn't emerge during focused work.</p>

      <h2>Optimal Break Timing</h2>
      <p>Research suggests:</p>
      <ul>
        <li>Take a 5-minute break every 25-30 minutes for intensive mental work</li>
        <li>Take a longer 15-20 minute break every 90-120 minutes</li>
        <li>Stand up and move during breaks to maximize the restorative effect</li>
      </ul>

      <h2>The Productivity Paradox</h2>
      <p>More hours doesn't equal more output. A study of knowledge workers found that those who took regular breaks accomplished more and produced higher quality work than those who powered through without stopping.</p>

      <p>Think of breaks not as time away from work, but as an essential part of working effectively. They're not a luxury—they're a necessity for sustained high performance.</p>
    `,
  },
};

export function BlogPost({ blogId, onBack }: BlogPostProps) {
  const post = blogContent[blogId];

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl mb-4">Post not found</h1>
          <button
            onClick={onBack}
            className="text-primary hover:underline"
          >
            Back to blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-16 py-24 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-12 text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to blog
        </button>

        {/* Post Header */}
        <div className="mb-12">
          <div className="mb-6">
            <span className="text-primary text-sm uppercase tracking-wide">
              {post.category}
            </span>
          </div>
          <h1 className="text-6xl mb-6">{post.title}</h1>
          <div className="flex items-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {post.date}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </div>
          </div>
        </div>

        {/* Post Content */}
        <div className="prose prose-lg max-w-none">
          <article
            className="text-foreground [&>p]:mb-6 [&>p]:leading-relaxed [&>h2]:text-4xl [&>h2]:mt-12 [&>h2]:mb-6 [&>h3]:text-2xl [&>h3]:mt-8 [&>h3]:mb-4 [&>ul]:mb-6 [&>ul]:ml-6 [&>ul>li]:mb-2 [&>ul>li]:list-disc"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>
    </div>
  );
}
