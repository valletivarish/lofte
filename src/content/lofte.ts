// All copy and facts from loftestudios.com (audited 2026-09-29). Obvious typos corrected
// ("Jubliee" -> "Jubilee", "Clintele" -> "Clientele"); dashes re-punctuated. Nothing invented.
// Theme-demo leftovers on that site (850+/5/4X/62% counters, demo portfolio, demo team, demo blog) are excluded.

export const site = {
  name: "Løfte Studios",
  legalName: "Lofte Studios LLP",
  headline: ["Side-kick for all", "content needs"],
  sub: "Copy, video, visuals, audio and localization for growing brands.",
  tagline: "Enhance your brand’s storytelling and reach with engaging content",
  promise: "Partnering with Løfte Studios means elevating your brand with a promise to deliver exceptional results.",
  weAre: "Digital storytellers with impactive narratives",
  knownFor: "Comprehensive, high-quality solutions",
  coordinates: "17.4065° N, 78.4772° E",
  city: "Hyderabad",
  country: "India",
  address: "Jubilee Hills, Road No. 36, Hyderabad, India",
  email: "kalyanr@loftestudios.com",
  phone: "+91 79815 34318",
  phoneHref: "tel:+917981534318",
  hours: "Mon to Fri, 10 am to 6 pm",
  closing: ["We manage your digital needs,", "so you can focus on strategic goals"],
  description:
    "Løfte Studios is a Hyderabad content studio: copywriting, video, visuals, audio and localization for growing brands, from strategy to delivery.",
  /** Production origin; indexing stays off until the domain switch is confirmed. */
  url: process.env.SITE_URL ?? "http://localhost:3000",
  indexing: process.env.SITE_INDEXING === "on",
  /** The live site links to bare instagram.com / facebook.com / twitter.com. No real handles yet. */
  social: [] as { label: string; href: string }[],
};

