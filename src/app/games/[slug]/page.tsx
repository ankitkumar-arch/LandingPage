// import fs from "fs";
// import path from "path";
// import { notFound } from "next/navigation";
// import Footer from "@/components/Footer/Footer";
// import FooterWidgets from "@/components/FooterWidgets/FooterWidgets";

// type Props = {
//   params: { slug: string };
// };

// /**
//  * ✅ REQUIRED for `output: export`
//  * This tells Next.js which pages to generate
//  */
// export async function generateStaticParams() {
//   const dir = path.join(process.cwd(), "data/games");

//   if (!fs.existsSync(dir)) {
//     return [];
//   }

//   const files = fs.readdirSync(dir);

//   return files
//     .filter(file => file.endsWith(".json"))
//     .map(file => ({
//       slug: file.replace(".json", "")
//     }));
// }

// export default function GamePage({ params }: Props) {
//   const filePath = path.join(
//     process.cwd(),
//     "data/games",
//     `${params.slug}.json`
//   );

//   if (!fs.existsSync(filePath)) {
//     notFound();
//   }

//   const game = JSON.parse(
//     fs.readFileSync(filePath, "utf-8")
//   );

//   return (
//     <div style={{ padding: 0 }}>
//       <h1>{game.gameName}</h1>
//       <img src={game.qrImage} width={150} />
//       {/* <p>{game.appStore.description}</p> */}
//       <FooterWidgets />
//         <Footer />
//     </div>
//   );
// }

import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";

import styles from "@/styles/page.module.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Hero from "@/components/Hero/Hero";
import { PIXELS } from "@/constants/pixels";
import DeveloperSection from "@/components/DeveloperSection/DeveloperSection";
import FlagSection from "@/components/FlagSection/FlagSection";
import AppSpecific from "@/components/AppSpecific/AppSpecific";
import RatingsAndReviews from "@/components/RatingsAndReviews/RatingsAndReviews";
import GameScreenShotsV2 from "@/components/GameScreenShotsV2/GameScreenShotsV2";
import { Suspense } from "react";
import DownloadAppButton from "@/components/DownloadAppButton/DownloadAppButton";
import Loader from "@/components/Loader/Loader";
import HeroV2 from "@/components/HeroV2/HeroV2";
import GameScreenShots from "@/components/GameScreenShots/GameScreenShots";
import AnalyticsProvider from "@/utils/AnalyticsProvider";
import clientPromise from "@/lib/mongodb";
import FooterWidgets from "@/components/FooterWidgets/FooterWidgets";
import Script from "next/script";

export const dynamic = "force-dynamic";

export default async function GamePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const client = await clientPromise;
  const db = client.db("landing-pages");

  const game = await db.collection("games").findOne({ slug: slug });

  if (!game) {
    notFound();
  }

  const version = slug.endsWith("-v2") ? "v2" : "v1";

  function generateTags(appStore: any) {
    const tags: string[] = [];

    if (game?.appStore.genres?.length) {
      tags.push(...game.appStore.genres);
    }

    // Optional marketing tags
    tags.push("Top Rated");
    tags.push("Trending");

    // Remove duplicates
    return [...new Set(tags)];
  }

  const formattedRating = Number(game.appStore.appRating?.toFixed(1));

  return (
    <div className={styles.page}>
      <AnalyticsProvider gtagId="G-1FR83BKXJ1" gtmId="GTM-NCNL72F" />
      <Script
        defer
        src="https://onelinksmartscript.appsflyer.com/onelink-smart-script-latest.js"
      ></Script>

      {version === "v2" && (
        <main className={styles.main}>
          <Header />
          <HeroV2
            gameQRImage={game.qrImage}
            appIcon={game.appStore.icon}
            bgImage={game.backgroundImage}
            gameRating={formattedRating}
            appDownloads={game.appDownloads}
            reviewsCount={game.reviewsCount}
          />
          <Suspense fallback={<Loader />}>
            <DownloadAppButton oneLinkUrl={game.onelinkUrl} />
          </Suspense>
          <div style={{ padding: "0 15px" }}>
            <GameScreenShotsV2 screenshotsImages={game.appStore.screenshots} />
            <RatingsAndReviews
              reviews={game.reviews}
              gameName={game.gameName}
              gameDesc={game.appStore.description}
              gameRating={formattedRating}
              gameGenres={generateTags(game.appStore.gameGenres)}
            />
            <AppSpecific />
            <DeveloperSection />
            <FlagSection />
          </div>
          <Footer />
        </main>
      )}

      {version === "v1" && (
        <main className={styles.main}>
          <div className={!game.imageSrcTop ? styles.heroFallback : undefined}>
            <Hero
              imageSrcTop={game.imageSrcTop}
              gameQRImage={game.qrImage}
              bgImage={game.backgroundImage}
              gameRating={formattedRating}
              gameName={game.gameName}
              gameOnelink={game.onelinkUrl}
            />
          </div>
          <GameScreenShots screenshotsImages={game.appStore.screenshots} />
          <FooterWidgets onelinkUrl={game.onelinkUrl} />

          <Suspense fallback={<Loader />}>
            <DownloadAppButton oneLinkUrl={game.onelinkUrl} />
          </Suspense>
          <Footer />
        </main>
      )}
    </div>
  );
}
