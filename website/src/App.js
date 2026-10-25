import { useState, useEffect, useRef } from 'react';
import Factory, { useBackgroundMotion } from './Factory';
import Terminal from './Terminal';
import './index.css';

// ---- Content ----
const profile = {
  name: 'Akash Maiti',
  handle: 'akash-maiti',
  role: 'ECE @ UT Austin',
  bio: '',
  status: 'Open to software engineering & cybersecurity roles',
  email: 'akash.maiti@utexas.edu',
  github: 'https://github.com/akash-maiti-a',
  linkedin: 'https://linkedin.com/in/akash--maiti',
  resume: '#',
};

// ---- Experience ----
const experience = [
  {
    company: 'TraceLabs',
    role: 'CTF Challenges Creator',
    start: 'Sep 2026',
    end: 'Present',
    points: [],
    unlocks: ['CTF Design', 'Challenge Engineering'],
  },
  {
    company: 'University of Texas at Austin',
    role: 'Regional SOC Analyst',
    start: 'Mar 2025',
    end: 'Present',
    points: [],
    unlocks: ['Threat Detection', 'Incident Forensics', 'CDSA', 'Powershell', 'Splunk', 'Bash'],
  },
  {
    company: 'DevRev',
    role: 'Security Engineering Intern',
    start: 'Jan 2026',
    end: 'Aug 2026',
    points: [],
    unlocks: ['AWS Lambda', 'Sandboxing', 'Agentic Workflows', 'Synthetic Data'],
  },
  {
    company: 'Strauss Center for International Security and Law',
    role: 'Consultant',
    start: 'Aug 2025',
    end: 'May 2026',
    points: [],
    unlocks: ['Vulnerability Assessment', 'HIPAA', 'Remediation'],
  },
  {
    company: 'Real Life Data',
    role: 'Software Intern',
    start: 'May 2023',
    end: 'Sep 2023',
    points: [],
    unlocks: ['Python', 'Data Pipelines'],
  },
];

// ---- Organizations ----
const organizations = [
  {
    company: 'Longhorn Developers',
    positions: [
      {
        role: 'Technical Lead, Mobilize UT',
        start: 'Sep 2025',
        end: 'Present',
        points: [],
      },
      {
        role: 'Developer',
        start: 'Jun 2025',
        end: 'Sep 2025',
        points: [],
      },
    ],
    unlocks: ['App Development', 'Accessibility'],
  },
  {
    company: 'ISSS',
    positions: [
      {
        role: 'Corporate Lead',
        start: 'Sep 2025',
        end: 'Present',
        points: [],
      },
      {
        role: 'Member',
        start: 'Aug 2024',
        end: 'Sep 2025',
        points: [],
      },
    ],
    unlocks: ['Sponsorships', 'Outreach'],
  },
  {
    company: 'HASH',
    positions: [
      {
        role: 'CCDC & CPTC Team Member',
        start: 'Mar 2025',
        end: 'Present',
        points: [],
      },
      {
        role: 'Member',
        start: 'Jan 2025',
        end: 'Mar 2025',
        points: [],
      },
    ],
    unlocks: ['CCDC', 'System Hardening', 'Incident Response'],
  },
  {
    company: 'Navigo',
    role: 'Software Lead',
    start: 'Sep 2024',
    end: 'August 2026',
    points: [],
    unlocks: ['LLM Summarization', 'Agentic Coding'],
  },
];


const projects = [
  {
    name: 'LQC Qubit Collaboratory',
    building: '',
    start: 'Jul 2025',
    end: 'Aug 2025',
    inputs: ['Qiskit', 'Python'],
    points: [],
    output: 'Code deployed on real Quantum Computer',
    link: null,
  },
  {
    name: 'ClimbAI',
    building: '',
    start: 'Jan 2025',
    end: 'Jan 2025',
    inputs: ['OpenPose', 'React', 'Python', 'Node.js'],
    points: [],
    output: 'Climbing Form Analysis & Feedback',
    link: null,
  },
  {
    name: 'LLMVulnTesting',
    building: '',
    start: 'Oct 2026',
    end: 'Present',
    inputs: ['LLM', 'Python', 'Docker'],
    points: [],
    output: 'RL-based Local Vulnerability Testing Framework',
    link: null,
  }
];

const education = {
  school: 'The University of Texas at Austin',
  degree: 'B.S. Electrical and Computer Engineering Honors',
  location: 'Austin, TX',
  graduation: 'May 2028',
  honors: ['University Honors', 'T.W. Whaley Friends of Alec Endowed Scholarship ($36,000 total award value)'],
  coursework: ['Software Design', 'Algorithms', 'Data Structures', 'MIS', 'Security', 'Software Testing'],
};

