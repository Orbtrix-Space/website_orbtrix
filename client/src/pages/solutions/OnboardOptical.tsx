import { Reveal } from "@/components/Reveal";
import { usePageMeta } from "@/lib/usePageMeta";
import { OPTICAL, SOLUTION_BY_SLUG } from "@/data/solutions";
import {
  AudienceRow,
  Chips,
  DishaBand,
  FlowCodes,
  FlowStack,
  Qualifier,
  SolutionClosing,
  SolutionCrossLinks,
  SolutionHero,
  SolutionSection,
  SpecList,
  StageList,
} from "@/components/solutions/SolutionParts";
import { DownlinkPlate, ProductPlate } from "@/components/solutions/SolutionVisuals";

/**
 * Onboard Optical Processing.
 *
 * NETRA narrows and NEXUS connects; this page compares. Its centre of gravity
 * is the two-column plate that puts the same mission either side of the link,
 * and everything before it exists to make that comparison land: the pass is
 * the constraint, so the question is what the pass has to carry.
 *
 * The page is careful about one thing above all others — this is an
 * engineering capability delivered per mission, not a product with a feature
 * list. Every capability section says so in those words.
 */
export default function OnboardOptical() {
  const solution = SOLUTION_BY_SLUG["onboard-optical"];
  usePageMeta(OPTICAL.meta.title, OPTICAL.meta.description);

  return (
    <>
      <SolutionHero
        ident={solution.ident}
        cmd={solution.cmd}
        name={solution.name}
        role={solution.role}
        heading={OPTICAL.hero.heading}
        lead={OPTICAL.hero.lead}
        primary={OPTICAL.hero.primary}
        secondary={OPTICAL.hero.secondary}
        visual={<ProductPlate />}
      />

      {/* ===================== THE PROBLEM ===================== */}
      <SolutionSection mark={OPTICAL.problem.mark} heading={OPTICAL.problem.heading} className="pt-0">
        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-16">
          <div>
            {OPTICAL.problem.body.map((paragraph, i) => (
              <Reveal key={paragraph} delay={100 + i * 70}>
                <p
                  className={`text-pretty font-light leading-relaxed ${
                    i === 0 ? "text-[0.98rem] text-ink" : "mt-5 text-[0.92rem]"
                  }`}
                >
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={180}>
            <DownlinkPlate />
          </Reveal>
        </div>
      </SolutionSection>

      {/* ===================== PIPELINE ===================== */}
      <SolutionSection mark={OPTICAL.pipeline.mark} heading={OPTICAL.pipeline.heading} className="pt-0">
        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <Reveal delay={100} className="lg:sticky lg:top-28 lg:self-start">
            <p className="measure text-pretty text-[0.95rem] font-light leading-relaxed">
              {OPTICAL.pipeline.lead}
            </p>
          </Reveal>

          <Reveal delay={160}>
            <FlowStack steps={OPTICAL.pipeline.steps} className="max-w-xl" />
          </Reveal>
        </div>
      </SolutionSection>

      {/* ===================== CAPABILITIES ===================== */}
      <SolutionSection
        id="capabilities"
        mark={OPTICAL.capabilities.mark}
        heading={OPTICAL.capabilities.heading}
        lead={OPTICAL.capabilities.lead}
        className="pt-0"
        narrow
      >
        <Reveal delay={160}>
          <SpecList items={OPTICAL.capabilities.items} columns={3} className="mt-12" />
        </Reveal>
      </SolutionSection>

      {/* ===================== EDGE PROCESSING =====================
          The page's centre. Two columns, one argument: where the work happens
          changes what the link has to carry. The traditional path is not drawn
          as wrong — it is drawn as carrying more. */}
      <SolutionSection
        mark={OPTICAL.edge.mark}
        heading={OPTICAL.edge.heading}
        lead={OPTICAL.edge.lead}
        className="pt-0"
        narrow
      >
        <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8">
          <Reveal delay={140}>
            <div className="sol-compare">
              <p className="sol-compare-title">{OPTICAL.edge.traditional.title}</p>
              <StageList steps={OPTICAL.edge.traditional.steps} className="mt-6" />
              <p className="dsh-cap-desc mt-7">{OPTICAL.edge.traditional.caption}</p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="sol-compare" data-lead="true">
              <p className="sol-compare-title">{OPTICAL.edge.onboard.title}</p>
              <StageList steps={OPTICAL.edge.onboard.steps} className="mt-6" />
              <p className="dsh-cap-desc mt-7">{OPTICAL.edge.onboard.caption}</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={240}>
          <Qualifier className="mt-10">{OPTICAL.edge.note}</Qualifier>
        </Reveal>
      </SolutionSection>

      {/* ===================== MISSION-SPECIFIC ===================== */}
      <SolutionSection
        mark={OPTICAL.missionSpecific.mark}
        heading={OPTICAL.missionSpecific.heading}
        lead={OPTICAL.missionSpecific.lead}
        className="pt-0"
      >
        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
          <Reveal delay={140}>
            <FlowCodes steps={OPTICAL.missionSpecific.steps} />
          </Reveal>

          <Reveal delay={200}>
            <div className="lg:pt-2">
              <p className="dsh-panel-tag">Engineering programme</p>
              <p className="measure mt-5 text-pretty text-[0.92rem] font-light leading-relaxed">
                Each stage produces something the next one needs: a defined mission product, an
                algorithm that produces it, an implementation that fits the compute the spacecraft
                carries, and evidence that it behaves. Orbtrix can run the whole sequence, or join
                it where the work currently stops.
              </p>
            </div>
          </Reveal>
        </div>
      </SolutionSection>

      {/* ===================== SERVICE ===================== */}
      <SolutionSection
        mark={OPTICAL.service.mark}
        heading={OPTICAL.service.heading}
        lead={OPTICAL.service.lead}
        className="pt-0"
        narrow
      >
        <Reveal delay={160}>
          <SpecList items={OPTICAL.service.items} columns={3} className="mt-12" />
        </Reveal>
      </SolutionSection>

      {/* ===================== APPLICATIONS ===================== */}
      <SolutionSection
        mark={OPTICAL.applications.mark}
        heading={OPTICAL.applications.heading}
        lead={OPTICAL.applications.lead}
        className="pt-0"
        narrow
      >
        <Reveal delay={160}>
          <Chips items={OPTICAL.applications.items} className="mt-11" />
        </Reveal>

        <Reveal delay={220}>
          <Qualifier className="mt-9">
            Potential mission applications. Each is scoped against a specific payload and mission
            product; none is offered as a capability already deployed.
          </Qualifier>
        </Reveal>
        <AudienceRow items={OPTICAL.audience} />
      </SolutionSection>

      <DishaBand
        slug={solution.slug}
        mark={OPTICAL.disha.mark}
        heading={OPTICAL.disha.heading}
        body={OPTICAL.disha.body}
      />

      <SolutionClosing
        mark={OPTICAL.closing.mark}
        heading={OPTICAL.closing.heading}
        lead={OPTICAL.closing.lead}
        cta={OPTICAL.closing.cta}
      />

      <SolutionCrossLinks slug={solution.slug} />
    </>
  );
}
