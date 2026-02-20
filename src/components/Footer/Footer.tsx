import React from "react";
import styles from "./Footer.module.scss";
import Image from "next/image";

const socialIcons = [
  {
    src: "/images/social-fb.webp",
    alt: "Facebook",
    href: "https://facebook.com/SkillzGames?utm_campaign=SSK_skillz_web&utm_source=skillz_web",
  },
  {
    src: "/images/social-twit.webp",
    alt: "Twitter",
    href: "https://x.com/skillz?utm_campaign=SSK_skillz_web&utm_source=skillz_web",
  },
  {
    src: "/images/social-ig.webp",
    alt: "Instagram",
    href: "https://instagram.com/skillz?utm_campaign=SSK_skillz_web&utm_source=skillz_web",
  },
  {
    src: "/images/skillz-icon.webp",
    alt: "Skillz",
    href: "https://www.skillz.com/news/?utm_campaign=SSK_skillz_web&utm_source=skillz_web",
  },
];

const PlayersListItems = [
  {
    text: "Get the Skillz App",
    href: "https://games.skillz.com/skillzapp/?utm_campaign=SSK_skillz_web&utm_source=skillz_web",
  },
  {
    text: "FAQs",
    href: "https://skillz.zendesk.com/hc/en-us/categories/200051333/?utm_campaign=SSK_skillz_web&utm_source=skillz_web",
  },
  {
    text: "Live Agent Support",
    href: "https://support.skillz.com/hc/en-us/?utm_campaign=SSK_skillz_web&utm_source=skillz_web",
  },
  {
    text: "Documentation",
    href: "https://docs.skillz.com/docs/welcome/?utm_campaign=SSK_skillz_web&utm_source=skillz_web",
  },
  { text: "Developers", href: "#" },
];

const companyListItems = [
  {
    text: "About Us",
    href: "https://www.skillz.com/about-us/?utm_campaign=SSK_skillz_web&utm_source=skillz_web",
  },
  {
    text: "Careers",
    href: "https://www.skillz.com/careers/?utm_campaign=SSK_skillz_web&utm_source=skillz_web",
  },
  {
    text: "Legal",
    href: "https://www.skillz.com/legal/?utm_campaign=SSK_skillz_web&utm_source=skillz_web",
  },
  {
    text: "Privacy",
    href: "https://www.skillz.com/privacy-policy/?utm_campaign=SSK_skillz_web&utm_source=skillz_web",
  },
  {
    text: "Contact Us",
    href: "https://www.skillz.com/contact-us/?utm_campaign=SSK_skillz_web&utm_source=skillz_web",
  },
];

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.socialSection}>
        <Image
          src="/images/footer-social-icon-bg.webp"
          alt="Footer Background"
          fill
          className={styles.bgImage}
          priority
        />

        <div className={styles.socialIcons}>
          {socialIcons.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.alt}
              className={styles.socialLink}
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={30}
                height={30}
                style={{ objectFit: "cover" }}
                priority
              />
            </a>
          ))}
        </div>
      </div>

      <div className={styles.linksSection}>
        <div className={styles.linkGroup}>
          <h2>PLAYERS</h2>
          {PlayersListItems.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkItem}
            >
              {item.text}
            </a>
          ))}
        </div>
        <div className={styles.linkGroup}>
          <h2>COMPANY</h2>
          {companyListItems.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkItem}
            >
              {item.text}
            </a>
          ))}
        </div>
      </div>

      <div className={styles.copyrightSection}>
        <p>© {new Date().getFullYear()} Skillz. All rights reserved.</p>
      </div>
    </footer>
  );
};
export default Footer;
