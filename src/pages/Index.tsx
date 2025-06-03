import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Store, Users, Shield, Zap } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Shop Manager
            </h1>

            <div className="flex gap-4">
              <Button variant="outline" onClick={() => navigate("/signin")}>
                Sign In
              </Button>
              <Button
                onClick={() => navigate("/signup")}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Manage Your Shops with{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Ease
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Create, manage, and access multiple shops from a single dashboard.
            Each shop gets its own dedicated space with secure authentication.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate("/signup")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Create Your Account
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/signin")}
            >
              Sign In
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-200">
            <CardHeader>
              <div className="p-2 bg-blue-100 rounded-lg w-fit">
                <Store className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>Multiple Shops</CardTitle>
              <CardDescription>
                Create and manage multiple shops from one account
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-200">
            <CardHeader>
              <div className="p-2 bg-purple-100 rounded-lg w-fit">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>Easy Management</CardTitle>
              <CardDescription>
                Intuitive dashboard to oversee all your business operations
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-200">
            <CardHeader>
              <div className="p-2 bg-green-100 rounded-lg w-fit">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>Secure Access</CardTitle>
              <CardDescription>
                Advanced authentication with session management
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-200">
            <CardHeader>
              <div className="p-2 bg-orange-100 rounded-lg w-fit">
                <Zap className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle>Quick Setup</CardTitle>
              <CardDescription>
                Get your shops up and running in minutes
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="py-12">
              <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of shop owners who trust our platform
              </p>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => navigate("/signup")}
              >
                Create Your Free Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
