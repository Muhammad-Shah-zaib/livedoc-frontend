import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, CheckCircle, ArrowLeft } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { forgotPasswordThunk } from "@/store/auth/authThunk";
import { useForm } from "react-hook-form";
import type { ForgetPassworPayload } from "@/store/auth/types";
import PageHeader from "../components/PageHeader";

export default function ForgotPasswordPage() {
  const { loading, isSuccess } = useAppSelector((state) => ({
    loading: state.auth.loading,
    isSuccess: state.auth.forgetPasswordSuccess,
  }));

  const dispatch = useAppDispatch();
  const generalError = useAppSelector((state) => state.auth.generalError);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ForgetPassworPayload>({
    mode: "onTouched",
  });

  const email = watch("email", "");

  const onSubmit = async (data: ForgetPassworPayload) => {
    try {
      await dispatch(forgotPasswordThunk(data));
      reset();
    } finally {
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen transition-all duration-300 bg-gradient-to-br from-slate-50 to-blue-50 dark:bg-slate-950">
        <div className="container mx-auto px-4 py-8">
          {/* Header with theme toggle */}
          <PageHeader />

          {/* Success Card */}
          <div className="max-w-md mx-auto">
            <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-semibold text-slate-800 dark:text-slate-200">
                  Email sent successfully
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
                  We've sent a password reset link to{" "}
                  <span className="font-medium text-slate-800 dark:text-slate-200">
                    {email}
                  </span>
                  . Please check your inbox and follow the instructions to reset
                  your password.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Instructions */}
                <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 space-y-2">
                  <h4 className="font-medium text-slate-800 dark:text-slate-200">
                    What to do next:
                  </h4>
                  <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                    <li>• Check your email inbox (and spam folder)</li>
                    <li>• Click the reset link in the email</li>
                    <li>• Create your new password</li>
                    <li>• Sign in with your new password</li>
                  </ul>
                </div>

                {/* Resend Button */}
                <Button
                  variant="outline"
                  className="w-full h-12 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200 bg-transparent"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Send another email
                </Button>

                {/* Back to Login */}
                <div className="text-center">
                  <Button
                    variant="link"
                    className="text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                  >
                    <NavLink to={"/login"} className={`flex items-center`}>
                      <ArrowLeft className="h-4 w-4 mr-1" />
                      Back to sign in
                    </NavLink>
                  </Button>
                </div>

                {/* Help text */}
                <div className="text-center text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Didn't receive the email? Check your spam folder or contact{" "}
                  <Button
                    variant="link"
                    className="p-0 h-auto text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                  >
                    support
                  </Button>{" "}
                  for help.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen transition-all duration-300 bg-gradient-to-br from-slate-50 to-blue-50 dark:bg-slate-950">
      <div className="container mx-auto px-4 py-8">
        {/* Header with theme toggle */}
        <PageHeader />

        {/* Forgot Password Form */}
        <div className="max-w-md mx-auto">
          <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-semibold text-slate-800 dark:text-slate-200">
                Forgot your password?
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
                No worries! Enter your email address and we'll send you a link
                to reset your password.
              </CardDescription>
              {generalError && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                  {generalError}
                </p>
              )}
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-slate-700 dark:text-slate-300"
                  >
                    Email address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Please enter a valid email address",
                      },
                    })}
                    className="h-12 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 transition-colors"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600 dark:text-red-400">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={!email || !!errors.email}
                  className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Sending Email...
                    </>
                  ) : (
                    <>
                      <Mail className="h-4 w-4 mr-2" />
                      Send Reset Email
                    </>
                  )}
                </Button>
              </form>

              {/* Help text */}
              <div className="text-center text-sm text-slate-500 mt-4 dark:text-slate-400 leading-relaxed">
                Remember your password?{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  <NavLink to={"/login"}>Sign in instead</NavLink>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
