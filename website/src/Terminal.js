import { Fragment, useEffect, useState } from 'react';

const commands = ['whoami', 'cat about.txt', 'ls links/'];

// Only animate on the first visit to the home page per page load
let hasPlayed = false;

function Prompt({ children }) {
  return (
    <p className="prompt">
      <span className="ps1"><span className="ps1-user">akash@portfolio</span>:<span className="ps1-path">~</span>$</span>{' '}
      {children}
    </p>
  );
}

function Terminal({ profile }) {
  const [step, setStep] = useState(hasPlayed ? commands.length : 0);
  const [chars, setChars] = useState(0);
  const done = step >= commands.length;

  useEffect(() => {
    if (done) {
      hasPlayed = true;
      return;
    }
    const cmd = commands[step];
    // Pause before each command, type with a little jitter, then pause before "pressing enter"
    const delay = chars === 0 ? 700 : chars < cmd.length ? 50 + Math.random() * 80 : 350;
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

  const outputs = [
    <div>
      <h1>{profile.name}</h1>
      <p className="role">{profile.role}</p>
    </div>,
    <p className="bio">{profile.bio}</p>,
    <ul className="ls">
      <li><a className="ls-dir" href={profile.github} target="_blank" rel="noopener noreferrer">github/</a></li>
      <li><a className="ls-dir" href={profile.linkedin} target="_blank" rel="noopener noreferrer">linkedin/</a></li>
      <li><a className="ls-file" href={`mailto:${profile.email}`}>email.txt</a></li>
      <li><a className="ls-exec" href={profile.resume}>resume.pdf</a></li>
    </ul>,
  ];

  return (
    <div className="terminal">
      <div className="terminal-bar">
        <span className="dot red" /><span className="dot yellow" /><span className="dot green" />
        <span className="terminal-title">akash@portfolio: ~ — zsh</span>
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
