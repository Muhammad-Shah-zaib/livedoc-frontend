"use client";

import { useEffect, useState } from "react";
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

import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { emailPasswordSignupThunk } from "@/store/auth/authThunk";
import { clearAuthErrors } from "@/store/auth/authSlice";
import { useForm, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import type { EmailPasswordSignupPayload } from "@/store/auth/types";

import { NavLink, useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const loading = useAppSelector((state) => state.auth.loading);
  const navigate = useNavigate();
  const fieldErrors = useAppSelector((state) => state.auth.errors);
  const generalError = useAppSelector((state) => state.auth.generalError);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearAuthErrors());
  }, [dispatch]);

  type SignupFormInputs = EmailPasswordSignupPayload & {
    terms: boolean;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<SignupFormInputs>({
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<SignupFormInputs> = (data) => {
    dispatch(emailPasswordSignupThunk(data));
  };



  return (
    <div
      className={`min-h-screen transition-all duration-300 bg-white dark:bg-slate-950`}
    >
      <div className="container mx-auto px-4 py-8">
        <PageHeader />

        <div className="max-w-md mx-auto">
          <Card className="relative border-0 shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">

            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-semibold text-slate-800 dark:text-slate-200">
                Create your account
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Get started with DocFlow today
              </CardDescription>
              {generalError && (
                <span className="text-xs text-red-500 block mt-2">
                  {generalError}
                </span>
              )}
            </CardHeader>
            <CardContent className="space-y-6">


              <form
                className="space-y-4"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="first_name"
                      className="text-slate-700 dark:text-slate-300"
                    >
                      First name
                    </Label>
                    <Input
                      id="first_name"
                      placeholder="John"
                      disabled={loading}
                      className="h-12 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 transition-colors"
                      {...register("first_name", {
                        required: "First name is required",
                      })}
                    />
                    {fieldErrors?.first_name?.[0] ? (
                      <span className="text-xs text-red-500">
                        {fieldErrors.first_name[0]}
                      </span>
                    ) : errors.first_name ? (
                      <span className="text-xs text-red-500">
                        {errors.first_name.message}
                      </span>
                    ) : null}
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="last_name"
                      className="text-slate-700 dark:text-slate-300"
                    >
                      Last name
                    </Label>
                    <Input
                      id="last_name"
                      placeholder="Doe"
                      disabled={loading}
                      className="h-12 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 transition-colors"
                      {...register("last_name", {
                        required: "Last name is required",
                      })}
                    />
                    {fieldErrors?.last_name?.[0] ? (
                      <span className="text-xs text-red-500">
                        {fieldErrors.last_name[0]}
                      </span>
                    ) : errors.last_name ? (
                      <span className="text-xs text-red-500">
                        {errors.last_name.message}
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-slate-700 dark:text-slate-300"
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    disabled={loading}
                    className="h-12 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 transition-colors"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email address",
                      },
                    })}
                  />
                  {fieldErrors?.email?.[0] ? (
                    <span className="text-xs text-red-500">
                      {fieldErrors.email[0]}
                    </span>
                  ) : errors.email ? (
                    <span className="text-xs text-red-500">
                      {errors.email.message}
                    </span>
                  ) : null}
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
                      placeholder="********"
                      disabled={loading}
                      className="h-12 pr-12 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 transition-colors"
                      {...register("password", {
                        required: "Password is required",
                        pattern: {
                          value:
                            /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
                          message:
                            "Password must be at least 8 characters, include one uppercase and one special character",
                        },
                      })}
                    />

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      disabled={loading}
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
                  {fieldErrors?.password?.[0] ? (
                    <span className="text-xs text-red-500">
                      {fieldErrors.password[0]}
                    </span>
                  ) : errors.password ? (
                    <span className="text-xs text-red-500">
                      {errors.password.message}
                    </span>
                  ) : null}
                </div>
                <div className="flex items-start space-x-3">
                  <Controller
                    name="terms"
                    control={control}
                    rules={{ required: "You must agree to the terms" }}
                    render={({ field }) => (
                      <Checkbox
                        id="terms"
                        className="mt-1"
                        disabled={loading}
                        checked={field.value ? true : false}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                  <Label
                    htmlFor="terms"
                    className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed"
                  >
                    I agree to the{" "}
                    <Button
                      variant="link"
                      className="p-0 h-auto text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                    >
                      Terms of Service
                    </Button>{" "}
                    and{" "}
                    <Button
                      variant="link"
                      className="p-0 h-auto text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                    >
                      Privacy Policy
                    </Button>
                  </Label>
                </div>
                {fieldErrors?.terms?.[0] ? (
                  <span className="text-xs text-red-500 block ml-8">
                    {fieldErrors.terms[0]}
                  </span>
                ) : errors.terms ? (
                  <span className="text-xs text-red-500 block ml-8">
                    {errors.terms.message}
                  </span>
                ) : null}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin h-4 w-4 mr-2" />
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>
              <div className="text-center text-sm text-slate-600 dark:text-slate-400">
                Already have an account?{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  <NavLink to={"/login"}>Sign in</NavLink>
                </Button>
              </div>
              <div className="text-center mt-2">
                <Button
                  variant="link"
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                  onClick={() => navigate("/about-us")}
                  disabled={loading}
                >
                  Explore About Us
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
