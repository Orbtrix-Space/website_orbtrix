import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
import { SectionHeader } from "@/components/SectionHeader";

import { Mail, MapPin } from "lucide-react";

/* =========================
   Schema
========================= */

const ContactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email address"),
  message: z.string().min(1, "Message is required"),
});

type ContactFormValues = z.infer<typeof ContactFormSchema>;

export default function Contact() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    const subject = encodeURIComponent(
      `Website Contact — ${data.name}`
    );

    const body = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
    );

    window.location.href = `mailto:info@orbtrix.space?subject=${subject}&body=${body}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left: Contact Info */}
        <div>
          <SectionHeader
            title="Contact"
            subtitle="Get in touch to discuss our products, technology, and upcoming missions."
            align="left"
          />

          <div className="space-y-8 mt-12">
            {/* Email */}
            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-white mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Email</h4>
                <a
                  href="mailto:info@orbtrix.space"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  info@orbtrix.space
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-white mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Location</h4>
                <p className="text-neutral-400">
                  Orbtrix Space Private Limited<br />
                  Cabin 4B, Evolve Coworking Space<br />
                  Doddanakundi Industrial Area, Brookefield<br />
                  Bengaluru, Karnataka 560048, India
                </p>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="mt-10 border border-white/10 overflow-hidden">
              <iframe
                title="Orbtrix Space Private Limited Location"
                src="https://www.google.com/maps?q=Orbtrix%20Space%20Private%20Limited%2C%20Doddanakundi%20Industrial%20Area%2C%20Brookefield%2C%20Bengaluru&output=embed"
                className="w-full h-64 grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <p className="text-sm text-neutral-500">
              Orbtrix Space Private Limited · Bengaluru, Karnataka
            </p>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="bg-neutral-900/20 border border-white/10 p-8 md:p-10">
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
                    <FormLabel className="text-white">Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your name"
                        {...field}
                        className="bg-black border-white/20 focus-visible:ring-white text-white placeholder:text-neutral-600 rounded-none h-12"
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
                    <FormLabel className="text-white">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="your@email.com"
                        {...field}
                        className="bg-black border-white/20 focus-visible:ring-white text-white placeholder:text-neutral-600 rounded-none h-12"
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
                    <FormLabel className="text-white">Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="How can we help?"
                        {...field}
                        className="bg-black border-white/20 focus-visible:ring-white text-white placeholder:text-neutral-600 min-h-[150px] rounded-none resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full h-12 bg-white text-black hover:bg-neutral-200 rounded-none font-bold tracking-wide"
              >
                SEND MESSAGE
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
