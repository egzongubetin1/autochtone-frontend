import { toast } from "@/components/ui/use-toast";
import { AuthService } from "@/services/AuthService";
import { errorHandler } from "@/utils/helpers";
import { useMutation } from "@tanstack/react-query";

export const useLoginMutation = (
  callback
) => {
  const loginMutation = useMutation({
    mutationKey: ["users/login"],
    mutationFn: (data) => AuthService.login(data),
    onSuccess: async (data) => {
      callback(data);
    },
    onError: (error) => {
      const message = errorHandler(error);
      toast({
        variant: "destructive",
        title: "Incorrect data! Please try again",
        description: message,
      });
    },
  });

  return loginMutation;
};
