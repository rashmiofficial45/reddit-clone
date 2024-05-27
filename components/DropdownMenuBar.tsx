import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import {
  LogOut,
  User,
  Menu,
  SquareChevronRight,
  StickyNote,
  Settings,
} from "lucide-react";
import userIcon from "@/public/user.png";
import Link from "next/link";
interface ProfileImage {
  userImage: string | null;
}
const userIconUrl = typeof userIcon === 'string' ? userIcon : userIcon.src;
const DropdownMenuBar = ({ userImage }: ProfileImage) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className=" rounded-full w-fit flex items-center justify-center gap-2"
            variant="outline"
          >
            <Menu />
            <img
              src={userImage ?? userIconUrl}
              alt="user-icon"
              className="h-8 w-8 lg:block rounded-full"
            ></img>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href="/profile">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/create-community">
            <DropdownMenuItem>
              <SquareChevronRight className="mr-2 h-4 w-4" />
              <span>Create Community</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/create-post">
            <DropdownMenuItem>
              <StickyNote className="mr-2 h-4 w-4" />
              <span>Create Post</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/settings">
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>
              {" "}
              <LogoutLink>Logout</LogoutLink>{" "}
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropdownMenuBar;
