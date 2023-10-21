import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Icons } from "@/icons/icons";
import { Input } from "@/components/ui/input";
import axiosInstance from "@/api/axiosInstance";
import {
  formSchema,
  secondFormSchema,
  thirdFormSchema,
} from "@/validators/recovery";

export default function Recovery() {
  const [isFirstFormSubmitted, setIsFirstFormSubmitted] = useState(false);
  const [isSecondFormSubmitted, setIsSecondFormSubmitted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  const [inputEmail, setInputEmail] = useState<{ email: string }>({
    email: "",
  });

  const navigate = useNavigate();

  function startTimer() {
    setIsTimeRunning(true);
    setTimer(60);
  }

  function stopTimer() {
    setIsTimeRunning(false);
  }

  useEffect(() => {
    let countdown: NodeJS.Timeout | null = null;

    if (isTimeRunning && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => {
      if (countdown) clearInterval(countdown);
    };
  }, [timer, isTimeRunning]);

  type formSchemaProps = z.infer<typeof formSchema>;
  type secondFormSchemaProps = z.infer<typeof secondFormSchema>;
  type thirdFormSchemaProps = z.infer<typeof thirdFormSchema>;

  const form = useForm<formSchemaProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const secondForm = useForm<secondFormSchemaProps>({
    resolver: zodResolver(secondFormSchema),
    defaultValues: {
      otpCode: "",
    },
  });

  const thirdForm = useForm<thirdFormSchemaProps>({
    resolver: zodResolver(thirdFormSchema),
    defaultValues: {
      newPassword: "",
    },
  });

  async function onSubmit(values: formSchemaProps) {
    try {
      if (!values.email) {
        setIsFirstFormSubmitted(true);
        return null; // Return null when email is not provided
      }

      setInputEmail(values); // Store the email value

      await axiosInstance.post("/api/recovery/send-otp", values, {
        withCredentials: true,
      });

      toast.success("Please check your email for further instructions.");
      setIsFirstFormSubmitted(true);
      startTimer();
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      toast.error(error!.response.data.error);
    }
  }
  async function handleRegenerateOTP() {
    if (timer === 0 && !isSecondFormSubmitted) {
      await onSubmit(inputEmail); // Await the onSubmit function here
    }
  }

  async function onSubmitSecond(values: secondFormSchemaProps) {
    try {
      await axiosInstance.post("/api/recovery/verify-otp", values, {
        withCredentials: true,
      });

      toast.success("OTP verification successful!");
      setIsSecondFormSubmitted(true);
      stopTimer();
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      toast.error(error!.response.data.error);
    }
  }

  async function onSubmitThird(values: thirdFormSchemaProps) {
    try {
      await axiosInstance.post("/api/recovery/password-reset", values, {
        withCredentials: true,
      });

      toast.success("Password reset successful!");
      navigate("/auth/log-in");
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      toast.error(error!.response.data.error);
    }
  }

  const isFirstLoading = form.formState.isSubmitting;
  const isSecondLoading = secondForm.formState.isSubmitting;
  const isThirdLoading = thirdForm.formState.isSubmitting;

  return (
    <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        to="/auth/log-in"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8"
        )}
      >
        Log In
      </Link>
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          Blogpedia
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;It will float like a cloud, like a man.&rdquo;
            </p>
            <footer className="text-sm">Ye Lin Ko</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center mt-48 md:mt-0">
            <h1 className="text-2xl font-semibold tracking-tight">
              Recover your account
            </h1>
            {!isFirstFormSubmitted && (
              <p className="text-sm text-muted-foreground">
                Enter your email below to recover your account
              </p>
            )}
            {isFirstFormSubmitted && !isSecondFormSubmitted && (
              <p className="text-sm text-muted-foreground">
                Check your email Box to enter OTP code
              </p>
            )}
            {isSecondFormSubmitted && (
              <p className="text-sm text-muted-foreground">
                Enter a new password below to recover your account
              </p>
            )}
          </div>
          <div className={cn("grid gap-6")}>
            {!isFirstFormSubmitted && timer === 0 ? (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-2"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="email"
                            {...field}
                            disabled={isFirstLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    className="w-full"
                    type="submit"
                    disabled={isFirstLoading}
                  >
                    {isFirstLoading ? (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    Continue
                  </Button>
                </form>
              </Form>
            ) : null}
          </div>
          {isFirstFormSubmitted && !isSecondFormSubmitted ? (
            <>
              <div>
                This OTP code will be valid for{" "}
                <p className="text-red-500 inline-block">{timer} seconds</p>
              </div>
              <div className={cn("grid gap-6")}>
                <Form {...secondForm}>
                  <form
                    onSubmit={secondForm.handleSubmit(onSubmitSecond)}
                    className="space-y-2"
                  >
                    <FormField
                      control={secondForm.control}
                      name="otpCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>OTP</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="OTP"
                              {...field}
                              disabled={isSecondLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {timer === 0 && !isSecondFormSubmitted ? (
                      <Button
                        className="w-full"
                        type="button"
                        disabled={isFirstLoading}
                        onClick={handleRegenerateOTP}
                      >
                        {isFirstLoading ? (
                          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        ) : null}
                        Resend OTP
                      </Button>
                    ) : (
                      <Button
                        className="w-full"
                        type="submit"
                        disabled={isSecondLoading}
                      >
                        {isSecondLoading ? (
                          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        ) : null}
                        Continue
                      </Button>
                    )}
                  </form>
                </Form>
              </div>
            </>
          ) : null}
          {isSecondFormSubmitted ? (
            <div className={cn("grid gap-6")}>
              <Form {...thirdForm}>
                <form
                  onSubmit={thirdForm.handleSubmit(onSubmitThird)}
                  className="space-y-2"
                >
                  <FormField
                    control={thirdForm.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter new password"
                            {...field}
                            disabled={isThirdLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    className="w-full"
                    type="submit"
                    disabled={isThirdLoading}
                  >
                    {isThirdLoading ? (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    Continue
                  </Button>
                </form>
              </Form>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