// `resource` picks the inventory icon; `purity` mimics resource-node purity
const skills = [
  { group: 'Languages', resource: 'ingot', purity: '', items: ['Python', 'C/C++', 'Java', 'JavaScript', 'SQL (PostgreSQL)', 'NoSQL (Firebase, Redis)', 'Qiskit'] },
  { group: 'Frameworks', resource: 'plate', purity: '', items: ['React Native', 'PyTorch', 'Cloudflare', 'Supabase', 'OpenCV', 'Pandas', 'React', 'Node.js', 'TensorFlow'] },
  { group: 'Specialized', resource: 'circuit', purity: '', items: ['Agentic Workflows', 'Reinforcement Learning', 'Containerized Sandboxing', 'Synthetic Data Pipelines'] },
];

const navLinks = [
  ['#experience', 'Experience'],
  ['#organizations', 'Organizations'],
  ['#projects', 'Projects'],
  ['#skills', 'Skills'],
  ['#education', 'Education'],
  ['#contact', 'Contact'],
];

// ---- Components ----
function ResourceIcon({ type }) {
  const shapes = {
    ingot: <path d="M6 22 L10 10 H30 L34 22 Z M10 10 L14 6 H26 L30 10" />,
    plate: <path d="M6 8 H34 V32 H6 Z M10 12 H30 M10 28 H30" />,
    circuit: <path d="M8 8 H32 V32 H8 Z M14 14 H26 V26 H14 Z M20 4 V8 M20 32 V36 M4 20 H8 M32 20 H36" />,
  };
  return (
    <svg className={`resource-icon ${type}`} viewBox="0 0 40 40" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round">{shapes[type]}</g>
    </svg>
  );
}

function SectionHead({ kicker, title, children }) {
  return (
    <header className="section-head">
      <p className="kicker"><span className="hazard" />{kicker}</p>
      <h2>{title}</h2>
      {children && <p className="section-sub">{children}</p>}
    </header>
  );
}

function Points({ points }) {
  if (!points || !points.length) return null;
  return (
    <ul className="points">
      {points.map(point => <li key={point}>{point}</li>)}
    </ul>
  );
}

function Unlocks({ items }) {
  if (!items || !items.length) return null;
  return (
    <div className="unlocks">
      <span className="unlocks-label">Unlocks</span>
      <ul className="chips">
        {items.map(item => <li key={item} className="chip">{item}</li>)}
      </ul>
    </div>
  );
}

