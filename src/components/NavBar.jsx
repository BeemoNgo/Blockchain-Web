import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import Logo from '../assets/logo.png';


const navigation = [
  { name: 'Home', href: '/Home', current: false },
  { name: 'About', href: '/About', current: false },
  { name: 'Market', href: '/Transaction', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  return (
    <div className="flex flex-shrink-0 items-center m-6">
      <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
        <Container>
          <Navbar.Brand className="mr-4">
            <img
              className="h-14 w-auto"
              src={Logo}
            />
          </Navbar.Brand>
          {/* Vertical Separator */}
          <div className="h-14 border-l-1 border-gray-300 mx-4"></div>
          <div className="navbar-start">
            <div className="flex space-x-5">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 text-xl font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                    >
                    {item.name}
                </a>
              ))}
            </div>
          </div>
        </Container>
      </Navbar>
    </div>
  );
};
export default NavBar;
