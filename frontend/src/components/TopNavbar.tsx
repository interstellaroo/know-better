  import { Book, CircleHelp, Menu } from "lucide-react";
  import React from "react";
  import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "./ui/navigation-menu";
  import { Link } from "react-router-dom";
  import { Button } from "./ui/button";
  import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
  import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
  import { it } from "node:test";

  interface MenuItem {
    title: string;
    url: string;
    description?: string;
    icon?: React.ReactNode;
    items?: MenuItem[];
  }

  interface TopNavbarProps {
    logo?: {
      url: string;
      src?: string;
      alt: string;
      title: string
    };
    menu?: MenuItem[];
    auth?: {
      login: {
        title: string;
        url: string;
      };
      signup: {
        title: string;
        url: string;
      };
    };
  }

  const SubMenuLink = ({ item }: { item: MenuItem }) => {
    return (
      <Link to={item.url} className="flex flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none
        hover:bg-muted hover:text-accent-foreground"
      >
        <div className="text-foreground">{item.icon}</div>
        <div>
          <div className="text-sm font-semibold">{item.title}</div>
          {item.description && (
            <p className="text-sm leading-snug text-muted-foreground">
              {item.description}
            </p>
          )}
        </div>
      </Link>
    )
  }

  const renderMenuItem = (item: MenuItem) => {
    if (item.items) {
      return (
        <NavigationMenuItem key={item.title}>
          <NavigationMenuTrigger className="font-medium">
            {item.title}
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-popover text-popover-foreground p-2">
            <div className="md:w-[200px] lg:w-[300px]">
              {item.items.map((subItem) => (
                <NavigationMenuLink asChild key={subItem.title}>
                  <SubMenuLink item={subItem}/>
                </NavigationMenuLink>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      )
    }

    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuLink href={item.url} className="font-medium">
          {item.title}
        </NavigationMenuLink>
      </NavigationMenuItem>
    )
  }

  const renderMobileMenuItem = (item: MenuItem) => {
    if (item.items) {
      return (
        <AccordionItem key={item.title} value={item.title} className="border-b-0">
          <AccordionTrigger className="w-full justify-between px-4 py-3 font-medium hover:no-underline hover:bg-muted">
            {item.title}
          </AccordionTrigger>
          <AccordionContent className="mt-2">
            {item.items.map((subItem) => (
              <SubMenuLink key={subItem.title} item={subItem} />
            ))}
          </AccordionContent>
        </AccordionItem>
      )
    }

    return (
      <Link key={item.title} to={item.url} className="block w-full px-4 py-3 text-left text-base font-medium hover:bg-muted transition-colors">
        {item.title}
      </Link>
    )
  }

  const TopNavbar = ({
    logo = {
      url: "/",
      alt: "knowBetter logo",
      title: "knowBetter",
    },
    menu = [
      {
        title: "Home",
        url: "#",
      },
      {
        title: "About",
        url: "#",
        items: [
          {
            title: "What is knowBetter?",
            description: "Service that aims to help you know better",
            icon: <Book className="size-5 shrink-0" />,
            url: "#",
          },
          {
            title: "FAQ",
            description: "Common questions asked about knowBetter",
            icon: <CircleHelp className="size-5 shrink-0" />,
            url: "#",
          },
        ],
      },
    ],
    auth = {
      login: {
        title: "Sign in",
        url: "signin",
      },
      signup: {
        title: "Sign up",
        url: "signup"
      },
    },
  }: TopNavbarProps) => {
    return (
      <section className="py-4">
        <div className="mx-auto px-4 w-full max-w-screen">

          {/* Desktop menu */}
          <nav className="hidden justify-between lg:flex">
            <div className="flex items-center gap-6">
              <Link to={logo.url} className="flex items-center gap-2">
                <span  className="text-lg font-semibold tracking-tighter">
                  {logo.title}
                </span>
              </Link>
              <div className="flex items-center">
                <NavigationMenu>
                  <NavigationMenuList>
                    {menu.map((item) => renderMenuItem(item))}
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            </div>
            <div>
              <div className="flex gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link to={auth.login.url}>
                    {auth.login.title}
                  </Link>
                </Button>
                <Button asChild size="sm">
                  <Link to={auth.signup.url}>
                    {auth.signup.title}
                  </Link>
                </Button>
              </div>
            </div>
          </nav>

          {/* Mobile menu */}
          <div className="block lg:hidden">
            <div className="flex flex-center justify-between">
              <Link to={logo.url} className="flex items-center gap-2">
                <span  className="text-lg font-semibold tracking-tighter">
                  {logo.title}
                </span>
              </Link>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="size-4"/>
                  </Button>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>
                    <Link to={logo.url} className="flex items-center gap-2">
                      <span  className="text-lg font-semibold tracking-tighter">
                        {logo.title}
                      </span>
                    </Link>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-6">
                    <Accordion
                      type="single"
                      collapsible
                      className="flex w-full flex-col gap-4"
                    >
                      {menu.map((item) => renderMobileMenuItem(item))}
                    </Accordion>
                  </div>

                  <div className="flex flex-col gap-3 px-4">
                    <Button asChild variant="outline">
                      <Link to={auth.login.url}>
                        {auth.login.title}
                      </Link>
                    </Button>
                    <Button asChild>
                      <Link to={auth.signup.url}>
                        {auth.signup.title}
                      </Link>
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </section>
    )
  }

  export default TopNavbar
