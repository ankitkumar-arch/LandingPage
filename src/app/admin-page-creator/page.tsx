// "use client";
// import { useState } from "react";

// export default function AdminPage() {
//   const [appId, setAppId] = useState("");
//   const [appData, setAppData] = useState<any>(null);
//   const [error, setError] = useState("");

//   async function fetchFromAppStore() {
//     try {
//       setError("");
//       setAppData(null);

//       const res = await fetch(
//         `http://localhost:4000/appstore?appId=${appId}`
//       );

//       if (!res.ok) {
//         throw new Error("Backend failed");
//       }

//       const data = await res.json();

//       if (!data.results?.length) {
//         throw new Error("No app found");
//       }

//       setAppData(data.results[0]);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to fetch App Store data");
//     }
//   }

//   return (
//     <>
//       <h2>Extract Images From App Store</h2>

//       <input
//         placeholder="Enter App Store App ID"
//         value={appId}
//         onChange={(e) => setAppId(e.target.value)}
//       />

//       <button onClick={fetchFromAppStore}>Fetch</button>

//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {appData && (
//         <>
//           <h3>{appData.trackName}</h3>

//           <img
//             src={appData.artworkUrl512}
//             alt="App Icon"
//             width={150}
//           />

//           <h4>Screenshots</h4>
//           <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
//             {appData.screenshotUrls.map((url: string, i: number) => (
//               <img key={i} src={url} width={200} />
//             ))}
//           </div>

