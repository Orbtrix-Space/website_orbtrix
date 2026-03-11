import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Mail, MapPin, ArrowRight } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const ContactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(1, "Message is required"),
});

type ContactFormValues = z.infer<typeof ContactFormSchema>;

export default function Contact() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = (data: ContactFormValues) => {
    const subject = encodeURIComponent(`Website Contact — ${data.name}`);
    const body = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
    );
    window.location.href = `mailto:info@orbtrix.space?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto px-5 md:px-8 xl:px-12 2xl:px-24 py-10 md:py-14 xl:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Left: Info */}
          <ScrollReveal direction="left">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--neon-cyan)] opacity-50 block mb-4 flex items-center gap-3">
                <span className="w-5 h-px bg-[var(--neon-cyan)]" />
                Contact
              </span>
              <h1 className="text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl font-bold tracking-tight mb-6 font-display">
                Get in touch
              </h1>
              <p className="text-neutral-400 leading-relaxed mb-12 text-lg">
                Reach out to discuss our products, technology, upcoming
                missions, or collaboration opportunities.
              </p>
              <div className="w-16 h-px bg-[var(--neon-cyan)]/20 mb-12" />

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-[var(--neon-cyan)] opacity-40 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-base font-medium mb-1 font-display">Email</h4>
                    <a href="mailto:info@orbtrix.space" className="text-neutral-400 hover:text-[var(--neon-cyan)] transition-colors text-base">
                      info@orbtrix.space
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-[var(--neon-cyan)] opacity-40 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-base font-medium mb-1 font-display">Office</h4>
                    <p className="text-neutral-400 text-base leading-relaxed">
                      Cabin 4B, Evolve Coworking Space<br />
                      Doddanakundi, Bengaluru 560048
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 neon-edge overflow-hidden">
                <iframe
                  title="Location"
                  src="https://www.google.com/maps?q=Orbtrix%20Space%20Private%20Limited%2C%20Doddanakundi%20Industrial%20Area%2C%20Brookefield%2C%20Bengaluru&output=embed"
                  className="w-full h-56 2xl:h-64 grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Form */}
          <ScrollReveal direction="right" delay={0.1}>
            <div className="neon-edge p-10 md:p-12 2xl:p-14">
              <h3 className="text-xl font-semibold mb-1 font-display">Send a message</h3>
              <p className="text-base text-neutral-600 mb-8 font-mono">
                We'll get back to you as soon as we can.
              </p>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base text-neutral-400 font-display">Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your name"
                            {...field}
                            className="bg-transparent border-[var(--neon-cyan)]/10 focus-visible:ring-[var(--neon-cyan)]/20 focus-visible:border-[var(--neon-cyan)]/25 text-white placeholder:text-neutral-700 rounded-none h-12"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base text-neutral-400 font-display">Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="your@email.com"
                            {...field}
                            className="bg-transparent border-[var(--neon-cyan)]/10 focus-visible:ring-[var(--neon-cyan)]/20 focus-visible:border-[var(--neon-cyan)]/25 text-white placeholder:text-neutral-700 rounded-none h-12"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base text-neutral-400 font-display">Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="What would you like to discuss?"
                            {...field}
                            className="bg-transparent border-[var(--neon-cyan)]/10 focus-visible:ring-[var(--neon-cyan)]/20 focus-visible:border-[var(--neon-cyan)]/25 text-white placeholder:text-neutral-700 min-h-[120px] rounded-none resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="group w-full h-12 bg-[var(--neon-cyan)] text-white hover:bg-[var(--neon-cyan)]/80 rounded-none font-medium text-base tracking-wide font-display uppercase"
                  >
                    Send Message
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
              </Form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </>
  );
}
