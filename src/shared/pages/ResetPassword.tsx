import { useState } from "react";
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
import { Eye, EyeOff, Lock, CheckCircle } from "lucide-react";
import { NavLink, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { resetPasswordThunk } from "@/store/auth/authThunk";
import { useForm } from "react-hook-form";
import type { ResetPasswordPayload } from "@/store/auth/types";
import PageHeader from "../components/PageHeader";

export default function ResetPassword() {
  const { uid, token } = useParams();
  const dispatch = useAppDispatch();

  const generalError = useAppSelector((state) => state.auth.generalError);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ResetPasswordPayload>({
    defaultValues: {
      password: "",
      confirm_password: "",
      uid: uid,
      token: token,
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const password = watch("password", "");
  const confirm_password = watch("confirm_password", "");

  const isSuccess = useAppSelector((state) => state.auth.resetPasswordSuccess);

  const onSubmit = async (data: ResetPasswordPayload) => {
    await dispatch(resetPasswordThunk(data));
    reset();
  };

  if (isSuccess) {
    return (
      <div
        className={`min-h-screen transition-all duration-300 dark:bg-slate-950 bg-gradient-to-br from-slate-50 to-blue-50}`}
      >
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
                  Password Updated
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
                  Your password has been successfully updated. You can now sign
                  in with your new password.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Button className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium transition-all duration-200 shadow-lg hover:shadow-xl">
                  <NavLink to={"/login"}>Continue to Sign In</NavLink>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-all duration-300 dark:bg-slate-950 bg-gradient-to-br from-slate-50 to-blue-50}`}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header with theme toggle */}
        <PageHeader />

        {/* Reset Password Form */}
        <div className="max-w-md mx-auto">
          <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-semibold text-slate-800 dark:text-slate-200">
                Reset your password
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
                Enter your new password below. Make sure it's strong and secure.
              </CardDescription>

              {generalError && (
                <p className="text-red-600 text-mono font-bold text-sm mt-2">
                  {generalError}
                </p>
              )}
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Password Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-slate-700 dark:text-slate-300"
                  >
                    New Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your new password"
                      {...register("password", {
                        required: true,
                        minLength: 8,
                        validate: {
                          hasUpper: (v) => /[A-Z]/.test(v),
                          hasLower: (v) => /[a-z]/.test(v),
                          hasNumber: (v) => /\d/.test(v),
                          hasSpecial: (v) => /[!@#$%^&*(),.?":{}|<>]/.test(v),
                        },
                      })}
                      className="h-12 pr-12 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 transition-colors"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
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
                    <p className="text-xs text-red-600 mt-1">
                      Please check the password requirements.
                    </p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="confirm_password"
                    className="text-slate-700 dark:text-slate-300"
                  >
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirm_password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Re-enter your new password"
                      {...register("confirm_password", {
                        required: true,
                        validate: (value) =>
                          value === password ||
                          "Confirm password should match the password",
                      })}
                      className="h-12 pr-12 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 transition-colors"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
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
                  {errors.confirm_password?.message && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.confirm_password.message}
                    </p>
                  )}
                </div>

                {/* Password Requirements */}
                <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                  <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-2 text-sm">
                    Password requirements:
                  </h4>
                  <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                    <li
                      className={`flex items-center space-x-2 ${
                        password.length >= 8
                          ? "text-green-600 dark:text-green-400"
                          : ""
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          password.length >= 8
                            ? "bg-green-500"
                            : "bg-slate-300 dark:bg-slate-600"
                        }`}
                      ></div>
                      <span>At least 8 characters</span>
                    </li>
                    <li
                      className={`flex items-center space-x-2 ${
                        /[A-Z]/.test(password)
                          ? "text-green-600 dark:text-green-400"
                          : ""
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          /[A-Z]/.test(password)
                            ? "bg-green-500"
                            : "bg-slate-300 dark:bg-slate-600"
                        }`}
                      ></div>
                      <span>One uppercase letter</span>
                    </li>
                    <li
                      className={`flex items-center space-x-2 ${
                        /[a-z]/.test(password)
                          ? "text-green-600 dark:text-green-400"
                          : ""
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          /[a-z]/.test(password)
                            ? "bg-green-500"
                            : "bg-slate-300 dark:bg-slate-600"
                        }`}
                      ></div>
                      <span>One lowercase letter</span>
                    </li>
                    <li
                      className={`flex items-center space-x-2 ${
                        /\d/.test(password)
                          ? "text-green-600 dark:text-green-400"
                          : ""
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          /\d/.test(password)
                            ? "bg-green-500"
                            : "bg-slate-300 dark:bg-slate-600"
                        }`}
                      ></div>
                      <span>One number</span>
                    </li>
                    <li
                      className={`flex items-center space-x-2 ${
                        /[!@#$%^&*(),.?":{}|<>]/.test(password)
                          ? "text-green-600 dark:text-green-400"
                          : ""
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          /[!@#$%^&*(),.?":{}|<>]/.test(password)
                            ? "bg-green-500"
                            : "bg-slate-300 dark:bg-slate-600"
                        }`}
                      ></div>
                      <span>One special character</span>
                    </li>
                  </ul>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    !password ||
                    !confirm_password ||
                    !!errors.password ||
                    password.length < 8 ||
                    !/[A-Z]/.test(password) ||
                    !/[a-z]/.test(password) ||
                    !/\d/.test(password) ||
                    !/[!@#$%^&*(),.?":{}|<>]/.test(password)
                  }
                  className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Updating Password...
                    </>
                  ) : (
                    "Update Password"
                  )}
                </Button>

                {/* Back to Login */}
                <div className="text-center">
                  <Button
                    variant="link"
                    className="text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                  >
                    <NavLink to={"/login"} className={`flex items-center `}>
                      ← Back to sign in
                    </NavLink>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
