import { toast } from "@/components/ui/use-toast";
import { AuthService } from "@/services/AuthService";
import { useMutation } from "@tanstack/react-query";

export const useForgetPassword = (callback) => {
  const loginMutation = useMutation({
    mutationKey: ["users/password"],
    mutationFn: (data) => AuthService.forgetPassword(data),
    onSuccess: async (data) => {
      callback(data);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Incorrect data! Please try again",
      });
    },
  });

  return loginMutation;
};

export const useResetPassword = (callback) => {
  const loginMutation = useMutation({
    mutationKey: ["users/password-reset"],
    mutationFn: (token, body) => AuthService.resetPassword(token, body),
    onSuccess: async (data) => {
      callback(data);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error! Reset link is not valid!",
      });
    },
  });

  return loginMutation;
};

export const useChangePassword = (callback) => {
  const loginMutation = useMutation({
    mutationKey: ["users/password-change"],
    mutationFn: (data) => AuthService.changePassword(data),
    onSuccess: async (data) => {
      callback(data);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: error.response.data.message,
      });
    },
  });

  return loginMutation;
};