export const nav = [
  { href: "/about-us", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/contact", label: "Contact" },
];

// The four capabilities (Services page tabs; Home tiles). Disciplines are the site's own marquee words, grouped.
export type CapabilitySlug = "copy" | "video" | "visual" | "audio";
export const capabilities: { slug: CapabilitySlug; name: string; disciplines: string[]; image: string; alt: string }[] = [
  { slug: "copy", name: "Copy", disciplines: ["Copywriting", "Editing", "Scripting", "Transcreation"], image: "/images/service-words.jpg", alt: "A script page covered in red-pen edits" },
  { slug: "video", name: "Video", disciplines: ["Post", "Storyboarding", "Subtitling", "Captioning"], image: "/images/service-motion.jpg", alt: "An edit monitor with a multi-track timeline" },
  { slug: "visual", name: "Visual", disciplines: ["Graphics", "Infographics", "Illustration", "Visuals"], image: "/images/service-visual.jpg", alt: "Printed slides and chart prints spread on a table" },
  { slug: "audio", name: "Audio", disciplines: ["Narration", "Localization"], image: "/images/service-sound.jpg", alt: "A studio microphone with a pop filter in a vocal booth" },
];

// Hero callouts: six of the site's own disciplines, paired with neighbouring disciplines from the same list.
export const heroChips = [
  { name: "Copywriting", line: "Scripts and editing", icon: "copy" },
  { name: "Narration", line: "Voice with intent", icon: "audio" },
  { name: "Infographics", line: "Graphics and illustration", icon: "visual" },
  { name: "Video editing", line: "Post and storyboarding", icon: "video" },
  { name: "Localization", line: "Translation, transcreation", icon: "localization" },
  { name: "Subtitling", line: "Captions for every market", icon: "subtitles" },
] as const;

// The home-page marquee, in the site's own two rows.
export const disciplineRows = [
  ["Content", "Copywriting", "Editing", "Localization", "Translation", "Transcreation", "Subtitling", "Captioning", "Narration", "Illustration"],
  ["Graphics", "Infographics", "Visuals", "Post", "Scripting", "Curation", "Storyboarding", "Publishing", "Engagement", "Optimization", "Insights"],
];

export const opportunity = {
  label: "Enduring excellence",
  heading: "We saw an opportunity in the content industry",
  lede: "Businesses often struggle to find high-quality, yet affordable, content and design solutions. That’s why Løfte Studios exists.",
  body: "We provide comprehensive, accessible services that include content creation, graphic design, localization, video editing, and infographics, all tailored to meet the unique needs of growing businesses. Our focus is on delivering exceptional quality while ensuring affordability, so you can focus on what matters most: your business.",
};

// Supplied by the client (2026-10-05), verbatim.
export const aiLayer = {
  heading: "Multilingual human quality layer for AI products.",
  body: "We design, execute, evaluate, and assure multilingual AI operations across quality, safety, and release readiness.",
  verbs: ["Design", "Execute", "Evaluate", "Assure"],
  across: ["Quality", "Safety", "Release readiness"],
};

export const powerhouse = {
  lead: "Løfte Studios: a creative powerhouse, with a team of skilled",
  accent: "content strategists and producers,",
  tail: "always ready to elevate your next project.",
};

export type Stage = {
  slug: "discover" | "design" | "develop" | "distribute" | "deconstruct" | "delivery";
  n: string;
  name: string;
  label: string;
  category: string;
  summary: string;
  services: string[];
  intro: string;
  approach: string[];
  challenge: string;
  quote: { text: string; by: string };
  outro: string;
  /** Stage photograph (nav panel, home track, stage page). */
  image: string;
};

export const stages: Stage[] = [
  {
    slug: "discover",
    image: "/images/service-reach.jpg",
    n: "001",
    name: "Discover",
    label: "Uncovering potential",
    category: "Strategy",
    summary: "Identify content needs, set goals, and define a strategic approach to creative and localization projects.",
    services: ["Market research", "Content audits", "Brand voice definition", "Strategic planning"],
    intro:
      "Discovery is the foundational step where we delve deep into understanding your brand, goals, and audience. It’s about identifying opportunities and setting a strategic direction that guides all future endeavours.",
    approach: [
      "Before initiating any project, we conduct comprehensive market research to identify trends, opportunities, and challenges within your industry. Content audits help us assess your existing assets, determining strengths and areas for improvement.",
      "Defining your brand’s voice is a crucial outcome of the discovery phase. It sets the tone for all communications and ensures consistency across platforms. Strategic planning integrates these insights, laying a solid foundation for your brand’s journey forward.",
    ],
    challenge:
      "One common challenge businesses face is aligning their content strategy with overall objectives. Our discovery process bridges this gap by providing actionable insights and a clear strategy aligned with your goals.",
    quote: { text: "The key to success is to start before you’re ready.", by: "Marie Forleo" },
    outro: "By investing time in discovery, we set the stage for success in subsequent phases, ensuring all efforts are aligned and purpose-driven.",
  },
  {
    slug: "design",
    image: "/images/service-visual.jpg",
    n: "002",
    name: "Design",
    label: "Creative visuals",
    category: "Design",
    summary: "Develop visually appealing designs, including graphics, infographics, and multimedia content tailored to client goals.",
    services: ["Graphic design", "Infographics creation", "Multimedia content", "Video editing design"],
    intro:
      "Design goes beyond aesthetics; it’s about creating visuals that effectively communicate your brand’s message. Our design services encompass graphics, infographics, and multimedia content tailored to your goals.",
    approach: [
      "In the design phase, we translate your brand identity into visual elements that resonate with your audience. We craft compelling graphics and infographics that simplify complex information and enhance understanding.",
      "Our multimedia content and video editing expertise bring your brand stories to life through engaging visuals. We aim to create beautiful and functional designs, contributing to your brand’s overall success.",
    ],
    challenge:
      "Ensuring that visual designs not only look good but also serve a strategic purpose is a common challenge. We address this by closely aligning our design work with your brand strategy, ensuring each visual element enhances your messaging.",
    quote: { text: "Design is intelligence made visible.", by: "Alina Wheeler" },
    outro: "By focusing on purposeful design, we create visuals that capture attention and communicate your brand’s value effectively.",
  },
  {
    slug: "develop",
    image: "/images/service-words.jpg",
    n: "003",
    name: "Develop",
    label: "Content production",
    category: "Content creation",
    summary: "Create and produce high-quality content, including written, visual, and multimedia assets, optimized for multiple platforms.",
    services: ["Content writing", "Video editing", "Infographics production", "Localization", "Multimedia development"],
    intro:
      "Development is about creating and producing high-quality content across various formats. We specialize in content writing, video editing, infographics production, localization services, and multimedia development.",
    approach: [
      "We bring ideas to life through the production of engaging content. Our writers craft compelling narratives that align with your brand voice, while our video editors and multimedia specialists produce visual content that captivates your audience.",
      "Localization is integral to our development services. We adapt content to resonate with different cultures and languages, ensuring your message has a global reach.",
    ],
    challenge:
      "It is challenging to stand out in a crowded digital landscape. Our solution is producing high-quality, tailored content that speaks directly to your audience’s needs and interests.",
    quote: { text: "Content is king, but engagement is queen, and the lady rules the house.", by: "Mari Smith" },
    outro: "By focusing on quality and relevance, we develop content that attracts, engages, and retains your audience.",
  },
  {
    slug: "distribute",
    image: "/images/service-motion.jpg",
    n: "004",
    name: "Distribute",
    label: "Audience engagement",
    category: "Marketing",
    summary: "Distribute and localize content effectively across various channels to ensure audience reach and engagement.",
    services: ["Content localization", "Social media management", "Digital marketing", "Distribution strategy"],
    intro:
      "Distribution ensures that your content reaches the right audience at the right time. We focus on content localization, social media management, digital marketing, and content distribution strategies.",
    approach: [
      "Effective distribution is critical for maximizing content impact. We tailor strategies to target specific audience segments, utilizing the most appropriate channels for maximum engagement.",
      "Localization plays a significant role in adapting content to suit different markets and cultures, enhancing relevance and resonance.",
    ],
    challenge:
      "It is a common challenge to effectively cut through the noise and reach your audience. We employ targeted distribution methods, leveraging data and insights to optimize reach and engagement.",
    quote: { text: "The success of your content hinges on the success of your promotion.", by: "Rand Fishkin" },
    outro: "By focusing on strategic distribution, we ensure your content thrives in the digital space.",
  },
  {
    slug: "deconstruct",
    image: "/images/worktable.jpg",
    n: "005",
    name: "Deconstruct",
    label: "Performance analysis",
    category: "Analytics",
    summary: "Measure content effectiveness, analyze results, and optimize content for greater impact.",
    services: ["Performance analytics", "A/B testing", "Feedback analysis", "Optimization recommendations"],
    intro:
      "Deconstructing content performance is essential for continuous improvement. We provide performance analytics, A/B testing, audience feedback analysis, and optimization recommendations.",
    approach: [
      "We delve deep into data to understand how your content performs. By analyzing key metrics, we identify what’s working and areas for improvement.",
      "A/B testing allows us to experiment with variables, refining content for optimal engagement. Audience feedback provides qualitative insights that inform our strategies.",
    ],
    challenge:
      "Translating complex data into actionable insights can be challenging. We simplify this process, providing clear recommendations to enhance content effectiveness.",
    quote: { text: "Without data, you’re just another person with an opinion.", by: "W. Edwards Deming" },
    outro: "By deconstructing data, we empower you to make informed decisions that drive success.",
  },
  {
    slug: "delivery",
    image: "/images/service-sound.jpg",
    n: "006",
    name: "Delivery",
    label: "Timely execution",
    category: "Project management",
    summary: "Ensure smooth project management, timely content delivery, and ongoing post-launch support.",
    services: ["Project management", "Quality assurance", "Content maintenance", "Post-launch updates"],
    intro:
      "Delivery focuses on ensuring smooth project management, timely content delivery, and ongoing post-launch support. We oversee project management, quality assurance, content maintenance, and updates.",
    approach: [
      "Our delivery phase ensures that projects are executed efficiently and effectively. We coordinate all aspects, maintaining open communication to keep you informed every step of the way.",
      "Quality assurance is integral; we meticulously review all content to meet the highest standards. Post-launch, we provide ongoing support to keep your content fresh and relevant.",
    ],
    challenge:
      "Timely delivery without compromising quality is a common challenge. Our streamlined project management process emphasizes efficiency and attention to detail.",
    quote: { text: "Efficiency is doing things right; effectiveness is doing the right things.", by: "Peter Drucker" },
    outro: "By focusing on both efficiency and effectiveness, we deliver results that meet and exceed your expectations.",
  },
];

export const stageBySlug = (slug: string) => stages.find((s) => s.slug === slug);

export const servicesIntro = {
  label: "Redefining content creation",
  heading: "The way we work",
  sub: "Crafting functional and engaging content by blending creativity with purpose",
  body: "At Løfte Studios, we blend creativity with purpose, crafting content that is as functional as it is engaging. We ensure every word contributes meaningfully to your brand’s success and resonates with your audience.",
};

export const about = {
  label: "Sustained success",
  heading: "Your full-service content studio",
  lede: "Our methodology seamlessly integrates intuition and strategy, forming a robust research approach that guides our projects.",
  body: "Unleash your brand’s potential with our complete content services. From strategy to delivery, we’re here to drive your growth. Say goodbye to the hassle of managing multiple vendors and hello to a seamless, creative experience.",
  pillars: [
    {
      name: "Mission",
      items: [
        { title: "Deliver quality", body: "Our goal is to produce high-quality, innovative content that helps brands stand out in their industries, ensuring their message is clear and impactful." },
        { title: "Exceed expectations", body: "We are committed to consistently surpassing client expectations through creativity, precision, and dedication, delivering exceptional results every time." },
        { title: "Empower growth", body: "We focus on helping brands grow by providing customized solutions that resonate with their target audience and drive sustainable success." },
      ],
    },
    {
      name: "Vision",
      items: [
        { title: "Creative excellence", body: "We aim to set new benchmarks for creativity and excellence in content creation, constantly refining our approach to deliver cutting-edge solutions." },
        { title: "Innovate and inspire", body: "We strive to foster innovation and creativity, continually pushing the boundaries of what’s possible in content development to inspire audiences." },
        { title: "Impactful solutions", body: "Our vision is to empower brands with content that drives success, engagement, and long-lasting impact across all platforms and industries." },
      ],
    },
    {
      name: "Core values",
      items: [
        { title: "Innovation", body: "At Løfte Studios, we are constantly seeking innovative solutions to overcome digital challenges. We greatly value creativity and originality in all aspects of our services." },
        { title: "Integrity", body: "Transparency and honesty are the core principles of all our projects and interactions. We believe that long-term success is built on solid and trust-based relationships." },
        { title: "Excellence", body: "We are dedicated to delivering the highest quality in every project, surpassing expectations with meticulous attention to detail and a dedication to excellence." },
      ],
    },
  ],
  process: [
    { name: "Research", body: "Gather insights, analyze data, and understand the project’s goals to establish a solid foundation for creative execution." },
    { name: "Planning", body: "Develop a clear strategy, timeline, and resource allocation to ensure efficient and effective project progress." },
    { name: "Conceptualize", body: "Brainstorm and generate ideas that align with the project objectives, refining them into actionable concepts." },
    { name: "Create", body: "Produce content, designs, or media, focusing on quality and creativity to bring the concept to life." },
    { name: "Review", body: "Conduct a thorough assessment, ensuring the work meets quality standards and aligns with the project’s goals." },
    { name: "Revise", body: "Make necessary adjustments based on feedback, refining the work to better meet client expectations and objectives." },
    { name: "Deliver", body: "Finalize and hand over the completed project, ensuring everything is ready for launch or publication." },
  ],
};

// Carried over from loftestudios.com at the client's request. Confirm each permission before launch.
export const clients = [
  { name: "Lionbridge", logo: "/clients/lionbridge.png" },
  { name: "Pactera EDGE", logo: "/clients/pactera-edge.png" },
  { name: "Localsoft", logo: "/clients/localsoft.png" },
  { name: "Centific", logo: "/clients/centific.png" },
  { name: "Magnon Sancus", logo: "/clients/magnon-sancus.png" },
  { name: "Dcode", logo: "/clients/dcode.png" },
  { name: "Two12 Studio", logo: "/clients/two12-studio.png" },
];

// Quotes and company logos exactly as published on loftestudios.com (200×200 avatars). Written permission to be confirmed at launch.
export const testimonials = [
  { quote: "Exceptional quality and service, always on schedule.", name: "Abhilash Shivdasan", company: "Pactera EDGE", logo: "/clients/avatars/pactera-edge.jpg" },
  { quote: "Timely delivery and outstanding visuals. Highly recommend!", name: "Minni Tiwari", company: "Lionbridge", logo: "/clients/avatars/lionbridge.png" },
  { quote: "Their creativity boosted our engagement significantly.", name: "Vamshidhar Reddy", company: "Aarna Private Wealth", logo: "/clients/avatars/aarna.jpg" },
  { quote: "Løfte Studios elevated our content beyond expectations.", name: "Vignesh Kumar", company: "Thasyai Analytics", logo: "/clients/avatars/thasyai.jpg" },
];

export const contact = {
  heading: "Get in touch",
  prompt: "Ready to elevate your brand with Løfte Studios? We’re happy to help. Fill out the form to get started.",
};
