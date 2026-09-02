import { Reveal } from "@/components/Reveal";
import { usePageMeta } from "@/lib/usePageMeta";
import { NEXUS, NEXUS_HERO_IMAGE, SOLUTION_BY_SLUG } from "@/data/solutions";
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
} from "@/components/solutions/SolutionParts";
import {
  ConvergePlate,
  DependencyPlate,
  ScalePlate,
  TaskingPlate,
} from "@/components/solutions/SolutionVisuals";

/**
 * NEXUS — mission tasking and ground operations.
 *
 * Where NETRA narrows, NEXUS connects: every figure here is about things that
 * have to agree before an activity can happen. The dependency plate, the
 * converging schedule and the pass strip are three views of the same claim —
 * the hard part of operations is not the spacecraft, it is everything the
 * spacecraft depends on.
 *
 * The layout deliberately runs wider than NETRA's: NETRA is a reading page
 * with plates, NEXUS is a page of diagrams with reading between them.
 */
export default function Nexus() {
  const solution = SOLUTION_BY_SLUG.nexus;
  usePageMeta(NEXUS.meta.title, NEXUS.meta.description);

  return (
    <>
      <SolutionHero
        ident={solution.ident}
        cmd={solution.cmd}
        name={solution.name}
        role={solution.role}
        heading={NEXUS.hero.heading}
        lead={NEXUS.hero.lead}
        primary={NEXUS.hero.primary}
        secondary={NEXUS.hero.secondary}
        backdrop={NEXUS_HERO_IMAGE}
      />

      {/* ===================== THE PROBLEM ===================== */}
      <SolutionSection mark={NEXUS.problem.mark} heading={NEXUS.problem.heading} className="pt-0">
        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-16">
          <div>
            {NEXUS.problem.body.map((paragraph, i) => (
              <Reveal key={paragraph} delay={100 + i * 80}>
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
            <DependencyPlate nodes={NEXUS.problem.nodes} />
          </Reveal>
        </div>
      </SolutionSection>

      {/* ===================== CAPABILITIES ===================== */}
      <SolutionSection
        id="capabilities"
        mark={NEXUS.capabilities.mark}
        heading={NEXUS.capabilities.heading}
        className="pt-0"
        narrow
      >
        <Reveal delay={120}>
          <SpecList items={NEXUS.capabilities.items} className="mt-12" />
        </Reveal>
      </SolutionSection>

      {/* ===================== MISSION FLOW =====================
          The spine of the page. Eight stages, so it runs down the page rather
          than across it — and it sits beside the argument for why it is one
          workflow rather than eight tools. */}
      <SolutionSection mark={NEXUS.flow.mark} heading={NEXUS.flow.heading} className="pt-0">
        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          {/* Follows the flow down rather than sitting at the top of an
              otherwise empty column. */}
          <Reveal delay={100} className="lg:sticky lg:top-28 lg:self-start">
            <p className="measure text-pretty text-[0.95rem] font-light leading-relaxed">
              {NEXUS.flow.lead}
            </p>
          </Reveal>

          <Reveal delay={160}>
            <FlowStack steps={NEXUS.flow.steps} className="max-w-xl" />
          </Reveal>
        </div>
      </SolutionSection>

      {/* ===================== TASKING ===================== */}
      <SolutionSection
        mark={NEXUS.tasking.mark}
        heading={NEXUS.tasking.heading}
        lead={NEXUS.tasking.lead}
        className="pt-0"
        narrow
      >
        <Reveal delay={160}>
          <Chips items={NEXUS.tasking.examples} className="mt-11" />
        </Reveal>

        <Reveal delay={220}>
          <Qualifier className="mt-9">{NEXUS.tasking.note}</Qualifier>
        </Reveal>
      </SolutionSection>

      {/* ===================== GROUND ===================== */}
      <SolutionSection
        mark={NEXUS.ground.mark}
        heading={NEXUS.ground.heading}
        lead={NEXUS.ground.lead}
        className="pt-0"
      >
        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:items-center lg:gap-16">
          <Reveal delay={140}>
            <FlowCodes steps={NEXUS.ground.steps} />
          </Reveal>

          <Reveal delay={200}>
            <TaskingPlate />
          </Reveal>
        </div>

        <Reveal delay={240}>
          <Qualifier className="mt-12">{NEXUS.ground.note}</Qualifier>
        </Reveal>
      </SolutionSection>

      {/* ===================== SCHEDULING ===================== */}
      <SolutionSection
        mark={NEXUS.schedule.mark}
        heading={NEXUS.schedule.heading}
        lead={NEXUS.schedule.lead}
        className="pt-0"
        narrow
      >
        <Reveal delay={160}>
          <div className="mt-14">
            <ConvergePlate inputs={NEXUS.schedule.inputs} output={NEXUS.schedule.output} />
          </div>
        </Reveal>
      </SolutionSection>

      {/* ===================== SCALE ===================== */}
      <SolutionSection
        mark={NEXUS.scale.mark}
        heading={NEXUS.scale.heading}
        lead={NEXUS.scale.lead}
        className="pt-0"
        narrow
      >
        <Reveal delay={160}>
          <div className="mt-12">
            <ScalePlate stages={NEXUS.scale.stages} />
          </div>
        </Reveal>
      </SolutionSection>

      {/* ===================== SERVICE ===================== */}
      <SolutionSection
        mark={NEXUS.service.mark}
        heading={NEXUS.service.heading}
        lead={NEXUS.service.lead}
        className="pt-0"
        narrow
      >
        <Reveal delay={160}>
          <SpecList items={NEXUS.service.items} columns={3} className="mt-12" />
        </Reveal>
        <AudienceRow items={NEXUS.audience} />
      </SolutionSection>

      <DishaBand
        slug={solution.slug}
        mark={NEXUS.disha.mark}
        heading={NEXUS.disha.heading}
        body={NEXUS.disha.body}
      />

      <SolutionClosing
        mark={NEXUS.closing.mark}
        heading={NEXUS.closing.heading}
        lead={NEXUS.closing.lead}
        cta={NEXUS.closing.cta}
      />

      <SolutionCrossLinks slug={solution.slug} />
    </>
  );
}
