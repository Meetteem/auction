"use client";
import { useEffect, useState } from 'react';

export default function Home() {
  const [imageList, setImageList] = useState([]);
  const [remaining, setRemaining] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  const [imageName, setImageName] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch('/api/images');
      const data = await res.json();
      setImageList(data);
      setRemaining(data);
    };
    fetchImages();
  }, []);

  const showRandomImage = () => {
    if (remaining.length === 0) return;

    const randomIndex = Math.floor(Math.random() * remaining.length);
    const selected = remaining[randomIndex];
    setCurrentImage(`/images/${selected}`);

    // Remove file extension and show name
    const nameWithoutExtension = selected.split(".")[0].replace(/[-_]/g, " ");
    setImageName(nameWithoutExtension);

    setRemaining(prev => prev.filter((_, i) => i !== randomIndex));
  };

  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "2rem",
      backgroundColor: "#000000", // black background
      color: "white" // default text color to white
    }}>
      <h1 style={{
        fontSize: "2.5rem",
        marginBottom: "1.5rem",
        fontWeight: "bold",
        color: "#ffffff"
      }}>
        Swayamsevak Premiere League Auction
      </h1>

      {currentImage && (
        <>
          <img
            src={currentImage}
            alt="Random"
            style={{
              width: "750px",
              height: "700px",
              objectFit: "contain",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(255,255,255,0.2)",
              marginBottom: "1rem"
            }}
          />
          <p style={{
            fontWeight: "bold",
            marginBottom: "1rem",
            fontSize: "1.2rem",
            color: "#ffffff"
          }}>
            {imageName}
          </p>
        </>
      )}

      <div>
        <button
          onClick={showRandomImage}
          disabled={remaining.length === 0}
          style={{
            padding: "0.6rem 1.2rem",
            fontSize: "1rem",
            marginRight: "1rem",
            cursor: "pointer",
            borderRadius: "8px",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none"
          }}
        >
          {remaining.length === 0 ? 'No more images' : 'Show Random Photo'}
        </button>

        {remaining.length === 0 && (
          <button
            onClick={() => {
              setRemaining([...imageList]);
              setCurrentImage(null);
              setImageName("");
            }}
            style={{
              padding: "0.6rem 1.2rem",
              fontSize: "1rem",
              cursor: "pointer",
              borderRadius: "8px",
              backgroundColor: "#555",
              color: "white",
              border: "none"
            }}
          >
            Restart
          </button>
        )}
      </div>
    </main>
  );
}
   