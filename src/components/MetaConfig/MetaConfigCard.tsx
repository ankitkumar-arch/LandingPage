"use client";

import { useState } from "react";
import styles from "@/styles/AdminPage.module.scss";

const Spinner = () => <span className={`${styles.spinner} ${styles.spin}`} />;

export default function MetaConfigCard({ gameName }: { gameName: string }) {
  const [open, setOpen] = useState(false);
  const [pixelId, setPixelId] = useState("");
  const [capiToken, setCapiToken] = useState("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSave() {
    if (!gameName || !pixelId || !capiToken) return;
    try {
      setSaving(true);
      setError("");
      setSuccess(false);

      const res = await fetch("/api/meta-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameName, pixelId, capiToken }),
      });

      if (!res.ok) throw new Error();
      setSuccess(true);
      setCapiToken(""); // clear token from UI after save for security
      setTimeout(() => setSuccess(false), 4000);
    } catch {
      setError("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className={styles.card}>
      {/* Header */}
      <div className={styles.cardHeader}>
        <div>
          <div className={styles.cardHeaderTitle}>⑤ Meta Configuration</div>
          <div className={styles.cardHeaderSubtitle}>
            {gameName ? (
              <>
                Configuring for:{" "}
                <strong style={{ color: "#111827" }}>{gameName}</strong>
              </>
            ) : (
              "Enter Game Name in Step ② first"
            )}
          </div>
        </div>
        <button
          className={`${styles.btn} ${styles.btnGhost}`}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Collapse" : "Expand"}
          <svg
            width="11"
            height="11"
            fill="none"
            viewBox="0 0 24 24"
            style={{
              transform: open ? "rotate(180deg)" : "none",
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
      </div>

      {open && (
        <div className={styles.cardBody}>
          {/* Warning if no game name yet */}
          {!gameName && (
            <div
              style={{
                marginBottom: 12,
                padding: "8px 12px",
                background: "#fffbeb",
                borderRadius: 6,
                fontSize: 12,
                color: "#92400e",
                border: "1px solid #fde68a",
              }}
            >
              ⚠️ Enter a Game Name in Step ② first. The Meta config will be
              linked to that game name across all versions (v1, v2, v3…).
            </div>
          )}

          {/* Pixel ID */}
          <div className={styles.field} style={{ marginBottom: 11 }}>
            <label className={styles.fieldLabel}>Meta Pixel ID*</label>
            <input
              className={styles.input}
              placeholder="e.g. 1234567890123456"
              value={pixelId}
              onChange={(e) => setPixelId(e.target.value)}
              disabled={!gameName}
            />
          </div>

          {/* CAPI Token */}
          <div className={styles.field} style={{ marginBottom: 14 }}>
            <label className={styles.fieldLabel}>CAPI Access Token*</label>
            <input
              className={styles.input}
              type="password"
              placeholder="Paste your Conversions API token"
              value={capiToken}
              onChange={(e) => setCapiToken(e.target.value)}
              autoComplete="off"
              disabled={!gameName}
            />
            <p style={{ fontSize: 11, color: "#9CA3AF", marginTop: 4 }}>
              Encrypted with AES-256 before saving. Never exposed to the
              browser.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className={styles.alertError} style={{ marginBottom: 10 }}>
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div
              style={{
                marginBottom: 10,
                padding: "8px 12px",
                background: "#f0fdf4",
                borderRadius: 6,
                fontSize: 13,
                color: "#16a34a",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
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
              Saved for <strong>{gameName}</strong> — token cleared from UI.
            </div>
          )}

          <button
            className={`${styles.btn} ${styles.btnPrimary} ${styles.btnSmall}`}
            onClick={handleSave}
            disabled={!gameName || !pixelId || !capiToken || saving}
          >
            {saving ? (
              <Spinner />
            ) : (
              <svg width="11" height="11" fill="none" viewBox="0 0 24 24">
                <path
                  d="M5 12l5 5L20 7"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
            {saving ? "Saving…" : "Save Meta Config"}
          </button>
        </div>
      )}
    </div>
  );
}