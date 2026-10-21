import React, { useState, useEffect, useRef } from 'react';
import './index.css';

// ---- Content ----
const profile = {
  name: 'Akash Maiti',
  handle: 'akash-maiti',
  role: 'Software & Cybersecurity Engineer',
  bio: 'I build reliable software and break it on purpose. Focused on secure systems, application security, and tooling that makes defenders faster.',
  email: 'akash.maiti@utexas.edu',
  github: 'https://github.com/akash-maiti-a',
  linkedin: 'https://linkedin.com/in/akash--maiti',
  resume: '#', // TODO: link to resume PDF
};

const skills = [
  { group: 'Languages', items: ['Python', 'JavaScript', 'TypeScript', 'C', 'C++', 'Java', 'SQL', 'Bash'] },
  { group: 'Security', items: ['Penetration Testing', 'Threat Modeling', 'Web App Security', 'Network Analysis', 'Reverse Engineering', 'OWASP Top 10'] },
  { group: 'Tooling & Infra', items: ['Linux', 'Git', 'Docker', 'AWS', 'Burp Suite', 'Wireshark', 'Nmap', 'React'] },
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
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
            <a href={profile.github} className="btn btn-small" target="_blank" rel="noopener noreferrer">GitHub</a>
          </nav>
        </div>
      </header>

      <main className="container">
        <section id="about" className="hero">
          <div className="terminal visible">
            <div className="terminal-bar">
              <span className="dot red" /><span className="dot yellow" /><span className="dot green" />
              <span className="terminal-title">akash@portfolio: ~</span>
            </div>
            <div className="terminal-body">
              <p className="prompt"><span className="ps1">$</span> whoami</p>
              <div className="hero-main">
                <div className="monogram" aria-hidden="true">AM</div>
                <div>
                  <h1>{profile.name}</h1>
                  <p className="role">{profile.role}</p>
                </div>
              </div>
              <p className="prompt"><span className="ps1">$</span> cat about.txt</p>
              <p className="bio">{profile.bio}</p>
              <div className="actions">
                <a className="btn btn-primary" href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                <a className="btn" href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a className="btn" href={`mailto:${profile.email}`}>Email</a>
                <a className="btn" href={profile.resume}>Resume</a>
              </div>
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
            <p>Open to software engineering and security roles. The fastest way to reach me is email.</p>
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
