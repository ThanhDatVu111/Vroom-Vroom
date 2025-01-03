import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import React from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

function Header() {
  const { user, isSignedIn } = useUser();
  return (
    <div className="flex justify-between items-center shadow-sm p-5">
      <Link to={"/"}>
        <img src="/logo.svg" width={150} height={100} />
      </Link>
      <ul className="hidden  md:flex gap-16">
        <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">
          <Link to="/">Home</Link>
        </li>
        <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">
          <Link to="/search">Search</Link>
        </li>
      </ul>

      {isSignedIn === undefined ? (
        <div className="flex items-center gap-5 hover:bg-transparent hover:text-[#6f0320]">
          <UserButton />
          <Link to={"/profile"}>
            <Button>Please Log In</Button>
          </Link>
        </div>
      ) : (
        <SignInButton mode="modal" fallbackRedirectUrl="/profile">
          <Link to={"/add-listing"}>
            <Button>Submit Listing</Button>
          </Link>
        </SignInButton>
      )}
    </div>
  );
}

export default Header;