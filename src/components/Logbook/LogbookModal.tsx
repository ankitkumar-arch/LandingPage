"use client";

import { useEffect, useState } from "react";
import styles from "@/styles/AdminPage.module.scss";

type GameEntry = {
  slug: string;
  gameName: string;
};

export default function LogbookModal({ onClose }: { onClose: () => void }) {
  const [games, setGames] = useState<GameEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchGames() {
      try {
        const res = await fetch("/api/games?all=true");
        if (!res.ok) throw new Error();
        const data = await res.json();
        setGames(data);
      } catch {
        setError("Failed to load pages. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchGames();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const filtered = games.filter(
    (g) =>
      g.gameName?.toLowerCase().includes(search.toLowerCase()) ||
      g.slug?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.35)",
        backdropFilter: "blur(2px)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: 14,
          width: "100%",
          maxWidth: 640,
          maxHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "18px 20px 14px",
            borderBottom: "1px solid #F3F4F6",
          }}
        >
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>
              📋 Logbook
            </div>
            <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>
              {loading
                ? "Loading…"
                : `${games.length} page${games.length !== 1 ? "s" : ""} created`}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "#F3F4F6",
              border: "none",
              borderRadius: 8,
              width: 30,
              height: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#6B7280",
              fontSize: 16,
            }}
          >
            ✕
          </button>
        </div>

        {/* Search */}
        <div style={{ padding: "12px 20px", borderBottom: "1px solid #F3F4F6" }}>
          <input
            className={styles.input}
            placeholder="Search by name or slug…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
            style={{ margin: 0 }}
          />
        </div>

        {/* Table */}
        <div style={{ overflowY: "auto", flex: 1 }}>
          {loading ? (
            <div
              style={{
                padding: "48px 24px",
                textAlign: "center",
                color: "#9CA3AF",
                fontSize: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <span className={`${styles.spinner} ${styles.spin}`} />
              Loading pages…
            </div>
          ) : error ? (
            <div className={styles.alertError} style={{ margin: 16 }}>
              {error}
            </div>
          ) : filtered.length === 0 ? (
            <div
              style={{
                padding: "48px 24px",
                textAlign: "center",
                color: "#9CA3AF",
                fontSize: 16,
              }}
            >
              {search ? "No pages match your search." : "No pages have been created yet."}
            </div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#FAFAFA", position: "sticky", top: 0 }}>
                  <th style={thStyle}>No.</th>
                  <th style={thStyle}>Game Name</th>
                  <th style={thStyle}>URL / Slug</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((game, i) => (
                  <tr
                    key={game.slug}
                    style={{ borderBottom: "1px solid #F3F4F6" }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.background = "#F9FAFB")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.background = "transparent")
                    }
                  >
                    <td style={{ ...tdStyle, color: "#9CA3AF", width: 40 }}>{i + 1}</td>
                    <td style={{ ...tdStyle, fontWeight: 500, color: "#111827" }}>
                      {game.gameName}
                    </td>
                    <td style={tdStyle}>
                      <code
                        style={{
                          background: "#F3F4F6",
                          padding: "3px 8px",
                          borderRadius: 5,
                          fontSize: 16,
                          color: "#374151",
                          fontFamily: "monospace",
                        }}
                      >
                        /games/{game.slug}
                      </code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer */}
        {!loading && !error && search && (
          <div
            style={{
              padding: "10px 20px",
              borderTop: "1px solid #F3F4F6",
              fontSize: 16,
              color: "#9CA3AF",
              textAlign: "right",
            }}
          >
            Showing {filtered.length} of {games.length}
          </div>
        )}
      </div>
    </div>
  );
}

const thStyle: React.CSSProperties = {
  padding: "8px 16px",
  textAlign: "left",
  fontSize: 11,
  fontWeight: 600,
  color: "#6B7280",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
};

const tdStyle: React.CSSProperties = {
  padding: "11px 16px",
  fontSize: 13,
  verticalAlign: "middle",
};