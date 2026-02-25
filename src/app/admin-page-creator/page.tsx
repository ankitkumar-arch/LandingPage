"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/styles/AdminPage.module.scss";

/* ─── ATOMS ─── */
const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={`${styles.card} ${className}`}>{children}</div>;

const CardHeader = ({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}) => (
  <div className={styles.cardHeader}>
    <div>
      <div className={styles.cardHeaderTitle}>{title}</div>
      {subtitle && <div className={styles.cardHeaderSubtitle}>{subtitle}</div>}
    </div>
    {right}
  </div>
);

const CardBody = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={`${styles.cardBody} ${className}`}>{children}</div>;

const Spinner = () => <span className={`${styles.spinner} ${styles.spin}`} />;

const Stars = ({ n }: { n: number }) => (
  <span className={styles.reviewStars}>
    {"★".repeat(n)}
    {"☆".repeat(5 - n)}
  </span>
);

const Chip = ({ children }: { children: React.ReactNode }) => (
  <span className={styles.chip}>{children}</span>
);

const Divider = () => <div className={styles.divider} />;

/* ─── PAGE ─── */
export default function AdminPage() {
  const router = useRouter();

  const [appId, setAppId] = useState("");
  const [appData, setAppData] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  const [gameName, setGameName] = useState("");
  const [qrImage, setQrImage] = useState<string | null>(null);
  const [generatedJson, setGeneratedJson] = useState<any>(null);
  const [version, setVersion] = useState<"v1" | "v2">("v1");
  const [onelinkUrl, setOnelinkUrl] = useState("");
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [reviews, setReviews] = useState<
    { name: string; rating: number; text: string }[]
  >([]);
  const [newReview, setNewReview] = useState({ name: "", rating: 5, text: "" });
  const [previewOpen, setPreviewOpen] = useState(true);
  const [appDownloads, setAppDownloads] = useState("");
  const [reviewsCount, setReviewsCount] = useState("");
  const [screenshots, setScreenshots] = useState<string[]>([]);

  //   edit page section
  const [editSlug, setEditSlug] = useState("");
  const [editLoading, setEditLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editSectionOpen, setEditSectionOpen] = useState(false);

  /* ─── HELPERS ─── */
  function slugify(t: string) {
    return t
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  }

  function toBase64(file: File, cb: (s: string) => void) {
    const reader = new FileReader();
    reader.onloadend = () => cb(reader.result as string);
    reader.readAsDataURL(file);
  }

  /* ─── ACTIONS ─── */
  async function fetchFromAppStore() {
    try {
      setError("");
      setAppData(null);
      setLoading(true);
      const res = await fetch(`/api/appstore?appId=${appId}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      if (!data.results?.length) throw new Error();
      setAppData(data.results[0]);
    } catch {
      setError("Could not find app. Check the App ID and try again.");
    } finally {
      setLoading(false);
    }
  }

  async function generateAndSave() {
    if (!gameName || !qrImage || !appData) {
      setError("Game name, QR image, and App Store data are all required.");
      return;
    }
    const slug = `${slugify(gameName)}-${version}`;
    const json = {
      slug,
      gameName,
      qrImage,
      onelinkUrl,
      appDownloads,
      reviewsCount,
      backgroundImage,
      reviews,
      appStore: {
        trackName: appData.trackName,
        description: appData.description,
        icon: appData.artworkUrl512,
        screenshots:
          screenshots.length > 0 ? screenshots : appData.screenshotUrls,
        appRating: appData.averageUserRating,
        genres: appData.genres,
      },
    };
    try {
      setError("");
      setGenerating(true);
      const res = await fetch("/api/games", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(json),
      });
      if (!res.ok) throw new Error();
      setGeneratedJson(json);
      setTimeout(() => {
        router.push(`/games/${slug}`);
      }, 4000);
    } catch {
      setError("Failed to publish. Please try again.");
    } finally {
      setGenerating(false);
    }
  }

  //  edit function
  async function fetchAndLoadForEdit() {
    if (!editSlug) return;
    try {
      setEditLoading(true);
      setError("");
      const res = await fetch(`/api/games?slug=${editSlug}`);
      if (!res.ok) throw new Error();
      const data = await res.json();

      // Pre-fill all your existing form states
      setGameName(data.gameName);
      setOnelinkUrl(data.onelinkUrl);
      setQrImage(data.qrImage);
      setBackgroundImage(data.backgroundImage);
      setReviews(data.reviews ?? []);
      setVersion(data.slug.endsWith("-v2") ? "v2" : "v1");
      setAppDownloads(data.appDownloads || "100K+"); //default if missing
      setReviewsCount(data.reviewsCount || "500"); //default if missing
      setScreenshots(data.appStore.screenshots ?? []);

      // For appStore data, reconstruct a minimal appData object
      // so your existing preview panel and canPublish check still work
      setAppData({
        trackName: data.appStore.trackName,
        description: data.appStore.description,
        artworkUrl512: data.appStore.icon,
        screenshotUrls: data.appStore.screenshots,
        averageUserRating: data.appStore.appRating,
        genres: data.appStore.genres,
      });

      setEditMode(true); // flag so publish button calls PUT instead of POST
      setEditSectionOpen(false); // collapse the edit search bar once loaded
    } catch {
      setError("Could not find a page with that slug. Check and try again.");
    } finally {
      setEditLoading(false);
    }
  }

  // update slug

  async function updatePage() {
    const slug = `${slugify(gameName)}-${version}`;
    const json = {
      slug,
      gameName,
      qrImage,
      onelinkUrl,
      appDownloads,
      reviewsCount,
      backgroundImage,
      reviews,
      appStore: {
        trackName: appData.trackName,
        description: appData.description,
        icon: appData.artworkUrl512,
        screenshots:
          screenshots.length > 0 ? screenshots : appData.screenshotUrls,
        appRating: appData.averageUserRating,
        genres: appData.genres,
      },
    };
    try {
      setError("");
      setGenerating(true);
      const res = await fetch("/api/games", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(json),
      });
      if (!res.ok) throw new Error();
      setGeneratedJson(json);
      setTimeout(() => router.push(`/games/${slug}`), 2500);
    } catch {
      setError("Failed to update. Please try again.");
    } finally {
      setGenerating(false);
    }
  }

  function addReview() {
    if (!newReview.name || !newReview.text) return;
    setReviews((prev) => [...prev, newReview]);
    setNewReview({ name: "", rating: 5, text: "" });
  }

  /* ─── DERIVED ─── */
  const slug = gameName ? `${slugify(gameName)}-${version}` : null;
  const canPublish =
    !!appData &&
    !!gameName &&
    !!qrImage &&
    !!onelinkUrl &&
    !!backgroundImage &&
    reviews.length > 4;

  const steps = [
    { label: "App Store", done: !!appData },
    { label: "Game Info", done: !!gameName && !!onelinkUrl },
    { label: "Assets", done: !!qrImage && !!backgroundImage },
    { label: "Reviews", done: reviews.length > 0 },
  ];

  return (
    <>
      <div className={styles.pageWrapper}>
        <div className={styles.formColumn}>
          <div>
            <h1 className={styles.pageTitle}>Landing Page Generator</h1>
          </div>
          {/* edit section */}
          {/* ── EDIT EXISTING PAGE ── */}
          <Card>
            <CardHeader
              title="✏️ Edit Existing Page"
              subtitle={
                editMode
                  ? `Editing: ${editSlug}`
                  : "Load a published page to edit it"
              }
              right={
                <button
                  className={`${styles.btn} ${styles.btnGhost}`}
                  onClick={() => setEditSectionOpen((v) => !v)}
                >
                  {editSectionOpen ? "Collapse" : "Expand"}
                  <svg
                    width="11"
                    height="11"
                    fill="none"
                    viewBox="0 0 24 24"
                    style={{
                      transform: editSectionOpen ? "rotate(180deg)" : "none",
                      transition: "transform .2s",
                    }}
                  >
                    <path
                      d="M6 9l6 6 6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              }
            />

            {editSectionOpen && (
              <CardBody>
                <div className={styles.formRow} style={{ flexWrap: "nowrap" }}>
                  <input
                    className={styles.input}
                    placeholder="Enter Game route (e.g. clash-of-legends-v1)"
                    value={editSlug}
                    onChange={(e) => setEditSlug(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && fetchAndLoadForEdit()
                    }
                  />
                  <button
                    className={`${styles.btn} ${styles.btnPrimary}`}
                    onClick={fetchAndLoadForEdit}
                    disabled={!editSlug || editLoading}
                  >
                    {editLoading ? <Spinner /> : "Load"}
                  </button>
                </div>

                {editMode && (
                  <div
                    style={{
                      marginTop: 8,
                      padding: "6px 10px",
                      background: "#f0fdf4",
                      borderRadius: 6,
                      fontSize: 12,
                      color: "#16a34a",
                    }}
                  >
                    ✓ Page loaded — edit any fields above and click{" "}
                    <strong>Update Page</strong>
                  </div>
                )}
              </CardBody>
            )}
          </Card>

          <Card>
            <CardHeader title="① Fetch App Data" />
            <CardBody>
              <div className={styles.formRow} style={{ flexWrap: "nowrap" }}>
                <input
                  className={styles.input}
                  placeholder="App Store ID (e.g. 1234567890)"
                  value={appId}
                  onChange={(e) => setAppId(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && fetchFromAppStore()}
                />
                <button
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  onClick={fetchFromAppStore}
                  disabled={!appId || loading}
                >
                  {loading ? (
                    <Spinner />
                  ) : (
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24">
                      <path
                        d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                  {loading ? "Fetching…" : "Fetch"}
                </button>
              </div>

              {error && (
                <div className={styles.alertError}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      stroke="#DC2626"
                      strokeWidth="2"
                    />
                    <path
                      d="M12 8v5M12 16v.5"
                      stroke="#DC2626"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  {error}
                </div>
              )}
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="② Game Details" />
            <CardBody>
              <div className={styles.formRow} style={{ marginBottom: 11 }}>
                <div className={styles.fieldHalf}>
                  <label className={styles.fieldLabel}>Game Name*</label>
                  <input
                    className={styles.input}
                    value={gameName}
                    onChange={(e) => setGameName(e.target.value)}
                    placeholder="e.g. Clash of Legends"
                  />
                </div>
                <div className={styles.fieldHalf}>
                  <label className={styles.fieldLabel}>Version*</label>
                  <div className={styles.versionToggle}>
                    {(["v1", "v2"] as const).map((v) => (
                      <button
                        key={v}
                        className={`${styles.versionBtn} ${version === v ? styles.active : ""}`}
                        onClick={() => setVersion(v)}
                      >
                        {v.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className={styles.field} style={{ marginBottom: 11 }}>
                <label className={styles.fieldLabel}>OneLink URL*</label>
                <input
                  className={styles.input}
                  value={onelinkUrl}
                  onChange={(e) => setOnelinkUrl(e.target.value)}
                  placeholder="https://onelink.me/…"
                />
              </div>

              {version === "v2" && (
                <div>
                  <div className={styles.field} style={{ marginBottom: 11 }}>
                    <label className={styles.fieldLabel}>
                      Enter App downloads stats
                    </label>
                    <input
                      className={styles.input}
                      value={appDownloads}
                      onChange={(e) => setAppDownloads(e.target.value)}
                      placeholder="e.g. 10K+, 200K+, 5M+"
                    />
                  </div>

                  <div className={styles.field} style={{ marginBottom: 11 }}>
                    <label className={styles.fieldLabel}>
                      Enter Game Reviews Count
                    </label>
                    <input
                      className={styles.input}
                      value={reviewsCount}
                      onChange={(e) => setReviewsCount(e.target.value)}
                      placeholder="e.g. 300, 500, 1K"
                    />
                  </div>
                </div>
              )}
            </CardBody>
          </Card>

          <Card>
            <CardHeader
              title="③ Assets"
              subtitle="Upload images in svg/web format"
            />
            <CardBody>
              <div className={styles.formRow}>
                <div className={styles.fieldHalf}>
                  <label className={styles.fieldLabel}>QR Code Image*</label>
                  <input
                    className={styles.fileInput}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) toBase64(f, setQrImage);
                    }}
                  />
                  {qrImage && (
                    <div className={styles.thumbRow}>
                      <img
                        src={qrImage}
                        className={styles.thumb}
                        alt="QR preview"
                      />
                      <button
                        className={styles.removeBtn}
                        onClick={() => setQrImage(null)}
                      >
                        ✕ Remove
                      </button>
                    </div>
                  )}
                </div>

                <div className={styles.fieldHalf}>
                  <label className={styles.fieldLabel}>Hero Image*</label>
                  <input
                    className={styles.fileInput}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) toBase64(f, setBackgroundImage);
                    }}
                  />
                  {backgroundImage && (
                    <div className={styles.thumbRow}>
                      <img
                        src={backgroundImage}
                        className={styles.thumb}
                        alt="Background preview"
                      />
                      <button
                        className={styles.removeBtn}
                        onClick={() => setBackgroundImage(null)}
                      >
                        ✕ Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {appData?.screenshotUrls?.length === 0 && (
                <div>
                  <div className={styles.field} style={{ marginTop: 11 }}>
                    <label className={styles.fieldLabel}>
                      Game Screenshots*
                    </label>
                    <input
                      className={styles.fileInput}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => {
                        const files = Array.from(e.target.files ?? []);
                        files.forEach((f) =>
                          toBase64(f, (b64) =>
                            setScreenshots((prev) => [...prev, b64]),
                          ),
                        );
                      }}
                    />
                    {screenshots.length > 0 && (
                      <div
                        className={styles.thumbRow}
                        style={{ flexWrap: "wrap", gap: 8 }}
                      >
                        {screenshots.map((s, i) => (
                          <div key={i} style={{ position: "relative" }}>
                            <img
                              src={s}
                              className={styles.thumb}
                              alt={`screenshot ${i + 1}`}
                            />
                            <button
                              className={styles.removeBtn}
                              onClick={() =>
                                setScreenshots((prev) =>
                                  prev.filter((_, j) => j !== i),
                                )
                              }
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardBody>
          </Card>

          {/* STEP 4 — Reviews */}
          <Card>
            <CardHeader
              title="④ User Reviews"
              subtitle="Add atleast 5 reviewers"
              right={
                reviews.length > 0 ? (
                  <span className={styles.reviewCount}>
                    {reviews.length} review{reviews.length !== 1 ? "s" : ""}
                  </span>
                ) : undefined
              }
            />
            <CardBody>
              <div className={styles.formRow} style={{ marginBottom: 10 }}>
                <div className={styles.fieldHalf}>
                  <label className={styles.fieldLabel}>Reviewer Name*</label>
                  <input
                    className={styles.input}
                    placeholder="e.g. John D."
                    value={newReview.name}
                    onChange={(e) =>
                      setNewReview({ ...newReview, name: e.target.value })
                    }
                  />
                </div>
                <div className={styles.fieldHalf}>
                  <label className={styles.fieldLabel}>Rating*</label>
                  <select
                    className={styles.select}
                    value={newReview.rating}
                    onChange={(e) =>
                      setNewReview({
                        ...newReview,
                        rating: Number(e.target.value),
                      })
                    }
                  >
                    {[5, 4, 3, 2, 1].map((r) => (
                      <option key={r} value={r}>
                        {r} Stars
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.field} style={{ marginBottom: 10 }}>
                <label className={styles.fieldLabel}>Review Text*</label>
                <textarea
                  className={styles.textarea}
                  placeholder="Write review text…"
                  value={newReview.text}
                  onChange={(e) =>
                    setNewReview({ ...newReview, text: e.target.value })
                  }
                  style={{ height: 68 }}
                />
              </div>

              <button
                className={`${styles.btn} ${styles.btnPrimary} ${styles.btnSmall}`}
                onClick={addReview}
                disabled={!newReview.name || !newReview.text}
              >
                <svg width="11" height="11" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M12 5v14M5 12h14"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
                Add Review
              </button>

              {reviews.length > 0 && (
                <div className={styles.reviewList}>
                  {reviews.map((r, i) => (
                    <div
                      key={i}
                      className={`${styles.reviewItem} ${styles.anim}`}
                    >
                      <div className={styles.reviewContent}>
                        <div className={styles.reviewHeader}>
                          <span className={styles.reviewName}>{r.name}</span>
                          <Stars n={r.rating} />
                        </div>
                        <p className={styles.reviewText}>{r.text}</p>
                      </div>
                      <button
                        className={styles.reviewRemoveBtn}
                        onClick={() =>
                          setReviews(reviews.filter((_, j) => j !== i))
                        }
                        title="Remove review"
                      >
                        <svg
                          width="13"
                          height="13"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M18 6 6 18M6 6l12 12"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </CardBody>
          </Card>

          {/* PUBLISH */}
          <div className={styles.publishRow}>
            <button
              className={styles.btnPublish}
              onClick={editMode ? updatePage : generateAndSave}
              disabled={!canPublish || generating}
            >
              {generating ? (
                <Spinner />
              ) : (
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M5 12l5 5L20 7"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              {generating
                ? editMode
                  ? "Updating…"
                  : "Publishing…"
                : editMode
                  ? "Update Landing Page"
                  : "Generate Landing Page"}
            </button>
          </div>
        </div>

        {/* ══ RIGHT — preview panel ══ */}
        <div className={styles.previewColumn}>
          <Card>
            <CardHeader
              title="App Preview"
              subtitle={appData ? appData.trackName : "Awaiting app data…"}
              right={
                <button
                  className={`${styles.btn} ${styles.btnGhost}`}
                  onClick={() => setPreviewOpen((v) => !v)}
                >
                  {previewOpen ? "Collapse" : "Expand"}
                  <svg
                    width="11"
                    height="11"
                    fill="none"
                    viewBox="0 0 24 24"
                    style={{
                      transform: previewOpen ? "rotate(180deg)" : "none",
                      transition: "transform .2s",
                    }}
                  >
                    <path
                      d="M6 9l6 6 6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              }
            />

            {previewOpen && (
              <CardBody>
                {!appData ? (
                  <div className={styles.previewEmpty}>
                    <div className={styles.previewEmptyIcon}>
                      <svg
                        width="20"
                        height="20"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <rect
                          x="5"
                          y="2"
                          width="14"
                          height="20"
                          rx="2"
                          stroke="#9CA3AF"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M9 18h6M9 14h6M9 10h3"
                          stroke="#9CA3AF"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <p className={styles.previewEmptyTitle}>No app data yet</p>
                    <p className={styles.previewEmptySubtitle}>
                      Enter an App Store ID to see a live preview.
                    </p>
                  </div>
                ) : (
                  <div className={styles.anim}>
                    {/* App identity */}
                    <div className={styles.previewAppRow}>
                      <img
                        src={appData.artworkUrl512}
                        className={styles.previewAppIcon}
                        alt="App icon"
                      />
                      <div className={styles.previewAppInfo}>
                        <div className={styles.previewAppName}>
                          {appData.trackName}
                        </div>
                        <div className={styles.previewGenres}>
                          {appData.genres?.slice(0, 3).map((g: string) => (
                            <Chip key={g}>{g}</Chip>
                          ))}
                        </div>
                        <div className={styles.previewRating}>
                          <Stars
                            n={Math.round(appData.averageUserRating ?? 0)}
                          />
                          <span>{appData.averageUserRating?.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>

                    <Divider />

                    {/* Screenshots */}
                    <p className={styles.previewSectionLabel}>Screenshots</p>
                    <div className={styles.previewScreenshots}>
                      {appData.screenshotUrls
                        ?.slice(0, appData.screenshotUrls.length)
                        .map((url: string, i: number) => (
                          <img
                            key={i}
                            src={url}
                            className={styles.previewScreenshot}
                            alt=""
                          />
                        ))}
                    </div>

                    <Divider />

                    {/* Description */}
                    <p className={styles.previewSectionLabel}>Description</p>
                    <div className={styles.previewDescription}>
                      {appData.description}
                    </div>

                    {/* Slug */}
                    {slug && (
                      <>
                        <Divider />
                        <div className={styles.previewSlugRow}>
                          <span
                            className={styles.previewSectionLabel}
                            style={{ margin: 0 }}
                          >
                            URL
                          </span>
                          <code className={styles.previewSlugCode}>
                            /games/{slug}
                          </code>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </CardBody>
            )}
          </Card>

          {/* JSON output */}
          {generatedJson && (
            <Card className={`${styles.jsonCard} ${styles.anim}`}>
              <CardHeader
                title="Output JSON"
                right={
                  <span className={styles.publishedBadge}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <circle
                        cx="12"
                        cy="12"
                        r="9"
                        stroke="#16A34A"
                        strokeWidth="2"
                      />
                      <path
                        d="M8 12l3 3 5-5"
                        stroke="#16A34A"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    Published
                  </span>
                }
              />
              {/* <CardBody>
                <pre className={styles.jsonPre}>
                  {JSON.stringify(generatedJson, null, 2)}
                </pre>
              </CardBody> */}
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