// Milestone cards
function Milestones({ items, label, reveal }) {
  return (
    <ol className="milestones">
      {items.map((job, idx) => {
        // Single-role entries are one position
        const positions = job.positions || [job];
        const latest = positions[0];
        const earliest = positions[positions.length - 1];
        const current = latest.end === 'Present';
        const tier = items.length - idx;

        return (
          <li key={job.company} className={`panel milestone reveal${current ? ' current' : ''}`} ref={reveal}>
            <div className="milestone-tier">
              <span className="tier-label"></span>
              <span className="tier-num">{String(tier).padStart(2, '0')}</span>
            </div>
            <div className="milestone-body">
              <div className="milestone-head">
                <div>
                  <h3 className="milestone-role">{positions.length === 1 ? latest.role : job.company}</h3>
                  {positions.length === 1 && <p className="milestone-org">{job.company}</p>}
                </div>
                <div className="milestone-meta">
                  <span className={`status ${current ? 'status-active' : 'status-done'}`}>{current ? 'In progress' : 'Complete'}</span>
                  <span className="dates">{earliest.start} – {latest.end}</span>
                </div>
              </div>

              {positions.length === 1 ? (
                <Points points={latest.points} />
              ) : (
                <ol className="phases">
                  {positions.map((pos, i) => (
                    <li key={pos.role} className={`phase${i === 0 ? ' phase-latest' : ''}`}>
                      <div className="phase-head">
                        <span className="phase-num">Phase {positions.length - i}</span>
                        <h4 className="phase-role">{pos.role}</h4>
                        <span className="dates">{pos.start} – {pos.end}</span>
                      </div>
                      <Points points={pos.points} />
                    </li>
                  ))}
                </ol>
              )}

              <Unlocks items={job.unlocks} />
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function Belt() {
  return (
    <div className="belt-link" aria-hidden="true">
      <span className="belt-track" />
    </div>
  );
}

function ProductionChain({ project, reveal }) {
  return (
    <article className="chain reveal" ref={reveal}>
      <div className="chain-inputs">
        <p className="chain-label">Inputs</p>
        <ul>
          {project.inputs.map(input => (
            <li key={input} className="item-slot">{input}</li>
          ))}
        </ul>
      </div>
      <Belt />
      <div className="panel chain-building">
        <div className="building-head">
          <span className="building-type">{project.building}</span>
          <span className="dates">{project.start === project.end ? project.start : `${project.start} – ${project.end}`}</span>
        </div>
        <h3 className="building-name">
          {project.link ? <a href={project.link} target="_blank" rel="noopener noreferrer">{project.name}</a> : project.name}
        </h3>
        <Points points={project.points} />
      </div>
      <Belt />
      <div className="chain-output">
        <p className="chain-label">Output</p>
        <p className="output-item">{project.output}</p>
      </div>
    </article>
  );
}

function App() {
  const [bgBlur, setBgBlur] = useState(false);
  const [bgAnimated, toggleBg] = useBackgroundMotion();
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
      <Factory dimmed={bgBlur} animated={bgAnimated} />

      <header className="nav">
        <div className="container nav-inner">
          <a href="#" className="brand">
            <span className="brand-mark" aria-hidden="true" />
            <span><span className="brand-sep">{'//'}</span> Akash M.</span>
          </a>
          <nav className="nav-links" aria-label="Primary">
            {navLinks.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
          </nav>
          <div className="nav-tools">
            <div className="power" title="Power grid status">
              <span className="power-label">Power</span>
              <span className="power-bar"><span /></span>
            </div>
            <button
              type="button"
              className="bg-toggle"
              onClick={toggleBg}
              aria-pressed={bgAnimated}
              title={bgAnimated ? 'Pause background (low graphics)' : 'Play animated background'}
            >
              {bgAnimated ? '❚❚ Still' : '▶ Animate'}
            </button>
          </div>
        </div>
      </header>

      <main className="container">
        <section id="about" className="hero">
          <Terminal profile={profile} education={education} />
        </section>

        <section id="experience" className="section">
          <SectionHead kicker="" title="Experience">
          </SectionHead>
          <Milestones items={experience} label="Tier" reveal={reveal} />
        </section>

        <section id="organizations" className="section">
          <SectionHead kicker="" title="Organizations">
          </SectionHead>
          <Milestones items={organizations} label="Part" reveal={reveal} />
        </section>

        <section id="projects" className="section">
          <SectionHead kicker="" title="Projects">
          </SectionHead>
          <div className="chains">
            {projects.map(project => <ProductionChain key={project.name} project={project} reveal={reveal} />)}
          </div>
        </section>

        <section id="skills" className="section reveal" ref={reveal}>
          <SectionHead kicker="" title="Skills" />
          <div className="panel inventory">
            {skills.map(({ group, resource, purity, items }) => (
              <div key={group} className="inventory-group">
                <div className="inventory-head">
                  <h3>{group}</h3>
                  <span className={`purity purity-${purity.toLowerCase()}`}>{purity} node</span>
                </div>
                <ul className="slots">
                  {items.map(item => (
                    <li key={item} className="slot" data-tip={`${group} · ${purity}`}>
                      <ResourceIcon type={resource} />
                      <span className="slot-name">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="education" className="section reveal" ref={reveal}>
          <SectionHead kicker="" title="Education" />
          <div className="panel research">
            <div className="research-root">
              <span className="node-status">Researching · {education.graduation}</span>
              <h3>{education.school}</h3>
              <p className="research-degree">{education.degree}</p>
              <p className="research-loc">{education.location}</p>
            </div>
            <div className="research-branches">
              <div className="branch">
                <p className="branch-label">Honors</p>
                <ul className="nodes">
                  {education.honors.map(honor => (
                    <li key={honor} className="node node-gold"><span className="node-check" aria-hidden="true">★</span>{honor}</li>
                  ))}
                </ul>
              </div>
              <div className="branch">
                <p className="branch-label">Coursework</p>
                <ul className="nodes nodes-grid">
                  {education.coursework.map(course => (
                    <li key={course} className="node"><span className="node-check" aria-hidden="true">✓</span>{course}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section reveal" ref={reveal}>
          <SectionHead kicker="" title="Contact" />
          <div className="panel sink">
            <div className="sink-copy">
              <p>{profile.status}. Drop an inquiry in the sink and a coupon comes straight to my inbox.</p>
              <div className="actions">
                <a className="btn btn-primary" href={`mailto:${profile.email}`}>{profile.email}</a>
                <a className="btn" href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a className="btn" href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <span><span className="status-light" /> Grid stable · © {new Date().getFullYear()} {profile.name}</span>
        </div>
      </footer>
    </>
  );
}

export default App;
