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

      const res = await fetch(`http://localhost:4000/appstore?appId=${appId}`);

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
    <>
      <h2>Extract Images From App Store</h2>

      <input
        placeholder="Enter App Store App ID"
        value={appId}
        onChange={(e) => setAppId(e.target.value)}
      />
      <button onClick={fetchFromAppStore}>Fetch</button>

      <hr />

      <h3>Game Details</h3>

      <input
        placeholder="Enter Game Name"
        value={gameName}
        onChange={(e) => setGameName(e.target.value)}
      />

      <div>
        <label>Upload Game QR</label>
        <input type="file" accept="image/*" onChange={handleQrUpload} />
      </div>

      <div>
        <label>Select Version: </label>
        <select
          value={version}
          onChange={(e) => setVersion(e.target.value as "v1" | "v2")}
        >
          <option value="v1">v1</option>
          <option value="v2">v2</option>
        </select>
      </div>

      {qrImage && <img src={qrImage} alt="QR Preview" width={150} />}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {appData && (
        <>
          <h3>{appData.trackName}</h3>

          <img src={appData.artworkUrl512} alt="App Icon" width={150} />

          <h4>Screenshots</h4>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {appData.screenshotUrls.map((url: string, i: number) => (
              <img key={i} src={url} width={200} />
            ))}
          </div>

          <h4>Description</h4>
          <p>{appData.description}</p>

          <button onClick={generateAndSave}>Generate Page JSON</button>
        </>
      )}

      {generatedJson && (
        <>
          <h3>Generated JSON</h3>
          <pre style={{ minHeight: 300, overflow: "auto" }}>
            {JSON.stringify(generatedJson, null, 2)}
          </pre>
        </>
      )}
    </>
  );
}
