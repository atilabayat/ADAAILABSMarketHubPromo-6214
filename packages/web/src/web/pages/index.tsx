import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  Play,
  X,
  Menu,
  Plus,
  Minus,
  Layers,
  ChartNoAxesCombined,
  ScanLine,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { MarketPreview } from "../components/market-preview";
const HUB = "https://claude.ai/artifact/DD9NKTN3KTcksj4wuS9RRC";
function Brand({ dark = false }: { dark?: boolean }) {
  return (
    <a href="#top" className={`brand ${dark ? "brand-dark" : ""}`} aria-label="ADA AI Labs home">
      <span className="brand-symbol">
        <i />
        <i />
        <i />
        <i />
      </span>
      <span>
        ADA <b>AI LABS</b>
        <small>ALPHA DATA ARCHITECTS</small>
      </span>
    </a>
  );
}
const faqs = [
  [
    "What is the Markets HUB?",
    "Markets HUB brings 21 specialist research terminals into one workspace, covering volatility, gamma exposure, market breadth, sector rotation, and options flow.",
  ],
  [
    "Is the data on this page live?",
    "No. The interactive preview uses illustrative data. The linked Markets HUB contains timestamped research snapshots; review each terminal’s timestamp and source before using it.",
  ],
  [
    "What does the free-trial button do?",
    "This landing page demonstrates the signup experience only. It does not create an account, charge a card, or save your information. You can open the existing Markets HUB directly to explore the published research.",
  ],
  [
    "Is this investment advice?",
    "No. ADA Markets HUB is a research workspace. All material is for informational purposes, not investment advice or a recommendation to trade.",
  ],
];
export default function LandingPage() {
  const [trial, setTrial] = useState(false);
  const [done, setDone] = useState(false);
  const [menu, setMenu] = useState(false);
  const [faq, setFaq] = useState<number | null>(null);
  const [tour, setTour] = useState("Volatility");
  const emailRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  function openTrial() {
    triggerRef.current = document.activeElement as HTMLElement;
    setDone(false);
    setTrial(true);
  }
  function closeTrial() {
    setTrial(false);
    triggerRef.current?.focus();
  }
  useEffect(() => {
    if (!trial) return;
    document.body.style.overflow = "hidden";
    emailRef.current?.focus();
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeTrial();
      if (e.key === "Tab") {
        const els = Array.from(
          document.querySelectorAll<HTMLElement>(
            ".trial-dialog button,.trial-dialog input,.trial-dialog a",
          ),
        );
        const first = els[0],
          last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handler);
    };
  }, [trial]);
  return (
    <>
      <div className="dark-top" id="top">
        <header className="site-header">
          <Brand />
          <nav className={menu ? "nav-open" : ""}>
            <a href="#platform" onClick={() => setMenu(false)}>
              Platform
            </a>
            <a href="#terminals" onClick={() => setMenu(false)}>
              Terminals
            </a>
            <a href="#workflow" onClick={() => setMenu(false)}>
              How it works
            </a>
            <a href="#questions" onClick={() => setMenu(false)}>
              Resources
            </a>
          </nav>
          <div className="header-actions">
            <a className="hub-link" href={HUB} target="_blank" rel="noreferrer">
              Open Markets HUB <ArrowUpRight size={15} />
            </a>
            <button className="btn btn-small" onClick={openTrial}>
              Start free trial <ArrowUpRight size={15} />
            </button>
            <button
              className="menu-button"
              aria-label="Toggle navigation"
              aria-expanded={menu}
              onClick={() => setMenu(!menu)}
            >
              {menu ? <X /> : <Menu />}
            </button>
          </div>
        </header>
        <main>
          <section className="hero">
            <div className="hero-grid-background" />
            <div className="hero-content">
              <div className="eyebrow">
                <span className="status-dot" /> INTELLIGENCE, WITHOUT THE NOISE
              </div>
              <h1>
                See the market.
                <br />
                Find your <em>edge.</em>
              </h1>
              <p>
                From volatility to market vision, turn complex data into a clearer perspective. Your
                entire research workflow. One intelligent hub.
              </p>
              <div className="hero-buttons">
                <button className="btn" onClick={openTrial}>
                  Start free trial <ArrowUpRight size={18} />
                </button>
                <a className="text-button" href="#platform">
                  <span className="play-circle">
                    <Play size={12} fill="currentColor" />
                  </span>
                  Explore the platform
                </a>
              </div>
              <div className="hero-checks">
                <span>
                  <Check size={13} /> No credit card required
                </span>
                <span>
                  <Check size={13} /> Built for your research
                </span>
              </div>
              <div className="hero-signoff">
                <div className="signoff-line" />
                <span>LESS GUESSWORK. MORE PERSPECTIVE.</span>
              </div>
            </div>
            <div className="hero-product">
              <div className="product-orbit orbit-one" />
              <div className="product-orbit orbit-two" />
              <div className="floating-insight">
                <span className="insight-icon">
                  <Sparkles size={17} />
                </span>
                <div>
                  <small>THE BIGGER PICTURE</small>
                  <strong>Clarity across every market.</strong>
                </div>
                <ArrowUpRight size={16} />
              </div>
              <MarketPreview />
              <div className="floating-signal">
                <span className="signal-label">
                  <span className="status-dot" /> GAMMA INTELLIGENCE
                </span>
                <div>
                  <strong>
                    Understand the structure.
                    <br />
                    <em>Not just the price.</em>
                  </strong>
                  <div className="signal-chart">
                    {[22, 36, 49, 65, 85, 72, 54, 35, 20].map((n, i) => (
                      <i key={i} style={{ height: n + "%" }} />
                    ))}
                  </div>
                </div>
                <span className="signal-bottom">
                  Dealer positioning, decoded <ArrowUpRight size={13} />
                </span>
              </div>
            </div>
          </section>
          <div className="asset-strip">
            <span>
              A BROADER VIEW
              <br />
              <b>OF YOUR MARKETS</b>
            </span>
            <div>S&P 500</div>
            <div>NASDAQ</div>
            <div>U.S. EQUITIES</div>
            <div>OPTIONS</div>
            <div>MACRO & FX</div>
            <div>CRYPTO</div>
          </div>
          <section className="intro-stats" id="platform">
            <div>
              <span className="eyebrow">YOUR RESEARCH. CONNECTED.</span>
              <h2>
                A world of data.
                <br />
                <em>One point of clarity.</em>
              </h2>
            </div>
            <div className="stat">
              <strong>
                21<span>↗</span>
              </strong>
              <span>Specialist terminals</span>
            </div>
            <div className="stat">
              <strong>3</strong>
              <span>Research ecosystems</span>
            </div>
            <div className="stat">
              <strong>1</strong>
              <span>Unified Markets HUB</span>
            </div>
          </section>
        </main>
      </div>
      <section className="ecosystem light-section" id="terminals">
        <div className="section-heading">
          <div>
            <span className="eyebrow">BUILT TO SEE MORE</span>
            <h2>
              Go deeper.
              <br />
              <em>Stay one step ahead.</em>
            </h2>
          </div>
          <p>
            The tools you need to connect the dots —<br className="desktop-break" /> from the macro
            picture to the next market move.
          </p>
        </div>
        <div className="ecosystem-grid">
          <a
            className="ecosystem-card volatility-card"
            href="#product-tour"
            onClick={() => setTour("Volatility")}
          >
            <div className="card-top">
              <ChartNoAxesCombined size={23} />
              <span>01 / ADA AI LABS</span>
              <ArrowUpRight size={19} />
            </div>
            <div className="vol-illustration">
              <span>IMPLIED VOLATILITY SURFACE</span>
              <svg viewBox="0 0 300 135" aria-hidden="true">
                {Array.from({ length: 9 }, (_, i) => (
                  <path
                    key={i}
                    d={`M20 ${115 - i * 7} Q 90 ${-15 + i * 5} 145 ${70 - i * 5} T 285 ${40 + i * 6}`}
                    fill="none"
                    stroke={i === 4 ? "#3f582c" : "#8a9b68"}
                    strokeWidth={i === 4 ? 2.5 : 1}
                  />
                ))}
                <path d="M20 115L20 40M285 105L285 25" stroke="#a9b28c" strokeDasharray="2 4" />
              </svg>
              <div>
                <span>DELTA</span>
                <span>EXPIRY</span>
              </div>
            </div>
            <h3>
              Make complexity
              <br />
              <em>your advantage.</em>
            </h3>
            <p>Vol surfaces, macro signals, market breadth, and single-name intelligence.</p>
            <span className="card-link">
              7 research terminals <ArrowRight size={16} />
            </span>
          </a>
          <a
            className="ecosystem-card gamma-card"
            href="#product-tour"
            onClick={() => setTour("Gamma")}
          >
            <div className="card-top">
              <Layers size={23} />
              <span>02 / GAMMA & SESSION</span>
              <ArrowUpRight size={19} />
            </div>
            <div className="gamma-illustration">
              <div>
                <span>CALL WALL</span>
                <b>610.00</b>
              </div>
              {[78, 56, 90, 68, 42, 27, 52].map((n, i) => (
                <div className="gamma-bar-row" key={i}>
                  <small>{615 - i * 5}</small>
                  <i style={{ width: n + "%" }} />
                  <span>+{(n / 10).toFixed(1)}M</span>
                </div>
              ))}
              <div className="gamma-flip">
                GAMMA FLIP <b>598.50</b>
              </div>
            </div>
            <h3>
              Read the positioning.
              <br />
              <em>See the possibilities.</em>
            </h3>
            <p>Gamma walls, exposure maps, VWAP sessions, and intraday structure.</p>
            <span className="card-link">
              9 specialist dashboards <ArrowRight size={16} />
            </span>
          </a>
          <a
            className="ecosystem-card vision-card"
            href="#product-tour"
            onClick={() => setTour("Market vision")}
          >
            <div className="card-top">
              <ScanLine size={23} />
              <span>03 / QHD HEATMAPS</span>
              <ArrowUpRight size={19} />
            </div>
            <div className="vision-illustration">
              <div className="vision-cell cell-large">
                TECHNOLOGY<b>+1.42%</b>
              </div>
              <div className="vision-cell">
                FINANCIALS<b>+0.86%</b>
              </div>
              <div className="vision-cell">
                HEALTHCARE<b>+0.64%</b>
              </div>
              <div className="vision-cell negative">
                ENERGY<b>−0.38%</b>
              </div>
              <div className="vision-cell">
                INDUSTRIALS<b>+0.51%</b>
              </div>
            </div>
            <h3>
              The whole market.
              <br />
              <em>At a glance.</em>
            </h3>
            <p>Sector rotation, options flow, market quality, and equity movers.</p>
            <span className="card-link">
              5 visual research tools <ArrowRight size={16} />
            </span>
          </a>
        </div>
      </section>
      <section className="product-tour" id="product-tour">
        <div className="section-heading">
          <div>
            <span className="eyebrow">THE WORKSPACE BEHIND THE INSIGHT</span>
            <h2>
              More than a dashboard.
              <br />
              <em>Your research command center.</em>
            </h2>
          </div>
          <a className="text-button" href={HUB} target="_blank" rel="noreferrer">
            Explore Markets HUB <ArrowUpRight size={17} />
          </a>
        </div>
        <div className="tour-layout">
          <div className="tour-copy">
            <div className="tour-tabs" role="tablist" aria-label="Research categories">
              {["Volatility", "Gamma", "Market vision"].map((t) => (
                <button
                  role="tab"
                  aria-selected={tour === t}
                  onClick={() => setTour(t)}
                  className={tour === t ? "active" : ""}
                  key={t}
                >
                  {t}
                </button>
              ))}
            </div>
            <h3>
              {tour === "Volatility"
                ? "Go beyond the price."
                : tour === "Gamma"
                  ? "Map the market structure."
                  : "Put the market in context."}
            </h3>
            <p>
              {tour === "Volatility"
                ? "Understand what the options market is pricing in. Explore term structure, IV surfaces, skew, and implied versus realized volatility."
                : tour === "Gamma"
                  ? "Locate call and put walls, track net exposure, and explore how dealer positioning shapes the trading session."
                  : "Follow sector rotation, scan unusual options activity, and connect market breadth with cross-asset signals."}
            </p>
            <ul>
              {(tour === "Volatility"
                ? [
                    "VIX term structure and IV surfaces",
                    "Delta, skew, and volatility rank",
                    "Cross-asset context in one place",
                  ]
                : tour === "Gamma"
                  ? [
                      "Call walls, put support, and gamma flips",
                      "Net GEX by strike and expiry",
                      "Anchored VWAP and session dashboards",
                    ]
                  : [
                      "Sector momentum and market breadth",
                      "Options flow and equity movers",
                      "TradFi and crypto market overview",
                    ]
              ).map((x) => (
                <li key={x}>
                  <Check size={15} />
                  {x}
                </li>
              ))}
            </ul>
            <a className="btn btn-outline" href={HUB} target="_blank" rel="noreferrer">
              Open the workspace <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="real-screenshot">
            <div className="screenshot-title">
              <span className="window-dots">
                <i />
                <i />
                <i />
              </span>
              <span>ADA Markets HUB · Published workspace</span>
              <ArrowUpRight size={13} />
            </div>
            <img
              src="/images/markets-hub.png"
              alt="Actual ADA Markets HUB showing its terminal directory, weekday schedule and volatility and gamma research tools"
              loading="lazy"
            />
            <div className="screenshot-caption">
              <ShieldCheck size={13} /> Actual product screenshot · Research snapshots are
              timestamped
            </div>
          </div>
        </div>
      </section>
      <section className="workflow light-section" id="workflow">
        <div className="section-heading">
          <div>
            <span className="eyebrow">FROM SIGNAL TO PERSPECTIVE</span>
            <h2>
              A smarter workflow.
              <br />
              <em>A clearer head.</em>
            </h2>
          </div>
          <p>
            Less time switching tabs.
            <br />
            More time connecting the right ones.
          </p>
        </div>
        <div className="steps">
          {[
            [
              "01",
              "Choose your lens.",
              "Start with the big picture or go straight to your ticker. Pick the terminal that fits your research.",
            ],
            [
              "02",
              "Connect the signals.",
              "Bring volatility, positioning, and market breadth together. See what one chart can’t tell you.",
            ],
            [
              "03",
              "Build your perspective.",
              "Use a connected workspace to inform your own analysis. Keep the context, cut the noise.",
            ],
          ].map(([n, h, p]) => (
            <div key={n}>
              <span>
                {n}
                <ArrowUpRight size={20} />
              </span>
              <h3>{h}</h3>
              <p>{p}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="faq-section" id="questions">
        <div>
          <span className="eyebrow">A LITTLE MORE CLARITY</span>
          <h2>
            Good questions.
            <br />
            <em>Straight answers.</em>
          </h2>
          <p>Understand the workspace before you dive in.</p>
        </div>
        <div className="faqs">
          {faqs.map(([q, a], i) => (
            <div className="faq" key={q}>
              <button
                aria-expanded={faq === i}
                aria-controls={`answer-${i}`}
                onClick={() => setFaq(faq === i ? null : i)}
              >
                {q}
                {faq === i ? <Minus size={18} /> : <Plus size={18} />}
              </button>
              {faq === i && <p id={`answer-${i}`}>{a}</p>}
            </div>
          ))}
        </div>
      </section>
      <section className="closing">
        <div className="closing-grid" />
        <span className="eyebrow">YOUR NEXT PERSPECTIVE STARTS HERE</span>
        <h2>
          The market moves.
          <br />
          <em>Move with clarity.</em>
        </h2>
        <p>Bring your research together with ADA Markets HUB.</p>
        <button className="btn" onClick={openTrial}>
          Start free trial <ArrowUpRight size={18} />
        </button>
        <span className="closing-note">No credit card required. Just a curious mind.</span>
      </section>
      <footer>
        <div className="footer-top">
          <Brand />
          <span>
            Built for better questions.
            <br />
            Designed for clearer answers.
          </span>
          <a href={HUB} target="_blank" rel="noreferrer">
            Open Markets HUB <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Alpha Data Architects. All rights reserved.</span>
          <span>Research tools. Not investment advice.</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
      {trial && (
        <div className="modal-backdrop">
          <button className="modal-overlay-close" aria-label="Dismiss trial" onClick={closeTrial} />
          <dialog open className="trial-dialog" aria-modal="true" aria-labelledby="trial-title">
            <button className="modal-close" onClick={closeTrial} aria-label="Close trial form">
              <X size={21} />
            </button>
            <span className="modal-icon">
              <Sparkles size={26} />
            </span>
            {!done ? (
              <>
                <span className="eyebrow">MEET YOUR NEXT PERSPECTIVE</span>
                <h2 id="trial-title">
                  Find your <em>edge.</em>
                </h2>
                <p>Preview the free-trial experience for ADA Markets HUB.</p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setDone(true);
                  }}
                >
                  <label htmlFor="email">Work email</label>
                  <input
                    ref={emailRef}
                    id="email" aria-label="Work email"
                    type="email"
                    placeholder="you@company.com"
                    required
                    autoComplete="email"
                  />
                  <button className="btn" type="submit">
                    Start free trial <ArrowUpRight size={17} />
                  </button>
                </form>
                <div className="demo-notice">
                  Demo only. No account is created, no email is sent, and your information is not
                  stored.
                </div>
              </>
            ) : (
              <>
                <h2 id="trial-title">
                  You're ready
                  <br />
                  <em>to explore.</em>
                </h2>
                <p>
                  This was a signup preview — no account was created. Explore the existing Markets
                  HUB to see the published research.
                </p>
                <a className="btn" href={HUB} target="_blank" rel="noreferrer">
                  Explore Markets HUB <ArrowUpRight size={17} />
                </a>
                <button className="modal-return" onClick={closeTrial}>
                  Back to the landing page
                </button>
              </>
            )}
          </dialog>
        </div>
      )}
    </>
  );
}
