import { cn } from "@/lib/utils";

const TRACES =
  "M140 90H20M140 130H60V40M140 170H0M140 210H80V290M260 90h140M260 130h80V30M260 170h140M260 210h60v90M180 70V0M220 70V20M180 230v70M220 230v50";

const PADS: ReadonlyArray<[number, number]> = [
  [20, 90],
  [60, 40],
  [80, 290],
  [340, 30],
  [320, 300],
  [400, 170],
];

/**
 * Chip-on-PCB illustration for the Semiconductors tile. On hover of the parent
 * `group`, a cobalt/lime copy of the traces fades in and pulses along the paths
 * (opacity only, so it stays on the compositor).
 */
export function PcbChip({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 300" fill="none" aria-hidden="true" className={cn(className)}>
      <path d={TRACES} stroke="#232B44" strokeWidth="2" />
      <g className="opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:hidden">
        <path d={TRACES} stroke="#2A3FFB" strokeWidth="2" />
        <path
          d={TRACES}
          stroke="#D4FF3A"
          strokeWidth="2.5"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray="0.06 0.94"
          className="group-hover:animate-[trace_2.4s_linear_infinite]"
        />
      </g>
      <rect
        x="140"
        y="70"
        width="120"
        height="160"
        rx="16"
        fill="#121831"
        stroke="#2A3FFB"
        strokeWidth="2"
      />
      <rect x="165" y="105" width="70" height="70" rx="8" fill="#2A3FFB" />
      <rect x="185" y="125" width="30" height="30" rx="4" fill="#D4FF3A" />
      <g fill="#4A5A9A">
        {PADS.map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" />
        ))}
      </g>
    </svg>
  );
}
