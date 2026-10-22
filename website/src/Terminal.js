import { Fragment, useEffect, useState } from 'react';

const commands = ['boot --hub', 'whoami', 'cat contract.txt', 'ls equipment/'];

const bootLog = [
  'Power grid ............ ONLINE  (87.4 / 100 MW)',
  'Biometric scan ........ IDENTIFIED',
];

// Only animate on the first visit to the home page per page load
let hasPlayed = false;

function Prompt({ children }) {
  return (
    <p className="prompt">
      <span className="ps1"><span className="ps1-user">AKASH</span>@<span className="ps1-path">PORTFOLIO</span>&gt;</span>{' '}
      {children}
    </p>
  );
}

function Terminal({ profile, education }) {
  const [step, setStep] = useState(hasPlayed ? commands.length : 0);
  const [chars, setChars] = useState(0);
  const done = step >= commands.length;

  useEffect(() => {
    if (done) {
      hasPlayed = true;
      return;
    }
    const cmd = commands[step];
    // Pause before each command, type with a little jitter, then pause before new line
    const delay = chars === 0 ? 650 : chars < cmd.length ? 45 + Math.random() * 75 : 350;
    const timer = setTimeout(() => {
      if (chars < cmd.length) {
        setChars(chars + 1);
      } else {
        setStep(step + 1);
        setChars(0);
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [step, chars, done]);

  const contract = [
    ['Employee', profile.name],
    ['Assignment', profile.role],
    ['Division', 'Software & Cybersecurity'],
    ['Training', `${education.degree}, ${education.school}`],
    ['Deployment', education.location],
    ['Status', profile.status],
  ];

  const outputs = [
    <ul className="boot-log">
      {bootLog.map(line => <li key={line}><span className="ok">[ OK ]</span> {line}</li>)}
    </ul>,
    <div className="pioneer">
      <p className="pioneer-kicker"></p>
      <h1>{profile.name}</h1>
      <p className="role">{profile.role}</p>
    </div>,
    <div>
      <dl className="contract">
        {contract.map(([label, value]) => (
          <Fragment key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </Fragment>
        ))}
      </dl>
      {profile.bio && <p className="bio">{profile.bio}</p>}
    </div>,
    <ul className="ls">
      <li><a className="ls-dir" href={profile.github} target="_blank" rel="noopener noreferrer">github/</a></li>
      <li><a className="ls-dir" href={profile.linkedin} target="_blank" rel="noopener noreferrer">linkedin/</a></li>
      <li><a className="ls-file" href={`mailto:${profile.email}`}>email.txt</a></li>
    </ul>,
  ];

  return (
    <div className="terminal">
      <div className="terminal-bar">
        <span className="status-light" />
        <span className="terminal-title">Terminal</span>
        <span className="terminal-meta"></span>
      </div>
      <div className="terminal-body">
        {commands.map((cmd, i) => (
          <Fragment key={cmd}>
            {i <= step && (
              <Prompt>
                <span className="cmd">{i < step ? cmd : cmd.slice(0, chars)}</span>
                {i === step && <span className="cursor" aria-hidden="true" />}
              </Prompt>
            )}
            <div className="output" hidden={i >= step}>{outputs[i]}</div>
          </Fragment>
        ))}
        {done && <Prompt><span className="cursor" aria-hidden="true" /></Prompt>}
      </div>
      {!done && (
        <button type="button" className="skip" onClick={() => setStep(commands.length)}>
          skip ⏎
        </button>
      )}
    </div>
  );
}

export default Terminal;
