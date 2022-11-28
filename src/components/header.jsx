/* the SignIn/SignUp button is here in header. onClick={handleSignIn}
 * I click once it works, I click again and I get this error:
 * 
 * Unhandled Runtime Error
 * Error: Cancel rendering route
 *
 * the URL shows this -> "http://localhost:3000/auth?redirectToPath=%2Fabout-us"
 * as it should cause I clicked from that page
 */
import Image from "next/image";
import Link from "next/link";
import { redirectToAuth } from "supertokens-auth-react";

const navigation = [
  { name: "About Us", href: "/about-us" },
  { name: "Plans", href: "/plans" },
];

export default function Header() {
  const handleSignIn = () => {
    redirectToAuth({ redirectBack: true });
  };
  return (
    <header className="bg-gray-100 shadow-md">
      <nav className="px-2" aria-label="Top">
        <div className="flex w-full items-center justify-between border-b border-indigo-500 py-2 lg:border-none">
          <div className="flex items-center">
            <Link href="/">
              <span className="sr-only">L.A. Casting, Inc.</span>
              <Image
                src="/images/logo2023.png"
                alt=""
                width={231}
                height={24}
              />
            </Link>
            <div className="ml-10 hidden space-x-8 lg:block">
              {navigation.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-base font-medium hover:text-orange-600"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="ml-10 space-x-4">
            <Link
              onClick={handleSignIn}
              href="#"
              className="inline-block rounded-md border border-transparent bg-orange-400 py-2 px-4 text-base font-medium text-white hover:bg-opacity-75"
            >
              Sign In / Sign Up
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap justify-center space-x-6 py-4 lg:hidden">
          {navigation.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-base font-medium text-white hover:text-indigo-50"
            >
              {link.name}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
