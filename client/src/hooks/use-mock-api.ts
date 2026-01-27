import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { InsertMessage } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

// Since this is a frontend-only build, we mock the API interaction
export function useContactForm() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertMessage) => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      console.log("Form Submitted:", data);
      
      // Return a mock success response
      return { success: true };
    },
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "We have received your inquiry and will respond shortly.",
        variant: "default",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  });
}
