import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const msg = params.get("message");
    if (msg) {
      form.setValue("message", msg);
    }
  }, [form]);

  const onSubmit = (data: ContactFormValues) => {
    const subject = encodeURIComponent(`Website Contact. ${data.name}`);
    const body = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
    );
    window.location.href = `mailto:info@orbtrix.space?subject=${subject}&body=${body}`;
  };

  return (
    <div className="bg-white relative overflow-hidden">
      {/* Subtle teal radial wash on top */}
      <div
        className="absolute top-0 left-0 right-0 h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(20, 184, 166, 0.06) 0%, transparent 60%)",
        }}
      />

      {/* Ambient teal orbs */}
      <motion.div
        className="absolute top-40 -left-40 w-[500px] h-[500px] rounded-full opacity-15 blur-[130px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #14b8a6 0%, transparent 70%)" }}
        animate={{ opacity: [0.08, 0.18, 0.08] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-40 -right-40 w-[500px] h-[500px] rounded-full opacity-10 blur-[130px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #2dd4bf 0%, transparent 70%)" }}
        animate={{ opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto px-5 md:px-8 xl:px-12 2xl:px-24 py-16 md:py-20 xl:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Left: Info */}
          <ScrollReveal direction="left">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-teal-700 block mb-4 flex items-center gap-3">
                <span className="w-5 h-px bg-teal-600/50" />
                Contact
              </span>
              <h1 className="text-5xl md:text-6xl xl:text-7xl font-medium tracking-tight mb-6 text-gradient-teal">
                Get in touch
              </h1>
              <p className="text-neutral-500 leading-relaxed mb-12 text-lg">
                Reach out to discuss our products, technology, upcoming
                missions, or collaboration opportunities.
              </p>
              <div className="w-16 h-px bg-teal-600/50 mb-12" />

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-teal-700 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-base font-medium mb-1 text-neutral-900">Email</h4>
                    <a href="mailto:info@orbtrix.space" className="text-neutral-500 hover:text-teal-700 transition-colors text-base">
                      info@orbtrix.space
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-teal-700 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-base font-medium mb-1 text-neutral-900">Office</h4>
                    <p className="text-neutral-500 text-base leading-relaxed">
                      Cabin 4B, Evolve Coworking Space<br />
                      Doddanakundi, Bengaluru 560048
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 border border-black/10 overflow-hidden">
                <iframe
                  title="Location"
                  src="https://www.google.com/maps?q=Orbtrix%20Space%20Private%20Limited%2C%20Doddanakundi%20Industrial%20Area%2C%20Brookefield%2C%20Bengaluru&output=embed"
                  className="w-full h-56 grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Form */}
          <ScrollReveal direction="right" delay={0.1}>
            <div className="border border-black/10 bg-white p-10 md:p-12">
              <h3 className="text-xl font-semibold mb-1 text-neutral-900">Send a message</h3>
              <p className="text-base text-neutral-600 mb-8">
                We will get back to you as soon as we can.
              </p>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base text-neutral-500">Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your name"
                            {...field}
                            className="bg-transparent border-black/15 focus-visible:ring-teal-500/40 focus-visible:border-teal-600 text-neutral-900 placeholder:text-neutral-500 rounded-none h-12"
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
                        <FormLabel className="text-base text-neutral-500">Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="your@email.com"
                            {...field}
                            className="bg-transparent border-black/15 focus-visible:ring-teal-500/40 focus-visible:border-teal-600 text-neutral-900 placeholder:text-neutral-500 rounded-none h-12"
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
                        <FormLabel className="text-base text-neutral-500">Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="What would you like to discuss?"
                            {...field}
                            className="bg-transparent border-black/15 focus-visible:ring-teal-500/40 focus-visible:border-teal-600 text-neutral-900 placeholder:text-neutral-500 min-h-[120px] rounded-none resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="group w-full h-12 bg-black text-white hover:bg-teal-600 rounded-none font-semibold text-base tracking-wide uppercase"
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
    </div>
  );
}