//           <h4>Description</h4>
//           <p>{appData.description}</p>
//         </>
//       )}
//     </>
//   );
// }

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const [appId, setAppId] = useState("");
  const [appData, setAppData] = useState<any>(null);
  const [error, setError] = useState("");

  const [gameName, setGameName] = useState("");
  const [qrImage, setQrImage] = useState<string | null>(null);
  const [generatedJson, setGeneratedJson] = useState<any>(null);
  const [version, setVersion] = useState<"v1" | "v2">("v1");
  const [onelinkUrl, setOnelinkUrl] = useState("");

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    marginTop: "8px",
  };

  function slugify(text: string) {
    return text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  }

  async function fetchFromAppStore() {
    try {
      setError("");
      setAppData(null);

      const res = await fetch(`/api/appstore?appId=${appId}`);

      if (!res.ok) throw new Error("Backend failed");

      const data = await res.json();

      if (!data.results?.length) throw new Error("No app found");

      setAppData(data.results[0]);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch App Store data");
    }
  }

  function handleQrUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setQrImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  //   function generateJson() {
  //     if (!gameName || !qrImage || !appData) {
  //       setError("Game name, QR image, and App Store data are required");
  //       return;
  //     }

  //     const json = {
  //       gameName,
  //       qrImage,
  //       appStore: {
  //         trackName: appData.trackName,
  //         description: appData.description,
  //         icon: appData.artworkUrl512,
  //         screenshots: appData.screenshotUrls
  //       }
  //     };

  //     setGeneratedJson(json);
  //     setError("");
  //   }

  async function generateAndSave() {
    if (!gameName || !qrImage || !appData) {
      setError("Game name, QR image, and App Store data are required");
      return;
    }

    //   const slug = slugify(gameName);
    //using v1 or v2
    const baseSlug = slugify(gameName);
    const slug = `${baseSlug}-${version}`;
    const json = {
      slug,
      gameName,
      qrImage,
      onelinkUrl,
      appStore: {
        trackName: appData.trackName,
        description: appData.description,
        icon: appData.artworkUrl512,
        screenshots: appData.screenshotUrls,
      },
    };

    try {
      setError("");

      const res = await fetch("/api/games", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(json),
      });

      if (!res.ok) {
        throw new Error("Failed to save game");
      }

      // optional preview
      setGeneratedJson(json);

      // 🚀 redirect to auto-generated page
      router.push(`/games/${slug}`);
    } catch (err) {
      console.error(err);
      setError("Failed to generate page");
    }
  }

  function downloadJson() {
    const blob = new Blob([JSON.stringify(generatedJson, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${gameName || "game"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    // <>
    //   <h2>Extract Images From App Store</h2>

    //   <input
    //     placeholder="Enter App Store App ID"
    //     value={appId}
    //     onChange={(e) => setAppId(e.target.value)}
    //   />
    //   <button onClick={fetchFromAppStore}>Fetch</button>

    //   <hr />

    //   <h3>Game Details</h3>

    //   <div style={{ width: "300px" }}>
    //     <label>Game Name:</label>
    //     <input
    //       placeholder="Enter Game Name"
    //       value={gameName}
    //       onChange={(e) => setGameName(e.target.value)}
    //       style={{ width: "500px" }}
    //     />
    //   </div>

    //   <div style={{ padding: "10px 0" }}>
    //     <label style={{ padding: "0 10px 0 0" }}>Onelink URL:</label>
    //     <input
    //       placeholder="Enter OneLink URL"
    //       value={onelinkUrl}
    //       onChange={(e) => setOnelinkUrl(e.target.value)}
    //       style={{ width: "300px" }}
    //     />
    //   </div>

    //   <div style={{ padding: "10px 0" }}>
    //     <label style={{ padding: "0 10px 0 0" }}>Upload Game QR:</label>
    //     <input type="file" accept="image/*" onChange={handleQrUpload} />
    //   </div>

    //   <div>
    //     <label style={{ padding: "0 10px 0 0" }}>Select Version: </label>
    //     <select
    //       value={version}
    //       onChange={(e) => setVersion(e.target.value as "v1" | "v2")}
    //     >
    //       <option value="v1">v1</option>
    //       <option value="v2">v2</option>
    //     </select>
    //   </div>

    //   {qrImage && <img src={qrImage} alt="QR Preview" width={150} />}

    //   {error && <p style={{ color: "red" }}>{error}</p>}

    //   {appData && (
    //     <>
    //       <h3>{appData.trackName}</h3>

    //       <img src={appData.artworkUrl512} alt="App Icon" width={150} />

    //       <h4>Screenshots</h4>
    //       <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
    //         {appData.screenshotUrls.map((url: string, i: number) => (
    //           <img key={i} src={url} width={200} />
    //         ))}
    //       </div>

    //       <h4>Description</h4>
    //       <p>{appData.description}</p>

    //       <button onClick={generateAndSave}>Generate Page JSON</button>
    //     </>
    //   )}

    //   {generatedJson && (
    //     <>
    //       <h3>Generated JSON</h3>
    //       <pre style={{ minHeight: 300, overflow: "auto" }}>
    //         {JSON.stringify(generatedJson, null, 2)}
    //       </pre>
    //     </>
    //   )}
    // </>

    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fa",
        padding: "40px 0",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "1100px",
          background: "#ffffff",
          borderRadius: "12px",
          padding: "40px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h2 style={{ marginBottom: "30px" }}>Landing Page Generator</h2>

        {/* App Store Section */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <input
            placeholder="Enter App Store App ID"
            value={appId}
            onChange={(e) => setAppId(e.target.value)}
            style={{
              padding: "10px 14px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              width: "250px",
            }}
          />

          <button
            onClick={fetchFromAppStore}
            style={{
              padding: "10px 18px",
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Fetch App Data
          </button>
        </div>

        <hr style={{ margin: "30px 0" }} />

        {/* Game Details Section */}
        <h3 style={{ marginBottom: "20px" }}>Game Details</h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "30px",
          }}
        >
          <div>
            <label>Game Name</label>
            <input
              value={gameName}
              onChange={(e) => setGameName(e.target.value)}
              placeholder="Enter Game Name"
              style={inputStyle}
            />

            <label style={{ marginTop: "20px", display: "block" }}>
              OneLink URL
            </label>
            <input
              value={onelinkUrl}
              onChange={(e) => setOnelinkUrl(e.target.value)}
              placeholder="Enter OneLink URL"
              style={inputStyle}
            />

            <label style={{ marginTop: "20px", display: "block" }}>
              Upload QR Code
            </label>
            <input type="file" accept="image/*" onChange={handleQrUpload} />

            {qrImage && (
              <img
                src={qrImage}
                alt="QR Preview"
                style={{ marginTop: "15px", width: "120px" }}
              />
            )}

            <label style={{ marginTop: "20px", display: "block" }}>
              Select Version
            </label>
            <select
              value={version}
              onChange={(e) => setVersion(e.target.value as "v1" | "v2")}
              style={inputStyle}
            >
              <option value="v1">v1</option>
              <option value="v2">v2</option>
            </select>
          </div>

          {/* Right Column – App Store Preview */}
          {appData && (
            <div>
              <h4 style={{ marginBottom: "15px" }}>{appData.trackName}</h4>

              <img
                src={appData.artworkUrl512}
                alt="App Icon"
                style={{ width: "120px", borderRadius: "16px" }}
              />

              <h4 style={{ marginTop: "20px" }}>Screenshots</h4>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  overflowX: "auto",
                  paddingBottom: "10px",
                }}
              >
                {appData.screenshotUrls.map((url: string, i: number) => (
                  <img
                    key={i}
                    src={url}
                    style={{
                      width: "150px",
                      borderRadius: "10px",
                      border: "1px solid #eee",
                    }}
                  />
                ))}
              </div>

              <h4 style={{ marginTop: "20px" }}>Description</h4>
              <div
                style={{
                  maxHeight: "150px",
                  overflowY: "auto",
                  fontSize: "14px",
                  color: "#555",
                  lineHeight: "1.6",
                }}
              >
                {appData.description}
              </div>
            </div>
          )}
        </div>

        {error && <p style={{ color: "red", marginTop: "20px" }}>{error}</p>}

        {appData && (
          <div style={{ marginTop: "30px" }}>
            <button
              onClick={generateAndSave}
              style={{
                padding: "12px 22px",
                background: "#16a34a",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Generate Landing Page
            </button>
          </div>
        )}

        {generatedJson && (
          <div style={{ marginTop: "40px" }}>
            <h3>Generated JSON</h3>
            <pre
              style={{
                background: "#f3f4f6",
                padding: "20px",
                borderRadius: "10px",
                maxHeight: "300px",
                overflow: "auto",
                fontSize: "13px",
              }}
            >
              {JSON.stringify(generatedJson, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
