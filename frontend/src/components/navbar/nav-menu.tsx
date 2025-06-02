import { NavigationMenuProps } from "@radix-ui/react-navigation-menu"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "../ui/navigation-menu"
import Link from "next/link"

const NavMenu = (props: NavigationMenuProps) => {
  return (
    <NavigationMenu {...props}>
        <NavigationMenuList className="gap-6 space-x-0">
            <NavigationMenuItem>
                <NavigationMenuLink asChild>
                    <Link href="/">Home</Link>
                </NavigationMenuLink>
            </NavigationMenuItem>
                        <NavigationMenuItem>
                <NavigationMenuLink asChild>
                    <Link href="/analysis">Analysis</Link>
                </NavigationMenuLink>
            </NavigationMenuItem>
                        <NavigationMenuItem>
                <NavigationMenuLink asChild>
                    <Link href="#about">About</Link>
                </NavigationMenuLink>
            </NavigationMenuItem>
        </NavigationMenuList>
    </NavigationMenu>
  )
}

export default NavMenu
