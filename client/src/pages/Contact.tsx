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
      <div className="max-w-7xl mx-auto px-5 md:px-8 xl:px-12 py-10 md:py-14 xl:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Left: Info */}
          <ScrollReveal direction="left">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-600 block mb-4">
                Contact
              </span>
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight mb-6">
                Get in touch
              </h1>
              <p className="text-neutral-400 leading-relaxed mb-12">
                Reach out to discuss our products, technology, upcoming
                missions, or collaboration opportunities.
              </p>
              <div className="w-16 h-px bg-white/20 mb-12" />

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-neutral-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium mb-1">Email</h4>
                    <a
                      href="mailto:info@orbtrix.space"
                      className="text-neutral-400 hover:text-white transition-colors text-sm"
                    >
                      info@orbtrix.space
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-neutral-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium mb-1">Office</h4>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                      Cabin 4B, Evolve Coworking Space
                      <br />
                      Doddanakundi, Bengaluru 560048
                    </p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="mt-12 border border-white/[0.08] overflow-hidden">
                <iframe
                  title="Location"
                  src="https://www.google.com/maps?q=Orbtrix%20Space%20Private%20Limited%2C%20Doddanakundi%20Industrial%20Area%2C%20Brookefield%2C%20Bengaluru&output=embed"
                  className="w-full h-48 grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Form */}
          <ScrollReveal direction="right" delay={0.1}>
            <div className="border border-white/[0.08] p-8 md:p-10">
              <h3 className="text-lg font-semibold mb-1">Send a message</h3>
              <p className="text-sm text-neutral-600 mb-8">
                We'll get back to you as soon as we can.
              </p>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-neutral-400">
                          Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your name"
                            {...field}
                            className="bg-transparent border-white/[0.08] focus-visible:ring-white/20 focus-visible:border-white/20 text-white placeholder:text-neutral-700 rounded-none h-11"
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
                        <FormLabel className="text-sm text-neutral-400">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="your@email.com"
                            {...field}
                            className="bg-transparent border-white/[0.08] focus-visible:ring-white/20 focus-visible:border-white/20 text-white placeholder:text-neutral-700 rounded-none h-11"
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
                        <FormLabel className="text-sm text-neutral-400">
                          Message
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="What would you like to discuss?"
                            {...field}
                            className="bg-transparent border-white/[0.08] focus-visible:ring-white/20 focus-visible:border-white/20 text-white placeholder:text-neutral-700 min-h-[120px] rounded-none resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="group w-full h-11 bg-white text-black hover:bg-neutral-100 rounded-none font-medium text-sm tracking-wide"
                  >
                    Send Message
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
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
