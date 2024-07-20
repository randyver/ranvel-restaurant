// src/components/Navbar.tsx
import { useSession, signOut } from "next-auth/react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
  const { data: session } = useSession(); // Access the session state

  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex items-center justify-between px-6">
        <div className="text-2xl font-bold">
          <a href="/" className="hover:text-gray-300">Brand</a>
        </div>
        <NavigationMenu>
          <NavigationMenuList className="flex space-x-4">
            {session ? (
              <>
                {/* Links for logged-in users */}
                <NavigationMenuItem>
                  <NavigationMenuLink href="/home" className="hover:text-gray-300">Home</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/menu" className="hover:text-gray-300">Menu</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/order-history" className="hover:text-gray-300">History</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/cart" className="hover:text-gray-300">Cart</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/about" className="hover:text-gray-300">Profile</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <button
                    onClick={() => signOut()}
                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Logout
                  </button>
                </NavigationMenuItem>
              </>
            ) : (
              <>
                {/* Links for guests */}
                <NavigationMenuItem>
                  <NavigationMenuLink href="/login" className="hover:text-gray-300">Login</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/home" className="hover:text-gray-300">Home</NavigationMenuLink>
                </NavigationMenuItem>
              </>
            )}
          </NavigationMenuList>
          <NavigationMenuIndicator />
        </NavigationMenu>
      </div>
    </header>
  );
}
