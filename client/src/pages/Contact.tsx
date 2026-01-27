import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useContactForm } from "@/hooks/use-mock-api";

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
   Local frontend schema
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

  const mutation = useContactForm();

  const onSubmit = (data: ContactFormValues) => {
    mutation.mutate(data, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left: Contact Info */}
        <div>
          <SectionHeader
            title="Contact"
            subtitle="Get in touch to learn more about our products, technology, and upcoming missions."
            align="left"
          />

          <div className="space-y-8 mt-12">
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

            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-white mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Location</h4>
                <a
                  href="https://www.google.com/maps/place/Bengaluru"
                  target="_blank"
                  rel="noreferrer"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Bengaluru, India
                </a>
              </div>
            </div>
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
                disabled={mutation.isPending}
                className="w-full h-12 bg-white text-black hover:bg-neutral-200 rounded-none font-bold tracking-wide"
              >
                {mutation.isPending ? "SENDING..." : "SEND MESSAGE"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
