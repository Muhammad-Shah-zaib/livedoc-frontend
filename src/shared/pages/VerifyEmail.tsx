import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Moon, Sun, Mail, CheckCircle, RefreshCw } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { serVerifyEmailRequired } from "@/store/auth/authSlice";

export default function VerifyEmail() {
  const [isDark, setIsDark] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [emailResent, setEmailResent] = useState(false);

  // states from redux
  const is_email_verification_required = useAppSelector(
    (state) => state.auth.email_verification_required
  );
  // dispatch
  const dispatch = useAppDispatch();

  // router hooks
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/signup");
  }, [is_email_verification_required]);

  const handleResendEmail = async () => {
    setIsResending(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsResending(false);
    setEmailResent(true);
    // Reset the success message after 3 seconds
    setTimeout(() => setEmailResent(false), 3000);
  };

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        isDark
          ? "dark bg-slate-950"
          : "bg-gradient-to-br from-slate-50 to-blue-50"
      }`}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header with theme toggle */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg"></div>
            <span className="text-xl font-semibold text-slate-800 dark:text-slate-200">
              DocFlow
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDark(!isDark)}
            className="rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            {isDark ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Verification Card */}
        <div className="max-w-md mx-auto">
          <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-semibold text-slate-800 dark:text-slate-200">
                Check your email
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
                A verification email has been sent to your email address. Please
                check your inbox and click the verification link to activate
                your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Success message for resent email */}
              {emailResent && (
                <div className="flex items-center space-x-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <span className="text-sm text-green-700 dark:text-green-300">
                    Verification email sent successfully!
                  </span>
                </div>
              )}

              {/* Instructions */}
              <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 space-y-2">
                  <h4 className="font-medium text-slate-800 dark:text-slate-200">
                    What to do next:
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Check your email inbox (and spam folder)</li>
                    <li>• Click the verification link in the email</li>
                    <li>• Return here to sign in to your account</li>
                  </ul>
                </div>
              </div>

              {/* Resend Email Button */}
              <Button
                onClick={handleResendEmail}
                disabled={isResending || emailResent}
                variant="outline"
                className="w-full h-12 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200 bg-transparent"
              >
                {isResending ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : emailResent ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Email Sent
                  </>
                ) : (
                  <>
                    <Mail className="h-4 w-4 mr-2" />
                    Resend verification email
                  </>
                )}
              </Button>

              {/* Back to Login */}
              <div className="text-center">
                <Button
                  variant="link"
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                >
                  <NavLink
                    to="/login"
                    onClick={() => {
                      dispatch(serVerifyEmailRequired(false));
                    }}
                  >
                    ← Back to sign in
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
