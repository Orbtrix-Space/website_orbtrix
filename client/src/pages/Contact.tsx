import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, MapPin, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { usePageMeta } from "@/lib/usePageMeta";
import { CONTACT } from "@/data/site";

const ContactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(1, "Message is required"),
});

type ContactFormValues = z.infer<typeof ContactFormSchema>;

const fieldClass =
  "w-full rounded-sm border bg-transparent px-4 py-3 text-[13px] text-ink placeholder:text-ink-muted/60 transition-colors duration-300 focus:outline-none";

export default function Contact() {
  usePageMeta("Contact", "Talk to the Orbtrix team about the platform, missions, or collaboration.");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  // Deep links like /contact?message=... prefill the box. Preserved behaviour.
  useEffect(() => {
    const msg = new URLSearchParams(window.location.search).get("message");
    if (msg) setValue("message", msg);
  }, [setValue]);

  const onSubmit = (data: ContactFormValues) => {
    const subject = encodeURIComponent(`Website contact. ${data.name}`);
    const body = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`,
    );
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <section className="relative overflow-hidden">

        <div className="container-page relative z-10 pb-16 pt-40 md:pt-48">
          <Reveal>
            <h1 className="max-w-3xl text-balance text-[clamp(1.95rem,4.8vw,3.5rem)] leading-[1.08]">
              Get in touch
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed md:text-xl">
              For the platform, missions, or collaboration opportunities — we would like to
              hear from you.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-page pb-32">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* ---- Details ---- */}
          <Reveal>
            <div className="flex flex-col gap-10">
              <div className="flex items-start gap-4">
                <Mail className="mt-1 h-5 w-5 shrink-0" style={{ color: "var(--accent)" }} aria-hidden="true" />
                <div>
                  <h2 className="text-lg">Email</h2>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="mt-1 inline-block text-ink-muted transition-colors hover:text-ink"
                  >
                    {CONTACT.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="mt-1 h-5 w-5 shrink-0" style={{ color: "var(--accent)" }} aria-hidden="true" />
                <div>
                  <h2 className="text-lg">Office</h2>
                  <address className="mt-1 not-italic leading-relaxed text-ink-muted">
                    {CONTACT.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>
              </div>

              <div className="overflow-hidden rounded-lg border" style={{ borderColor: "var(--border)" }}>
                <iframe
                  title="Orbtrix Space office location"
                  src={CONTACT.mapsEmbedUrl}
                  className="h-64 w-full grayscale transition-all duration-700 ease-brand hover:grayscale-0"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </Reveal>

          {/* ---- Form ---- */}
          <Reveal delay={120}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="card p-8 md:p-10">
              <h2 className="text-2xl">Send a message</h2>
              <p className="mt-2 text-[13px]">This opens your email client with the message ready.</p>

              <div className="mt-8 flex flex-col gap-6">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm text-ink">
                    Name
                  </label>
                  <input
                    id="name"
                    className={fieldClass}
                    style={{ borderColor: errors.name ? "#f87171" : "var(--border-strong)" }}
                    placeholder="Your name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    {...register("name")}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-2 text-sm" style={{ color: "#f87171" }}>
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm text-ink">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={fieldClass}
                    style={{ borderColor: errors.email ? "#f87171" : "var(--border-strong)" }}
                    placeholder="your@email.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-2 text-sm" style={{ color: "#f87171" }}>
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm text-ink">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className={`${fieldClass} resize-y`}
                    style={{ borderColor: errors.message ? "#f87171" : "var(--border-strong)" }}
                    placeholder="What would you like to discuss?"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    {...register("message")}
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-2 text-sm" style={{ color: "#f87171" }}>
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <button type="submit" className="btn btn-primary group h-14 w-full text-base">
                  Send message
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-brand group-hover:translate-x-1" />
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
