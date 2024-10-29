"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { HomeIcon, PersonIcon, QuestionMarkCircledIcon, RocketIcon } from "@radix-ui/react-icons" // Using Radix UI icons

const AppBar = () => {
  const pathname = usePathname()

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-background py-2 shadow-md z-50 flex items-center justify-between px-4 md:px-8">
        {/* Branding */}
        <div className="text-primary font-bold text-lg md:text-2xl">
          Voizo
        </div>

        {/* Icons for Larger Screens */}
        <div className="hidden md:flex space-x-8">
          <Link href="/home" className={`flex items-center ${pathname === '/home' ? 'text-primary' : 'text-muted-foreground'}`}>
            <HomeIcon width={28} height={28} />
          </Link>
          <Link href="/trending" className={`flex items-center ${pathname === '/trending' ? 'text-primary' : 'text-muted-foreground'}`}>
            <RocketIcon width={28} height={28} />
          </Link>
          <Link href="/help" className={`flex items-center ${pathname === '/help' ? 'text-primary' : 'text-muted-foreground'}`}>
            <QuestionMarkCircledIcon width={28} height={28} />
          </Link>
          <Link href="/profile" className={`flex items-center ${pathname === '/profile' ? 'text-primary' : 'text-muted-foreground'}`}>
            <PersonIcon width={28} height={28} />
          </Link>
        </div>
      </nav>

      {/* Bottom Navigation Bar for Smaller Screens */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background shadow-md z-50 flex justify-around py-2">
        <Link href="/home" className={`flex flex-col items-center ${pathname === '/home' ? 'text-primary' : 'text-muted-foreground'}`}>
          <HomeIcon width={24} height={24} />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link href="/trending" className={`flex flex-col items-center ${pathname === '/trending' ? 'text-primary' : 'text-muted-foreground'}`}>
          <RocketIcon width={24} height={24} />
          <span className="text-xs mt-1">Trending</span>
        </Link>
        <Link href="/help" className={`flex flex-col items-center ${pathname === '/help' ? 'text-primary' : 'text-muted-foreground'}`}>
          <QuestionMarkCircledIcon width={24} height={24} />
          <span className="text-xs mt-1">Help</span>
        </Link>
        <Link href="/profile" className={`flex flex-col items-center ${pathname === '/profile' ? 'text-primary' : 'text-muted-foreground'}`}>
          <PersonIcon width={24} height={24} />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </nav>
    </>
  )
}

export default AppBar
