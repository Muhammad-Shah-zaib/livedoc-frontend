import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Lock, Sparkles } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { NavLink } from "react-router-dom";
import { ContactUsDialog } from "../components/ContactUsDialogue";
import { features } from "@/Data/features";
import { stats } from "@/Data/stats";

export default function AboutPage() {
  return (
    <div
      className={`min-h-screen transition-all duration-300 bg-white dark:bg-slate-950`}
    >
      {/* Header */}
      <PageHeader
        sticky
        rightActions={
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
            <NavLink to={"/"}>Get Started</NavLink>
          </Button>
        }
      />
      <div className="container mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <Badge className="mb-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 px-4 py-2">
            <Sparkles className="h-4 w-4 mr-2" />
            The Future of Collaboration
          </Badge>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 dark:from-slate-100 dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent mb-8 leading-tight">
            Write.
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Collaborate.
            </span>
            <br />
            Create.
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-4xl mx-auto leading-relaxed mb-12">
            DocFlow is the next-generation collaborative document editor that
            brings teams together in real-time. Create, edit, and share
            documents with unprecedented speed and security.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-lg px-8 py-4 h-auto shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <NavLink to={"/"}>Start Creating</NavLink>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm text-center p-6 hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-600 dark:text-slate-400 font-medium">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Purpose Section */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-slate-200 mb-8">
            Why DocFlow Exists
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              In today's fast-paced world, teams need tools that keep up with
              their creativity and collaboration needs. Traditional document
              editors fall short when it comes to real-time teamwork, version
              control, and seamless sharing.
            </p>
            <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800 p-8">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
                  Our Mission
                </h3>
                <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                  To empower teams worldwide with the most intuitive, powerful,
                  and secure collaborative document editing experience. We
                  believe that great ideas emerge when people can work together
                  without barriers, and that's exactly what DocFlow delivers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-slate-200 mb-6">
              Powerful Features
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Everything you need to create, collaborate, and share documents
              with your team, all in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group border-0 shadow-lg hover:shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2"
              >
                <CardContent className="p-8">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-slate-200 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Get started in minutes with our intuitive workflow designed for
              modern teams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">
                Create & Write
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Start with a blank document or choose from our templates. Write
                with our powerful, distraction-free editor.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">
                Invite & Collaborate
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Share secure tokens with your team. Watch as everyone
                contributes in real-time with live cursors and instant updates.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">
                Share
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Set the document live so that everyone can see it. Share
                effortlessly with a unique share link.
              </p>
            </div>
          </div>
        </div>

        {/* Security & Trust Section */}
        <Card className="border-0 shadow-xl bg-gradient-to-r from-slate-900 to-blue-900 dark:from-slate-800 dark:to-blue-800 text-white mb-20">
          <CardContent className="p-12 text-center">
            <Lock className="h-16 w-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Designed with Privacy in Mind
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
              Your documents are protected with authenticated access and secure
              data handling. We follow modern security best practices to ensure
              your content is safe — even in this early version.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-center justify-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Private by Default</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Secure Sharing Links</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>End-to-End Principles</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-slate-200 mb-6">
            Ready to Transform Your Workflow?
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-12">
            Join thousands of teams who have already revolutionized their
            document collaboration with DocFlow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-lg px-12 py-4 h-auto shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <NavLink to={"/"}>Get Started</NavLink>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <ContactUsDialog />
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-40 w-80 h-80 bg-gradient-to-r from-blue-400/10 to-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-40 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-3/4 left-1/4 w-40 h-40 bg-gradient-to-r from-green-400/10 to-blue-600/10 rounded-full blur-2xl"></div>
      </div>
    </div>
  );
}
