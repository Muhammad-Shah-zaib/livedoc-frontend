import { useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
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
import { Separator } from "@/components/ui/separator";
import { Moon, Eye, EyeOff, Loader2 } from "lucide-react";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  emailPasswordLoginThunk,
  googleLoginThunk,
} from "@/store/auth/authThunk";
import Spinner from "../components/spinner";
import type { EmailPasswordLoginPayload } from "@/store/auth/types";
import { NavLink, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const generalError = useAppSelector((state) => state.auth.generalError);
  const isLoading = useAppSelector((state) => state.auth.loading);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailPasswordLoginPayload>();

  const handleGoogleLoginSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    dispatch(googleLoginThunk(credentialResponse));
  };

  // Placeholder for form submit
  const onSubmit: SubmitHandler<EmailPasswordLoginPayload> = (data) => {
    dispatch(emailPasswordLoginThunk(data));
  };

  return (
    <div className="min-h-screen transition-all duration-300 dark:bg-slate-950 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg" />
            <span className="text-xl font-semibold text-slate-800 dark:text-slate-200">
              DocFlow
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <Moon className="h-5 w-5" />
          </Button>
        </div>

        {/* Login Card */}
        <div className="max-w-md mx-auto">
          <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm overflow-hidden relative">
            {isLoading && <Spinner />}
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-semibold text-slate-800 dark:text-slate-200">
                Welcome back
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Sign in to your account to continue
                <br />
                <br />
                {generalError && (
                  <span className="text-red-500">{generalError}</span>
                )}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Google Login */}
              <div className="space-y-3">
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onError={() => {}}
                />
              </div>

              <div className="relative">
                <Separator className="bg-slate-200 dark:bg-slate-700" />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-900 px-3 text-sm text-slate-500 dark:text-slate-400">
                  or
                </span>
              </div>

              {/* Email/Password Form */}
              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-slate-700 dark:text-slate-300"
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="text" // was "email", changed to "text" for custom validation
                    placeholder="Enter your email"
                    disabled={isLoading}
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
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-slate-700 dark:text-slate-300"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      disabled={isLoading}
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message:
                            "Password must be at least 6 characters long",
                        },
                      })}
                      className="h-12 pr-12 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 transition-colors"
                    />

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      disabled={isLoading}
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-slate-200 dark:hover:bg-slate-700"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
                >
                  {isLoading && (
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                  )}
                  Sign In
                </Button>
              </form>

              {/* Links */}
              <div className="text-center">
                <Button
                  variant="link"
                  disabled={isLoading}
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                >
                  <NavLink to="/forget-password">Forgot your password?</NavLink>
                </Button>
              </div>

              <div className="text-center text-sm text-slate-600 dark:text-slate-400">
                Don't have an account?{" "}
                <Button
                  variant="link"
                  disabled={isLoading}
                  className="p-0 h-auto font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  <NavLink to="/signup">Sign up</NavLink>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
