/* ==========================================================================
   Company page — the closed-loop figure.

   The only diagram on the page, and it carries the whole thesis: ground and
   spacecraft are one system, not two.

   Deliberately NOT the ring used on the DISHA page. A ring says "these stages
   repeat"; this has to say something more specific — that the loop has two
   halves, that one is on the ground and the other is in orbit, and that the
   link between them is crossed twice per turn.

   So it circulates: down the ground column, across on mission intent, UP the
   spacecraft column, and back across on telemetry. The spacecraft column reads
   bottom-to-top on purpose; the arrows carry the direction, and the shape of
   the circulation is the point.

   Nothing here carries a value. It is a structure diagram, and structure is
   all it claims.
   ========================================================================== */

export interface LoopNodeSpec {
  code: string;
  /** Optional second line, e.g. "Long-horizon planning". */
  sub?: string;
}

const GEO = {
  leftX: 176,
  rightX: 524,
  boxW: 216,
  boxH: 56,
  /** Vertical rhythm. Row count follows the data, not this constant. */
  rowGap: 104,
  firstRow: 62,
  topY: 28,
  padBottom: 56,
};

const rowY = (i: number) => GEO.firstRow + i * GEO.rowGap;

function LoopNode({
  cx,
  y,
  node,
  lit,
}: {
  cx: number;
  y: number;
  node: LoopNodeSpec;
  lit?: boolean;
}) {
  const { boxW, boxH } = GEO;
  const mid = y + boxH / 2;

  return (
    <g>
      <rect
        x={cx - boxW / 2}
        y={y}
        width={boxW}
        height={boxH}
        rx="8"
        className="dsh-fig-node"
        data-on={lit ? "true" : undefined}
      />
      {/* The label is always lit; only the BORDER distinguishes the two halves.
          Muting the ground column's type as well made the ground read as
          switched off, which is the opposite of what the figure says. */}
      <text
        x={cx}
        y={node.sub ? mid - 2 : mid + 3.5}
        textAnchor="middle"
        className="dsh-fig-label"
        data-on="true"
        style={{ letterSpacing: "0.1em" }}
      >
        {node.code}
      </text>
      {node.sub && (
        <text x={cx} y={mid + 13} textAnchor="middle" className="dsh-fig-sub">
          {node.sub}
        </text>
      )}
    </g>
  );
}

/** A short rail between two stacked nodes, with a chevron at the far end. */
function Drop({ cx, from, up = false }: { cx: number; from: number; up?: boolean }) {
  const span = GEO.rowGap - GEO.boxH;
  const to = up ? from - span : from + span;
  const head = up ? to + 8 : to - 8;

  return (
    <g className="dsh-fig-rail" data-on="true">
      <line x1={cx} y1={from} x2={cx} y2={to} />
      <path d={`M ${cx - 4} ${head} L ${cx} ${to} L ${cx + 4} ${head}`} />
    </g>
  );
}

export function ClosedLoopPlate({
  ground,
  space,
  uplink,
  downlink,
}: {
  ground: LoopNodeSpec[];
  space: LoopNodeSpec[];
  uplink: string;
  downlink: string;
}) {
  const { leftX, rightX, boxH, topY, padBottom } = GEO;

  /* The two columns share a row grid, so the taller one sets the height and
     the crossings always meet a node rather than empty space. */
  const rowCount = Math.max(ground.length, space.length);
  const lastY = rowY(rowCount - 1);
  const bottomY = lastY + boxH + 44;
  const height = bottomY + padBottom;

  return (
    <svg
      viewBox={`0 0 700 ${height}`}
      className="sol-fig block h-auto w-full"
      role="img"
      aria-label={`A closed loop. On the ground: ${ground.map((n) => n.code).join(", then ")}. Across to the spacecraft, where: ${space.map((n) => n.code).join(", then ")}. And back to the ground as telemetry.`}
    >
      <text x={leftX} y="12" textAnchor="middle" className="dsh-fig-label" data-on="true">
        GROUND
      </text>
      <text x={rightX} y="12" textAnchor="middle" className="dsh-fig-label" data-on="true">
        SPACECRAFT
      </text>

      {/* Ground column, top to bottom. */}
      {ground.map((node, i) => (
        <g key={node.code}>
          <LoopNode cx={leftX} y={rowY(i)} node={node} />
          {i < ground.length - 1 && <Drop cx={leftX} from={rowY(i) + boxH} />}
        </g>
      ))}

      {/* Spacecraft column, on the same row grid but filled from the bottom:
          the first stage sits where the uplink arrives, the last where the
          downlink leaves. */}
      {space.map((node, i) => {
        const y = rowY(rowCount - 1 - i);
        return (
          <g key={node.code}>
            <LoopNode cx={rightX} y={y} node={node} lit />
            {i < space.length - 1 && <Drop cx={rightX} from={y} up />}
          </g>
        );
      })}

      {/* Down the ground side, across the bottom, up into the spacecraft. */}
      <g className="dsh-fig-rail" data-on="true">
        <path
          d={`M ${leftX} ${lastY + boxH} L ${leftX} ${bottomY} L ${rightX} ${bottomY} L ${rightX} ${lastY + boxH}`}
          fill="none"
        />
        <path
          d={`M ${rightX - 4} ${lastY + boxH + 8} L ${rightX} ${lastY + boxH} L ${rightX + 4} ${lastY + boxH + 8}`}
        />
      </g>
      <text x="350" y={bottomY + 20} textAnchor="middle" className="dsh-fig-label" data-on="true">
        {uplink}
      </text>

      {/* Out of the top of the spacecraft column and back into the ground.
          This is the stroke that makes it a loop rather than a pipeline. */}
      <g className="dsh-fig-rail" data-on="true">
        <path
          d={`M ${rightX} ${rowY(0)} L ${rightX} ${topY} L ${leftX} ${topY} L ${leftX} ${rowY(0)}`}
          fill="none"
        />
        <path d={`M ${leftX - 4} ${rowY(0) - 8} L ${leftX} ${rowY(0)} L ${leftX + 4} ${rowY(0) - 8}`} />
      </g>
      <text x="350" y={topY - 8} textAnchor="middle" className="dsh-fig-label" data-on="true">
        {downlink}
      </text>

      {/* The link both crossings share. */}
      <line x1="350" y1={topY + 12} x2="350" y2={bottomY - 12} className="dsh-fig-grid" strokeDasharray="2 7" />
    </svg>
  );
}
