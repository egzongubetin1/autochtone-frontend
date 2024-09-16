import { toast } from "@/components/ui/use-toast";
import { AuthService } from "@/services/AuthService";
import { ContactService } from "@/services/ContactService";
import { errorHandler } from "@/utils/helpers";
import { useMutation } from "@tanstack/react-query";

export const useContactMutation = () => {
  const loginMutation = useMutation({
    mutationKey: ["contact"],
    mutationFn: (data) => ContactService.contact(data),
    onSuccess: async (data) => {
      toast({
        title: "Thank you!",
        description: "Thank you for contacting us.",
      });
      return data;
    },
    onError: (error) => {
      const message = errorHandler(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: message,
      });
      return message;
    },
  });

  return loginMutation;
};
