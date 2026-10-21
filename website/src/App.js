import { useState, useEffect, useRef } from 'react';
import Terminal from './Terminal';
import './index.css';

// ---- Content ----
const profile = {
  name: 'Akash Maiti',
  handle: 'akash-maiti',
  role: 'ECE @ UT Austin',
  bio: '',
  email: 'akash.maiti@utexas.edu',
  github: 'https://github.com/akash-maiti-a',
  linkedin: 'https://linkedin.com/in/akash--maiti',
  resume: '#', // TODO: link to resume PDF
};

// From the resume; newest first. end: 'Present' marks a current role.
const experience = [
  {
    company: 'TraceLabs',
    role: 'CTF Challenges Creator',
    start: 'Sep 2026',
    end: 'Present',
    points: [],
  },
  {
    company: 'University of Texas at Austin',
    role: 'Regional SOC Analyst',
    start: 'Mar 2025',
    end: 'Present',
    points: [],
  },
  {
    company: 'DevRev',
    role: 'Security Engineering Intern',
    start: 'Jan 2026',
    end: 'Aug 2026',
    points: [],
  },
  {
    company: 'Strauss Center for International Security and Law',
    role: 'Consultant',
    start: 'Aug 2025',
    end: 'May 2026',
    points: [],
  },
  {
    company: 'Real Life Data',
    role: 'Software Intern',
    start: 'May 2023',
    end: 'Sep 2023',
    points: [],
  },
  {
    company: '5I Robotics',
    role: 'Chief Technical and Financial Officer',
    start: 'Dec 2022',
    end: 'Dec 2024',
    points: [],
  },
];

const leadership = [
  {
    company: 'Longhorn Developers',
    positions: [
      {
        role: 'Technical Lead',
        start: 'September 2025', 
        end: 'Present',
        points: [],
      },
      {
        role: 'Member',
        start: 'Jun 2025',
        end: 'September 2025', 
        points: [],
      },
    ],
  },
  {
    company: 'ISSS',
    role: 'Corporate Co-Director',
    start: 'Jan 2025',
    end: 'Present',
    points: [],
  },
  {
    company: 'HASH',
    role: 'CCDC Business/IR Lead',
    start: 'Jan 2025',
    end: 'Present',
    points: [],
  },
  {
    company: 'Navigo',
    role: 'Software Lead',
    start: 'Sep 2024',
    end: 'Present',
    points: [],
  },
];

const education = {
  school: 'The University of Texas at Austin',
  degree: 'B.S. Electrical and Computer Engineering Honors',
  location: 'Austin, TX',
  graduation: 'May 2028',
  honors: ['University Honors', 'T.W. Whaley Friends of Alec Endowed Scholarship ($36,000 total award value)'],
  coursework: ['Software Design', 'Algorithms', 'Data Structures', 'MIS', 'Security', 'Software Testing'],
};

const skills = [
  { group: 'Languages', items: ['Python', 'C/C++', 'Java', 'JavaScript', 'SQL (PostgreSQL)', 'NoSQL (Firebase, Redis)', 'Qiskit'] },
  { group: 'Frameworks', items: ['React Native', 'PyTorch', 'Cloudflare', 'Supabase', 'OpenCV', 'Pandas', 'React', 'Node.js', 'TensorFlow'] },
  { group: 'Specialized', items: ['Agentic Workflows', 'Reinforcement Learning', 'Containerized Sandboxing', 'Synthetic Data Pipelines'] },
];

// TODO: replace placeholders with real projects
const projects = Array.from({ length: 6 }).map((_, idx) => ({
  name: `project-${idx + 1}`,
  description: `Placeholder description for project ${idx + 1}. Summarize the problem, your approach, and the result in one or two sentences.`,
  tags: [['Python', 'Security'], ['TypeScript', 'React'], ['C', 'Linux'], ['Go', 'Networking'], ['Python', 'ML'], ['Bash', 'Docker']][idx],
  repo: profile.github,
  demo: null,
}));

const tagColors = {
  Python: '#3572A5',
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  React: '#61dafb',
  C: '#555555',
  Go: '#00ADD8',
  Bash: '#89e051',
  Linux: '#e6b422',
  Docker: '#2496ed',
};

function RepoIcon() {
  return (
    <svg className="repo-icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
      <path fill="currentColor" d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z" />
    </svg>
  );
}

function Points({ points }) {
  if (!points || !points.length) return null;
  return (
    <ul className="exp-points">
      {points.map(point => <li key={point}>{point}</li>)}
    </ul>
  );
}

