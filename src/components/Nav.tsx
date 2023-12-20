"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaCompass } from "react-icons/fa";

export default function Nav() {
  const { user, isLoaded } = useUser();
  const pathname = usePathname(); // this is the current path

  const homeNav = [{ text: "Sign In", href: "/sign-in" }];

  const signInNav = [{ text: "Sign Up", href: "/sign-up" }];

  const signUpNav = [{ text: "Sign In", href: "/sign-in" }];

  //   function to select nav based on current path
  const getNavItems = () => {
    switch (pathname) {
      case "/":
        return homeNav;
      case "/sign-in":
        return signInNav;
      case "/sign-up":
        return signUpNav;
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <header>
      <nav className="flex items-center justify-between p-6 lg:px-8 h-20 border border-t-0 border-r-0 border-l-0 border-b-zinc-900">
        <div className="flex lg:flex-1">
          <Link
            href="/"
            className="-m-1.5 p-1.5 font-bold flex items-center gap-2"
          >
            <FaCompass className="text-xl" /> Jobtrackr
          </Link>
        </div>
        <div>
          {
            // map over nav items and render them
            navItems.map((link) => (
              <Link
                href={link.href}
                key={link.href}
                className="hover:text-[#1cafb0]"
              >
                {link.text}
              </Link>
            ))
          }
        </div>
        {isLoaded && user && (
          <>
            <p className="mr-3">
              {user.primaryEmailAddress?.emailAddress.split("@")[0] || ""}
            </p>
            <UserButton afterSignOutUrl="/sign-in" />
          </>
        )}
      </nav>
    </header>
  );
}
