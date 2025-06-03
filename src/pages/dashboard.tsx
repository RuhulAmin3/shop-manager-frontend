import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Store, LogOut, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { useGetProfileQuery, useLogoutMutation } from "@/store/authApi";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { resetUser } from "@/store/authSlice";

const Dashboard = () => {
  const { data, isLoading } = useGetProfileQuery();
  const [logoutMutation] = useLogoutMutation();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const currentUser = data?.data ?? user;

  const handleLogout = async () => {
    try {
      await logoutMutation().unwrap();
      toast("Logged out successfully");
      dispatch(resetUser());
      navigate("/signin");
    } catch (error) {
      navigate("/signin");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const handleShopClick = (shop: string) => {
    const shopUrl = `http://${shop.split(" ").join("-")}.localhost:5173/shop`;
    window.open(shopUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Shop Manager
            </h1>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                      {currentUser?.username?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem disabled className="opacity-70">
                  <Store className="mr-2 h-4 w-4" />
                  <span>My Shops</span>
                </DropdownMenuItem>
                {currentUser?.shopNames?.map((shop: string) => (
                  <DropdownMenuItem
                    key={shop}
                    onClick={() => handleShopClick(shop)}
                    className="flex items-center justify-between"
                  >
                    <span>{shop}</span>
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setShowLogoutDialog(true)}
                  className="text-red-600 focus:text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back!
          </h2>
          <p className="text-gray-600">
            Manage your shops and explore your business dashboard
          </p>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm text-center py-12">
          <CardContent>
            <Store className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Dashboard Ready
            </h3>
            <p className="text-gray-600">
              Your Shop is ready to business. Add shop management features as
              needed.
            </p>
          </CardContent>
        </Card>
      </main>

      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to log out?
            </AlertDialogTitle>
            <AlertDialogDescription>
              You will be redirected to the sign in page and will need to enter
              your credentials again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>
              Log out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Dashboard;
