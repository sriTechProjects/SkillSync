import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { ArrowRight, BrainCircuit, Search, Users } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for featured categories
const featuredCategories = [
  "Technology & Coding",
  "Creative Arts",
  "Business & Marketing",
  "Lifestyle & Hobbies",
  "Languages",
  "Health & Wellness",
];

export function WelcomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <main className="flex-grow">
        {/* Section 1: Hero Section */}
        <section className="w-full py-20 md:py-32 bg-white">
          <div className="container mx-auto grid items-center justify-center gap-4 px-4 text-center md:gap-8 md:px-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                The New Economy of Skills
              </h1>
              <p className="mx-auto max-w-[700px] text-slate-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                SkillSync is a community where you can trade your expertise, learn new talents, and connect with passionate individuals—all without spending a dime.
              </p>
            </div>
            <Card className="w-full max-w-sm mx-auto">
              <CardHeader>
                <CardTitle>Get Started</CardTitle>
                <CardDescription>Join the community today.</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                {/* --- UPDATED BUTTONS --- */}
                <Button asChild size="lg">
                  <Link to="/login">Log In</Link>
                </Button>
                <Button variant="secondary" asChild size="lg">
                  <Link to="/register">Sign Up</Link>
                </Button>
                <div className="col-span-2">
                  <Button variant="ghost" asChild className="w-full">
                    <Link to="/dashboard">
                      Browse as Guest <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                {/* --- END OF UPDATES --- */}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 2: How It Works */}
        <section className="w-full py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">
              How It Works
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <BrainCircuit className="h-12 w-12 mb-4 text-slate-800" />
                <h3 className="text-xl font-bold">1. Offer a Skill</h3>
                <p className="text-slate-500">
                  Showcase your talents and earn credits for the skills you can teach or share with the community.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Search className="h-12 w-12 mb-4 text-slate-800" />
                <h3 className="text-xl font-bold">2. Find a Skill</h3>
                <p className="text-slate-500">
                  Browse our diverse marketplace to find the exact skill you want to learn, from coding to cooking.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Users className="h-12 w-12 mb-4 text-slate-800" />
                <h3 className="text-xl font-bold">3. Connect & Swap</h3>
                <p className="text-slate-500">
                  Use your credits to connect with experts and start your learning journey in a one-on-one session.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Featured Categories */}
        <section className="w-full py-20 md:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">
              Featured Categories
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
              {featuredCategories.map((category) => (
                <Card key={category} className="flex items-center justify-center p-6 hover:shadow-lg transition-shadow">
                  <h3 className="font-semibold text-center">{category}</h3>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="w-full py-6 px-4 md:px-6 border-t">
        <p className="text-sm text-slate-500 text-center">
          © {new Date().getFullYear()} SkillSync. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
