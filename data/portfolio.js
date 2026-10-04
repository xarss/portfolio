/**
 * PORTFOLIO CONTENT
 * Edit only this file to change the text, projects, experience and links on the site.
 * The design lives in css/style.css and the rendering code in js/main.js.
 *
 * Colors (they come from the VS Code theme):
 *   "red" | "orange" | "yellow" | "green" | "blue" | "purple" | "cyan" | "pink"
 *
 * Colored words inside any text: write {color:words}, for example
 *   "cut from {red:6 hours} to {green:minutes}"
 */
const PORTFOLIO_DATA = {

  // ---------------------------------------------------------------------------
  // PROFILE (hero, contact and footer)
  // ---------------------------------------------------------------------------
  profile: {
    name: "Guilherme Schwarz",
    headline: "Guilherme Schwarz is a fullstack developer",
    headlineMuted: "who also analyzes data and automates IT processes.",
    // Label/value pairs shown under the headline. `note` is an optional second line.
    facts: [
      {
        label: "location",
        value: "Curitiba, Brazil",
        note: "Open for {blue:remote} jobs and on site jobs in {yellow:Europe}."
      },
      { label: "status", value: "Open to Fullstack, Data and IT Automation roles or freelance projects" },
      { label: "stack",  value: "Python, JavaScript, TypeScript, SQL, PowerShell, C#, React, Next.js, Vue.js, Angular, Node.js, FastAPI, .NET, Azure, Docker, AI Assisted Code" },
      { label: "languages", value: "{green:Portuguese} (native), {blue:English} (fluent), {yellow:Spanish} (basic)" }
    ],
    email: "guichiwawa@gmail.com",
    // Shown in the contact section as a WhatsApp link (the number is used as is,
    // only its digits go into the link).
    phone: "+55 (41) 99219-1032",
    contactHeading: "Let's talk.",
    links: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/guilherme-schwarz-softwareengineer" },
      { label: "GitHub",   url: "https://github.com/xarss" },
      { label: "CV",       url: "https://xarss.github.io/cv/" }
    ]
  },

  // ---------------------------------------------------------------------------
  // WORK EXPERIENCE (shown first, before the projects)
  // Newest first. In bullets, {red:...} marks the "before / bad" number and
  // {green:...} the "after / good" result. `tech` is optional, per bullet.
  // ---------------------------------------------------------------------------
  experience: [
    {
      company: "ExxonMobil",
      role: "Data Analyst & Full-Stack Developer",
      period: "Jan 2023 — Jan 2026",
      path: "Data Analyst Trainee (Jan 2023 — Jan 2024) → Data Analyst & Full-Stack Developer (Jan 2024 — Jan 2026)",
      summary: "Supporting business teams with data, automation and internal tools. In practice, a software engineer role focused on IT process automation and data engineering, building full-stack tools for non-technical users.",
      bullets: [
        {
          text: "Created an internal Data Lake that replaced {red:6+ hour vendor API extractions} with {green:up-to-date SQL tables}, enabling {green:near-instant queries}, live dashboards and data-driven automations.",
          tech: ["SQL Server", "PowerShell", "Power BI"]
        },
        {
          text: "Developed self-service tools for business data management, cutting manual tasks that took {red:2-8 hours per day} down to {green:minutes of validation} while also {green:preventing human error}.",
          tech: ["React", "Next.js", ".NET", "Entity Framework", "SQL Server", "Azure", "shadcn"]
        },
        {
          text: "Migrated legacy code from on-premises servers to GitHub and implemented a CI/CD pipeline with Development, Acceptance and Production environments, deploying to multiple servers and setting code standards for the team."
        },
        {
          text: "Automated recurring daily, weekly and monthly IT support tasks that took {red:15-45 minutes each}, {green:freeing the team for higher-value work}."
        },
        {
          text: "Automated data reports that used to be requested and built manually, {green:delivering ready-to-use data} to Subject Matter Experts."
        },
        {
          text: "Acted as the bridge between business teams and IT, turning manual processes into simple tools."
        }
      ],
      technologies: [
        "React", "Next.js", ".NET", "SQL Server", "PowerShell", "Shell Scripting", "Azure",
        "Power BI", "GitHub", "GitHub Actions", "Windows Server", "Agile Scrum"
      ]
    }
  ],

  // ---------------------------------------------------------------------------
  // PROJECT CATEGORIES
  // Shown on the page (and in the top menu) in this order. Each one gets its own color.
  // `id` is what each project's `category` field points to.
  // ---------------------------------------------------------------------------
  categories: [
    { id: "projects",     label: "Projects",     color: "blue",   blurb: "Commercial and personal projects." },
    { id: "volunteering", label: "Volunteering", color: "green",  blurb: "Software built for animal-rescue NGOs." },
    { id: "games",        label: "Games",        color: "purple", blurb: "Game jam entries and prototypes." }
  ],

  // ---------------------------------------------------------------------------
  // PROJECTS
  // Listed by category, in the order written here.
  //
  //   category    id of one of the categories above
  //   title       project name
  //   tagline     short line shown under the title
  //   meta        small text on the right of the row (event, year, team...)
  //   description one short paragraph shown when the project is opened
  //   highlights  bullet list: what was built or learned
  //   stack       tags with every technology used
  //   links       [{ label, url }]  (leave empty if there is no link yet)
  //   images      [{ src, alt }]    (leave empty if there is no photo yet;
  //                                  with 2+ images a small thumbnail strip appears)
  // ---------------------------------------------------------------------------
  projects: [

    // ----- PROJECTS (commercial / personal) ----------------------------------
    {
      category: "projects",
      title: "Rifa no Pix",
      tagline: "Online raffles with automatic Pix payments",
      meta: "Commercial · React · Supabase",
      description: "Online raffle system with Pix payments, auto-numbered tickets and a real-time draw panel. Buyers pick their numbers, get a payment link generated on the spot, and the system assigns everything automatically.",
      highlights: [
        "Pix payments through the Efí API, confirmed by webhook",
        "Tickets move from available to reserved to paid, and unpaid Pix expires on its own",
        "Draw panel with winner records per prize",
        "Tickets delivered by WhatsApp and transactional email",
        "Roles and row-level security on every sensitive table",
        "Landing page and blog with dozens of pre-rendered SEO pages, new posts published daily by GitHub Actions"
      ],
      stack: [
        "React", "TypeScript", "Vite", "vite-react-ssg", "Tailwind CSS", "shadcn/ui", "React Router",
        "TanStack Query", "React Hook Form", "Zod", "Recharts", "Supabase", "PostgreSQL",
        "Row Level Security", "Edge Functions (Deno)", "Efí Pix API", "Brevo", "PostHog",
        "GitHub Actions", "Vitest"
      ],
      links: [
        { label: "Live site", url: "https://rifanopix.online" }
      ],
      images: [
        { src: "assets/projects/rifa-no-pix.jpg", alt: "Rifa no Pix home page showing a payment-confirmed ticket with lucky numbers" }
      ]
    },
    {
      category: "projects",
      title: "Little Man Computer Sim",
      tagline: "Simulator of an educational computer",
      meta: "University project · Pair",
      description: "Real-time simulator of the Little Man Computer, an educational model of a computer, with optional cache and pipelining so their effect on performance can be seen. Built with a classmate for a Performance in Cyber-Physical Systems course at PUCPR.",
      highlights: [
        "Instruction set with input/output, arithmetic, load/store and labels",
        "Three kinds of branches plus halt",
        "Optional cache and pipeline, to compare performance",
        "Interface in English and Portuguese"
      ],
      stack: ["JavaScript", "HTML", "CSS", "GitHub Pages"],
      links: [
        { label: "Live demo", url: "https://xarss.github.io/LMC/" },
        { label: "GitHub",    url: "https://github.com/xarss/LMC" }
      ],
      images: [
        { src: "assets/projects/lmc-simulator.png", alt: "Little Man Computer simulator with CPU registers, text editor, cache and RAM grid" }
      ]
    },

    // ----- VOLUNTEERING ------------------------------------------------------
    {
      category: "volunteering",
      title: "Fada Madrinha",
      tagline: "Sponsorship platform for NGO animals",
      meta: "Volunteer work · React · Supabase",
      description: "Platform connecting sponsors to animals from animal-rescue NGOs, with recurring sponsorship, adoption and neutering tracking, events and a newsletter.",
      highlights: [
        "Landing page, SEO and blog",
        "Separate dashboards for admins, NGOs and sponsors",
        "Recurring sponsorship by card or Pix",
        "Event tickets, vouchers and gift lists",
        "Bulk import of animals from spreadsheets",
        "Systems engineering: database, auth and payment webhooks"
      ],
      stack: [
        "React", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui", "React Router", "TanStack Query",
        "React Hook Form", "Zod", "Framer Motion", "Recharts", "React Helmet", "SheetJS",
        "Supabase", "PostgreSQL", "Edge Functions (Deno)", "Asaas", "PostHog", "Vitest"
      ],
      links: [
        { label: "Live site", url: "https://fadamadrinha.app.br/" }
      ],
      images: [
        { src: "assets/projects/fada-madrinha.jpg", alt: "Fada Madrinha home page with a rescued dog and a call to sponsor an animal" }
      ]
    },
    {
      category: "volunteering",
      title: "Instituto Fica Comigo",
      tagline: "Site and sponsorship platform for an animal-rescue NGO",
      meta: "Volunteer work · React · Supabase",
      description: "Institutional site for an NGO fighting animal abandonment, with volunteer signup, content management, an interactive bingo system and a gallery of animals up for adoption.",
      highlights: [
        "Institutional site and landing page",
        "Authentication with admin, NGO and sponsor roles",
        "Content management for animals, events and projects",
        "Interactive bingo system",
        "Sponsorship checkout, QR code per animal and bulk import from CSV files"
      ],
      stack: [
        "React", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui", "React Router", "TanStack Query",
        "React Hook Form", "Zod", "Framer Motion", "Recharts", "React Helmet", "PapaParse", "QR codes",
        "Supabase", "PostgreSQL", "Edge Functions (Deno)", "AbacatePay", "Vitest"
      ],
      links: [
        { label: "Live site", url: "https://institutoficacomigo.org.br/" }
      ],
      images: [
        { src: "assets/projects/instituto-fica-comigo.jpg", alt: "Instituto Fica Comigo home page with a carousel of rescued animals" }
      ]
    },

    // ----- GAMES -------------------------------------------------------------
    {
      category: "games",
      title: "Planet Researcher · Solo",
      tagline: "Open-world survival crafting on a procedural planet",
      meta: "Brackeys Game Jam 2026.1",
      description: "Exploration game with an infinite, procedurally generated world, built in ct.js (JavaScript). Open-world survival crafting on a procedural planet. Submitted to Brackeys Game Jam 2026.1; the jam version, Strange Caves, is playable on itch.io, with an infinite map of 9 biomes and 21 block types to explore by ship and on foot.",
      highlights: [
        "Procedural generation using several different techniques",
        "Auto-tiling and chunk-based rendering",
        "Infinite world streaming",
        "Inventory system",
        "Pixel art made in Pixsquare"
      ],
      stack: ["ct.js", "JavaScript", "Pixsquare", "itch.io"],
      links: [
        { label: "Jam version on itch.io", url: "https://xarss.itch.io/strange-caves" }
      ],
      images: [
        { src: "assets/projects/planet-researcher.jpg", alt: "Planet Researcher: a small astronaut standing on a grassy hill with bushes under a pale blue sky" }
      ]
    },
    {
      category: "games",
      title: "Biscu-lector",
      tagline: "Roguelike platformer in pixel art",
      meta: "Brackeys Game Jam 2025.2 · Solo",
      description: "2D pixel-art roguelike platformer built in Python/Pygame, solo in 7 days, with both the art and the code done by me. Submitted to Brackeys Game Jam 2025.2 and published on itch.io. You pick up to three powerful biscuits to help you find more biscuits.",
      highlights: [
        "Platformer movement and physics",
        "Roguelike power-up system",
        "Game UI and save/load states",
        "Custom level editor",
        "Pixel art and sprite animation made in Pixsquare"
      ],
      stack: ["Python", "Pygame", "Pixsquare", "itch.io"],
      links: [
        { label: "Play on itch.io", url: "https://xarss.itch.io/biscu-lector" }
      ],
      images: [
        { src: "assets/projects/biscu-lector.jpg", alt: "Biscu-lector level with a green blob, spikes and glass platforms on an orange and blue striped background, and a red biscuit at the end" }
      ]
    },
    {
      category: "games",
      title: "Goofy Glory",
      tagline: "2D arcade game made in 48 hours",
      meta: "Global Game Jam 2024 · Team",
      description: "2D arcade game built collaboratively in a multidisciplinary team in 48 hours at the Curitiba site of Global Game Jam 2024, on the theme \"Make me laugh\". Two court jesters fight with comical weapons to entertain the king.",
      highlights: [
        "Teamwork and task splitting under a tight deadline",
        "Core game design concepts",
        "Camera handling and visual effects",
        "GameMaker workflow and GML scripting"
      ],
      stack: ["GameMaker Studio 2", "GML"],
      links: [
        { label: "GitHub", url: "https://github.com/ViniTeider/Goofy-Glory" }
      ],
      images: [
        { src: "assets/projects/goofy-glory.jpg", alt: "Goofy Glory arena: a king on his throne watching an orange and a blue court jester about to fight" }
      ]
    }
  ],

  // ---------------------------------------------------------------------------
  // ABOUT
  // `color` on a fact gives its label a colored dot.
  // ---------------------------------------------------------------------------
  about: {
    text: "Computer Science graduate building {yellow:scalable applications}, {cyan:extracting insights from data} and {orange:automating IT processes}.",
    textMuted: "AI augmented and focused on shipping.",
    facts: [
      { label: "education",   color: "yellow", value: "B.S. in Computer Science, Pontifical Catholic University of Paraná (PUCPR), 2025" },
      { label: "speaks",      color: "orange", value: "Portuguese (native), English (fluent), Spanish (basic)" },
      { label: "languages",   color: "blue",   value: "Python, JavaScript, TypeScript, SQL, PowerShell, C#" },
      { label: "frameworks",  color: "purple", value: "Angular, Shadcn, Next.js, Vue.js, Node.js, FastAPI, .NET, Entity Framework" },
      { label: "data",        color: "green",  value: "Pandas, NumPy, OpenCV, Snowpark, SQLAlchemy, Power BI" },
      { label: "automation",  color: "red",    value: "Git / GitHub, CI/CD, Docker, PowerShell, Agile / Scrum" },
      { label: "databases",   color: "cyan",   value: "SQL Server, MySQL, MongoDB" },
      { label: "other",       color: "pink",   value: "REST APIs, Prompt Engineering, AI Integration, Game Dev (Pygame, Godot, Unity), Pixel Art" }
    ]
  }
};
