"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setIsAppInitialized } from "@/store/documents/documentSlice";

export default function AppBootstrap() {
  // states from redux store
  const { initialAuthChecked, initialDocumentFetch } = useAppSelector(
    (state) => ({
      initialAuthChecked: state.auth.initialAuthChecked,
      initialDocumentFetch: state.documents.initialDocumentFetch,
    })
  );

  const dispatch = useAppDispatch();

  const [isDark, setIsDark] = useState(false);
  const [loadingText, setLoadingText] = useState("Checking authentication...");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress and message logic based on Redux state
    if (!initialAuthChecked) {
      setProgress(20);
      setLoadingText("Checking authentication...");
      return;
    }
    if (initialAuthChecked && !initialDocumentFetch) {
      setProgress(60);
      setLoadingText("Setting up your workspace...");
      return;
    }
    if (initialAuthChecked && initialDocumentFetch) {
      setProgress(100);
      setLoadingText("Almost ready...");
      // Simulate redirect after loading completes
      const timeout = setTimeout(() => {
        setLoadingText("Redirecting to dashboard...");
        setTimeout(() => {
          dispatch(setIsAppInitialized(true));
        }, 100);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [initialAuthChecked, initialDocumentFetch]);

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
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg animate-pulse"></div>
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

        {/* Loading Card */}
        <div className="max-w-md mx-auto">
          <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              {/* Animated Logo */}
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>

              {/* Loading Text */}
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
                Welcome back!
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-8 transition-all duration-300">
                {loadingText}
              </p>

              {/* Progress Bar */}
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mb-6 overflow-hidden">
                <div
                  className="h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              {/* Animated Dots */}
              <div className="flex justify-center space-x-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>

              {/* Status Indicators */}
              <div className="mt-8 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">
                    Authentication
                  </span>
                  <div className="flex items-center space-x-2">
                    {progress >= 20 ? (
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    ) : (
                      <div className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full animate-pulse"></div>
                    )}
                    <span
                      className={`text-xs ${
                        progress >= 20
                          ? "text-green-600 dark:text-green-400"
                          : "text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      {progress >= 20 ? "Verified" : "Checking..."}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">
                    Session
                  </span>
                  <div className="flex items-center space-x-2">
                    {progress >= 40 ? (
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    ) : (
                      <div className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full animate-pulse"></div>
                    )}
                    <span
                      className={`text-xs ${
                        progress >= 40
                          ? "text-green-600 dark:text-green-400"
                          : "text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      {progress >= 40 ? "Valid" : "Validating..."}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">
                    Profile
                  </span>
                  <div className="flex items-center space-x-2">
                    {progress >= 60 ? (
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    ) : (
                      <div className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full animate-pulse"></div>
                    )}
                    <span
                      className={`text-xs ${
                        progress >= 60
                          ? "text-green-600 dark:text-green-400"
                          : "text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      {progress >= 60 ? "Loaded" : "Loading..."}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">
                    Workspace
                  </span>
                  <div className="flex items-center space-x-2">
                    {progress >= 80 ? (
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    ) : (
                      <div className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full animate-pulse"></div>
                    )}
                    <span
                      className={`text-xs ${
                        progress >= 80
                          ? "text-green-600 dark:text-green-400"
                          : "text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      {progress >= 80 ? "Ready" : "Setting up..."}
                    </span>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-8 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  We're securely verifying your identity and preparing your
                  personalized workspace. This usually takes just a few seconds.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Background Animation */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
