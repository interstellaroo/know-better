"use client"
import Link from "next/link";
import Logo from "../logo";
import { Button } from "../ui/button";
import NavMenu from "./nav-menu";
import ThemeToggle from "./theme-toggle";
import { Avatar, AvatarImage } from "../ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { useAuth } from "../auth/auth-context";

const Navbar = () => {
  const { user } = useAuth()

  return (
    <nav className="h-16 bg-background border-b border-acccent">
      <div className="h-full flex items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6">
        <Logo />

        <NavMenu />
        {user ? (
          <div>
            <Avatar>
              <AvatarImage></AvatarImage>
              <AvatarFallback>FN</AvatarFallback>
            </Avatar>
            </div>
        ) : (
          <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button variant="outline" className="hidden sm:inline-flex">
            <Link href="/login">Sign In</Link>
          </Button>
          <Button className="xs:inline-flex">
            <Link href="/register">Get Started</Link>
          </Button>
        </div>
        )

        }
      </div>
    </nav>
  );
};

export default Navbar;
