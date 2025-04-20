import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@heroui/react"
import { useState } from "react"
import SignupModal from "./SignupModal"

export default function MyNav({ onSignup }) {
  const [isSignupModalOpen, setSignupModalOpen] = useState(false)

  return (
    <>
      <Navbar shouldHideOnScroll isBlurred={true} className="!bg-transparent">
        <NavbarBrand>
          <p className="font-bold font-display text-inherit text-yellow-500 text-[1.5rem]">
            CineVault
          </p>
        </NavbarBrand>
        <NavbarContent
          className="hidden sm:flex gap-6 italic font-bold "
          justify="center"
        >
          <NavbarItem>
            <Link aria-current="page" href="/">
              Movies
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/watchlist" className="text-white">
              Watchlist
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              color="foreground"
              href="/recommendation"
              className="text-white"
            >
              Recommendation
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <Button
              color="secondary-50"
              variant="flat"
              className="text-[1rem] font-bold"
              onClick={() => setSignupModalOpen(true)}
            >
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => setSignupModalOpen(false)}
        onSignup={onSignup}
      />
    </>
  )
}
