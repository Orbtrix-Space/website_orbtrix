import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

/* =========================
   Frontend-only form type
========================= */

export type ContactFormValues = {
  name: string;
  email: string;
  message: string;
};

/* =========================
   Mock API hook
========================= */

export function useContactForm() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: ContactFormValues) => {
      // Simulate network latency
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock submission (safe for static builds)
      console.log("Contact form submitted:", data);

      return { success: true };
    },

    onSuccess: () => {
      toast({
        title: "Message Sent",
        description:
          "We have received your inquiry and will respond shortly.",
      });
    },

    onError: () => {
      toast({
        title: "Error",
        description:
          "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    },
  });
}
