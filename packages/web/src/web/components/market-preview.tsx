import { useState } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  LayoutDashboard,
  ChartNoAxesCombined,
  Layers,
  Globe,
  SlidersHorizontal,
  CircleHelp,
  Search,
  Command,
} from "lucide-react";

const series = [
  50, 47, 52, 45, 55, 51, 58, 62, 57, 67, 65, 59, 66, 68, 64, 74, 72, 78, 70, 75, 80, 77, 88, 84,
  86, 79, 90, 85, 93, 87, 97, 95, 101, 96, 108, 102, 112, 109, 115, 110, 122, 119, 126, 118, 124,
  130, 126, 139, 135, 145,
];
export function MarketPreview({ compact = false }: { compact?: boolean }) {
  const [ticker, setTicker] = useState("SPY");
  const [range, setRange] = useState("1D");
  const [tab, setTab] = useState("Overview");
  const offset = ticker === "QQQ" ? 7 : ticker === "NVDA" ? 14 : 0;
  const points = series
    .map(
      (v, i) =>
        `${i * 10.2},${185 - v + offset + (range === "1W" ? Math.sin(i) * 12 : range === "1M" ? Math.cos(i) * 18 : 0)}`,
    )
    .join(" ");
  return (
    <div className={`terminal ${compact ? "compact" : ""}`}>
      <div className="terminal-top">
        <div className="terminal-wordmark">
          <span className="mini-mark">✳</span> ADA <span> / MARKETS HUB</span>
        </div>
        <div className="preview-label">
          <span /> PRODUCT PREVIEW
        </div>
      </div>
      <div className="terminal-body">
        <aside className="terminal-sidebar">
          <div className="workspace-label">WORKSPACE</div>
          {[
            [LayoutDashboard, "Overview"],
            [ChartNoAxesCombined, "Vol surface"],
            [Layers, "Gamma levels"],
            [Globe, "Market vision"],
          ].map(([Icon, label]: any) => (
            <button
              key={label}
              onClick={() => setTab(label)}
              className={tab === label ? "selected" : ""}
            >
              <Icon size={13} />
              {label}
            </button>
          ))}
          <div className="sidebar-rule" />
          <div className="workspace-label">WATCHLIST</div>
          {["SPY", "QQQ", "NVDA"].map((t, i) => (
            <button
              key={t}
              onClick={() => setTicker(t)}
              className={`watch-row ${ticker === t ? "ticker-active" : ""}`}
            >
              <span>{t}</span>
              <small>+{[0.84, 1.12, 2.36][i]}%</small>
            </button>
          ))}
          <div className="sidebar-bottom">
            <CircleHelp size={13} /> Research workspace
          </div>
        </aside>
        <div className="terminal-main">
          <div className="terminal-heading">
            <div>
              <div className="terminal-breadcrumb">Markets / {tab}</div>
              <h3>{tab === "Overview" ? "Market overview" : tab}</h3>
            </div>
            <Search size={15} />
          </div>
          <div className="mini-stats">
            <div>
              <span>S&P 500</span>
              <strong>6,024.18</strong>
              <small>↗ +0.84%</small>
            </div>
            <div>
              <span>NASDAQ 100</span>
              <strong>21,482.64</strong>
              <small>↗ +1.12%</small>
            </div>
            <div>
              <span>VIX INDEX</span>
              <strong>18.42</strong>
              <small className="down">↘ −2.31%</small>
            </div>
          </div>
          <div className="chart-panel">
            <div className="chart-header">
              <button
                className="ticker-select"
                onClick={() =>
                  setTicker(ticker === "SPY" ? "QQQ" : ticker === "QQQ" ? "NVDA" : "SPY")
                }
              >
                {ticker}
                <ChevronDown size={12} />
                <span>
                  {ticker === "SPY"
                    ? "S&P 500 ETF"
                    : ticker === "QQQ"
                      ? "NASDAQ 100 ETF"
                      : "NVIDIA"}
                </span>
              </button>
              <SlidersHorizontal size={13} />
            </div>
            <div className="price-row">
              <strong>
                {ticker === "SPY" ? "602.41" : ticker === "QQQ" ? "524.82" : "142.87"}
              </strong>
              <span>
                +
                {ticker === "SPY"
                  ? "5.02 (0.84%)"
                  : ticker === "QQQ"
                    ? "5.81 (1.12%)"
                    : "3.29 (2.36%)"}
              </span>
              <div className="chart-ranges">
                {["1D", "1W", "1M"].map((r) => (
                  <button
                    key={r}
                    className={range === r ? "active" : ""}
                    onClick={() => setRange(r)}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <div className="chart">
              <svg viewBox="0 0 520 210" aria-label={`${ticker} illustrative ${range} price chart`}>
                <defs>
                  <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#d9e99e" stopOpacity=".22" />
                    <stop offset="100%" stopColor="#d9e99e" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[30, 75, 120, 165].map((y) => (
                  <line
                    key={y}
                    x1="0"
                    x2="505"
                    y1={y}
                    y2={y}
                    stroke="#30342b"
                    strokeDasharray="3 4"
                  />
                ))}
                <polygon points={`0,210 ${points} 500,210`} fill="url(#chartFill)" />
                <polyline
                  points={points}
                  fill="none"
                  stroke="#dcec9d"
                  strokeWidth="2.2"
                  strokeLinejoin="round"
                />
                <circle
                  cx="500"
                  cy={185 - series[series.length - 1] + offset}
                  r="4"
                  fill="#deed9d"
                />
                <text x="475" y="22" fill="#959b89" fontSize="9">
                  604.00
                </text>
                <text x="475" y="100" fill="#959b89" fontSize="9">
                  600.00
                </text>
                <text x="475" y="170" fill="#959b89" fontSize="9">
                  596.00
                </text>
              </svg>
              <div className="chart-times">
                <span>09:30</span>
                <span>11:00</span>
                <span>12:30</span>
                <span>14:00</span>
                <span>16:00</span>
              </div>
            </div>
          </div>
          <div className="terminal-lower">
            <div>
              <span>
                NET GAMMA EXPOSURE <ArrowUpRight size={12} />
              </span>
              <strong>+$2.48B</strong>
              <div className="mini-bars">
                {[16, 25, 35, 22, 38, 47, 35, 53, 44, 61, 48, 64, 53, 70, 65, 76, 62, 80].map(
                  (n, i) => (
                    <i key={i} style={{ height: `${n / 2}px` }} />
                  ),
                )}
              </div>
            </div>
            <div>
              <span>
                SECTOR PERFORMANCE <ArrowUpRight size={12} />
              </span>
              <div className="heatmap">
                <b>
                  TECH <small>+1.42%</small>
                </b>
                <b>
                  FIN <small>+0.86%</small>
                </b>
                <b>
                  HLTH <small>+0.64%</small>
                </b>
                <b>
                  ENERGY <small>−0.38%</small>
                </b>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="terminal-footer">
        <span>
          <Command size={10} /> 21 terminals. One workspace.
        </span>
        <span>Illustrative data · Not a live feed</span>
      </div>
    </div>
  );
}
