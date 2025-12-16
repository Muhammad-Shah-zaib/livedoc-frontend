"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setIsAppInitialized } from "@/store/documents/documentSlice";
import PageHeader from "@/shared/components/PageHeader";
import "./AppBootstrap.css";

export default function AppBootstrap() {
  const { initialAuthChecked, initialDocumentFetch } = useAppSelector(
    (state) => ({
      initialAuthChecked: state.auth.initialAuthChecked,
      initialDocumentFetch: state.documents.initialDocumentFetch,
    })
  );
  const dispatch = useAppDispatch();

  const [loadingText, setLoadingText] = useState("Checking authentication...");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
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
      className={`min-h-screen transition-all duration-300 bg-white dark:bg-slate-950`}
    >
      <div className="container mx-auto px-4 py-8">
        <PageHeader />

        <div className="max-w-md mx-auto">
          <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <div className="book-scene">
                <div className="book-container">
                  <div className="book">
                    <div className="book-cover book-cover-front">
                      <div className="book-cover-content">
                        <div className="book-logo">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="16" y1="13" x2="8" y2="13" />
                            <line x1="16" y1="17" x2="8" y2="17" />
                            <polyline points="10 9 9 9 8 9" />
                          </svg>
                        </div>
                        <span className="book-title">LiveDoc</span>
                      </div>
                    </div>
                    <div className="book-cover book-cover-back"></div>
                    <div className="book-spine"></div>
                    <div className="book-page book-page-1">
                      <div className="page-lines">
                        <div className="page-line"></div>
                        <div className="page-line"></div>
                        <div className="page-line"></div>
                        <div className="page-line short"></div>
                      </div>
                    </div>
                    <div className="book-page book-page-2">
                      <div className="page-lines">
                        <div className="page-line"></div>
                        <div className="page-line short"></div>
                        <div className="page-line"></div>
                        <div className="page-line"></div>
                      </div>
                    </div>
                    <div className="book-page book-page-3">
                      <div className="page-lines">
                        <div className="page-line short"></div>
                        <div className="page-line"></div>
                        <div className="page-line"></div>
                        <div className="page-line short"></div>
                      </div>
                    </div>
                    <div className="book-page book-page-4"></div>
                    <div className="book-page book-page-5"></div>
                  </div>
                  <div className="book-shadow"></div>
                </div>
              </div>

              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
                Welcome back!
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-8 transition-all duration-300">
                {loadingText}
              </p>

              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mb-6 overflow-hidden">
                <div
                  className="h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

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
                      className={`text-xs ${progress >= 20
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
                      className={`text-xs ${progress >= 40
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
                      className={`text-xs ${progress >= 60
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
                      className={`text-xs ${progress >= 80
                          ? "text-green-600 dark:text-green-400"
                          : "text-slate-500 dark:text-slate-400"
                        }`}
                    >
                      {progress >= 80 ? "Ready" : "Setting up..."}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  We're securely verifying your identity and preparing your
                  personalized workspace. This usually takes just a few seconds.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

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
