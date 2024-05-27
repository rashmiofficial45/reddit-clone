import React from "react";
import Link from "next/link";
import Image from "next/image";
import RedditLogo from "@/public/reddit-logo-new.svg";
import { Button } from "./ui/button";
import { ModeToggle } from "@/components/Toggle-mode";
import DropdownMenuBar from "@/components/DropdownMenuBar"
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";const NavBar = async() => {
  const {getUser} = getKindeServerSession();
  const user = await getUser() 
  console.log(user);

  return <nav className=" h-[10vh] w-full flex items-center border-b-2 px-5">
      <div>
        <Link href={"/"}>
          <Image
            src={RedditLogo}
            alt="Reddit-Icon"
            className="h-10 w-fit"
          ></Image>
        </Link>
      </div>
      <div className="ml-auto flex gap-5">
        <ModeToggle />
        {user ?<DropdownMenuBar userImage={user.picture} />
          : 
        <>
        <RegisterLink>
          <Button>Register</Button>
        </RegisterLink>
        <LoginLink>
          <Button>Login</Button>
        </LoginLink>
        </>
        }
      </div>
    </nav>
};

export default NavBar;
