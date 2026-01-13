import React from "react";
import styles from "./Header.module.scss";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

type HeaderProps = {
  title: string;
};

const Header: React.FC<HeaderProps> = ({ title }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleLogoClick = () => {
    const currentParams = new URLSearchParams(searchParams?.toString());
    currentParams.set('utm_source', 'logo');
    currentParams.set('utm_campaing', 'skillz');
   
    router.push(`${pathname}?${currentParams.toString()}`);
  };

  return (
    <header>
      <div className={styles.offerBar}>
        <span>{title}</span>
      </div>

      <div className={styles.headerMain}>
        <img
          src="/images/footer-social-icon-bg.webp"
          alt="Header Background"
          className={styles.headerBg}
        />
        <img
          src="/images/skillz-logo-horizontal.svg"
          alt="Skillz Logo"
          className={styles.skillzLogo}
          onClick={handleLogoClick}
        />
      </div>
    </header>
  );
};

export default Header;
