import { toast } from "@/components/ui/use-toast";
import { AuthService } from "@/services/AuthService";
import { errorHandler } from "@/utils/helpers";
import { useMutation } from "@tanstack/react-query";

export const useRegisterMutation = () => {
  const loginMutation = useMutation({
    mutationKey: ["users/register"],
    mutationFn: (data) => AuthService.register(data),
    onSuccess: async (data) => {
      toast({
        title: "Registration Successful!",
        description:
          "Thank you for registering. Please wait for a confirmation email with further instructions",
      });
    },
    onError: (error) => {
      const message = errorHandler(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: message,
      });
    },
  });

  return loginMutation;
};
