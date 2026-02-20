"use client";
import React from "react";
import Image from "next/image";
import styles from "./Header.module.scss";
import Link from "next/link";

const Header = () => {
  return (
    <header className={styles.header}>
      <Link href="https://www.skillz.com">
        <Image
          src="/images/skillz-logo-horizontal.svg"
          alt="Skillz Logo"
          width={100}
          height={40}
        />
      </Link>
    </header>
  );
};

export default Header;
