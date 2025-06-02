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
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { useSignupMutation } from "@/store/authApi";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [shops, setShops] = useState<string[]>(["", "", ""]);
  const [signup, { isLoading }] = useSignupMutation();
  const navigate = useNavigate();

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return minLength && hasNumber && hasSpecialChar;
  };

  const addShopField = () => {
    setShops([...shops, ""]);
  };

  const removeShopField = (index: number) => {
    if (shops.length > 3) {
      const newShops = shops.filter((_, i) => i !== index);
      setShops(newShops);
    }
  };

  const updateShop = (index: number, value: string) => {
    const newShops = [...shops];
    newShops[index] = value;
    setShops(newShops);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!username.trim()) {
      toast("Username is required");
      return;
    }

    if (!validatePassword(password)) {
      toast(
        "Password must be at least 8 characters with at least one number and one special character"
      );
      return;
    }

    const validShops = shops.filter((shop) => shop.trim() !== "");
    if (validShops.length < 3) {
      toast("Please enter at least 3 shop names");
      return;
    }

    // Check for duplicate shop names
    const uniqueShops = [...new Set(validShops)];
    if (uniqueShops.length !== validShops.length) {
      toast("Shop names must be unique");
      return;
    }

    try {
      await signup({ username, email, password, shops: validShops }).unwrap();
      toast("Account created successfully!");
      navigate("/signin");
    } catch (error: any) {
      toast(error.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Create Account
          </CardTitle>
          <CardDescription>
            Join our platform and create your shops
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pr-10 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <p className="text-sm text-gray-600">
                At least 8 characters, one number, and one special character
              </p>
            </div>

            <div className="space-y-2">
              <Label>Shop Names (minimum 3)</Label>
              {shops.map((shop, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    type="text"
                    value={shop}
                    onChange={(e) => updateShop(index, e.target.value)}
                    placeholder={`Shop ${index + 1}`}
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  />
                  {shops.length > 3 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeShopField(index)}
                      className="shrink-0"
                    >
                      <X size={16} />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addShopField}
                className="w-full"
              >
                <Plus size={16} className="mr-2" />
                Add Another Shop
              </Button>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </Button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/signin")}
                className="text-blue-600 hover:underline font-medium"
              >
                Sign in
              </button>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupPage;