// Entries with `positions` (newest first) show progression within one organization
function Timeline({ items }) {
  return (
    <div className="card">
      <ol className="timeline">
        {items.map(job => {
          // Single-role entries are treated as one position
          const positions = job.positions || [job];
          const latest = positions[0];
          const earliest = positions[positions.length - 1];
          const current = latest.end === 'Present';

          return (
            <li key={job.company} className={`timeline-item${current ? ' current' : ''}`}>
              {positions.length === 1 ? (
                <>
                  <div className="exp-header">
                    <h3 className="exp-role">
                      {latest.role} <span className="exp-company">@ {job.company}</span>
                    </h3>
                    <span className="exp-dates">{latest.start} – {latest.end}</span>
                  </div>
                  <Points points={latest.points} />
                </>
              ) : (
                <>
                  <div className="exp-header">
                    <h3 className="exp-role exp-company">{job.company}</h3>
                    <span className="exp-dates">{earliest.start} – {latest.end}</span>
                  </div>
                  <ol className="positions">
                    {positions.map(pos => (
                      <li key={pos.role} className="position">
                        <div className="exp-header">
                          <h4 className="position-role">{pos.role}</h4>
                          <span className="exp-dates">{pos.start} – {pos.end}</span>
                        </div>
                        <Points points={pos.points} />
                      </li>
                    ))}
                  </ol>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function App() {
  const [bgBlur, setBgBlur] = useState(false);
  const revealRefs = useRef([]);

  useEffect(() => {
    const onScroll = () => {
      setBgBlur(window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll);

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealRefs.current.forEach(ref => ref && observer.observe(ref));

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  const reveal = el => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  return (
    <>
      <section id="decoration" className={bgBlur ? 'blur' : ''}>
        {[...Array(8)].map((_, idx) => (
          <div key={idx} className="circle" style={{ '--i': idx + 1 }} />
        ))}
      </section>

      <header className="nav">
        <div className="container nav-inner">
          <a href="#about" className="brand">~/{profile.handle}</a>
          <nav className="nav-links" aria-label="Primary">
            <a href="#experience">Experience</a>
            <a href="#education">Education</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
            <a href={profile.github} className="btn btn-small" target="_blank" rel="noopener noreferrer">GitHub</a>
          </nav>
        </div>
      </header>

      <main className="container">
        <section id="about" className="hero">
          <Terminal profile={profile} />
        </section>

        <section id="experience" className="section reveal" ref={reveal}>
          <h2 className="section-title"><span className="hash">#</span> Experience</h2>
          <Timeline items={experience} />
        </section>

        <section id="leadership" className="section reveal" ref={reveal}>
          <h2 className="section-title"><span className="hash">#</span> Leadership</h2>
          <Timeline items={leadership} />
        </section>

        <section id="education" className="section reveal" ref={reveal}>
          <h2 className="section-title"><span className="hash">#</span> Education</h2>
          <div className="card education">
            <div className="exp-header">
              <h3 className="exp-role">{education.school}</h3>
              <span className="exp-dates">Expected {education.graduation}</span>
            </div>
            <p className="edu-degree">{education.degree} · {education.location}</p>
            <div className="skill-group">
              <h4>Honors</h4>
              <ul className="exp-points">
                {education.honors.map(honor => <li key={honor}>{honor}</li>)}
              </ul>
            </div>
            <div className="skill-group">
              <h4>Coursework</h4>
              <ul className="chips">
                {education.coursework.map(course => <li key={course} className="chip">{course}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <section id="skills" className="section reveal" ref={reveal}>
          <h2 className="section-title"><span className="hash">#</span> Skills</h2>
          <div className="card skills">
            {skills.map(({ group, items }) => (
              <div key={group} className="skill-group">
                <h3>{group}</h3>
                <ul className="chips">
                  {items.map(item => <li key={item} className="chip">{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="section">
          <h2 className="section-title"><span className="hash">#</span> Projects</h2>
          <div className="project-grid">
            {projects.map(project => (
              <article key={project.name} className="card project-card reveal" ref={reveal}>
                <h3 className="project-name">
                  <RepoIcon />
                  <a href={project.repo} target="_blank" rel="noopener noreferrer">{project.name}</a>
                </h3>
                <p className="project-desc">{project.description}</p>
                <div className="project-footer">
                  <ul className="tags">
                    {project.tags.map(tag => (
                      <li key={tag}>
                        <span className="tag-dot" style={{ background: tagColors[tag] || '#8b949e' }} />
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <div className="project-links">
                    <a href={project.repo} target="_blank" rel="noopener noreferrer">Code ↗</a>
                    {project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer">Demo ↗</a>}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="section reveal" ref={reveal}>
          <h2 className="section-title"><span className="hash">#</span> Contact</h2>
          <div className="card contact">
            <p>Open to software engineering and cybersecurity roles. The fastest way to reach me is email.</p>
            <div className="actions">
              <a className="btn btn-primary" href={`mailto:${profile.email}`}>{profile.email}</a>
              <a className="btn" href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a className="btn" href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">© {new Date().getFullYear()} {profile.name}</div>
      </footer>
    </>
  );
}

export default App;
