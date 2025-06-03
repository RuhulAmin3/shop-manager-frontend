import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Store, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthCheck } from "@/hooks/useAuthCheck";

const ShopPage = () => {
  const { checking, authorized } = useAuthCheck();
  const [shopName, setShopName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const hostname = window.location.hostname;
    const subdomain = hostname.split(".")[0];

    if (hostname.includes("localhost") && subdomain !== "localhost") {
      setShopName(subdomain);
    } else {
      const urlParams = new URLSearchParams(window.location.search);
      const shopParam = urlParams.get("shop");
      if (shopParam) {
        setShopName(shopParam);
      }
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm shadow-xl">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Verifying authentication...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-red-600">
              Authentication Required
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-4">
              You need to be logged in to access this shop.
            </p>
            <Button
              onClick={() => navigate("/signin")}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
            >
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/dashboard")}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {shopName || "Shop"} Store
            </h1>
            <div className="w-24"></div> {/* Spacer for center alignment */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="bg-white/80 backdrop-blur-sm shadow-xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
                <Store className="h-12 w-12 text-white" />
              </div>
            </div>
            <CardTitle className="text-4xl font-bold text-gray-900 mb-2">
              This is {shopName || "the"} shop
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center py-12">
            <p className="text-xl text-gray-600 mb-8">
              Welcome to the {shopName || "shop"} dashboard! This is where you
              can manage your store.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold text-blue-800 mb-2">Products</h3>
                  <p className="text-blue-600 text-sm">Manage your inventory</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold text-purple-800 mb-2">Orders</h3>
                  <p className="text-purple-600 text-sm">Track your sales</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold text-green-800 mb-2">
                    Analytics
                  </h3>
                  <p className="text-green-600 text-sm">View performance</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ShopPage;
