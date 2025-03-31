"use client";
import { useEffect, useState } from 'react'

export default function Home() {
  const [captainList, setCaptainList] = useState([]);
  const [playerList, setPlayerList] = useState([]);
  const [remainingCaptains, setRemainingCaptains] = useState([]);
  const [remainingPlayers, setRemainingPlayers] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [isCaptainsFirst, setIsCaptainsFirst] = useState(true); // To control the flow of captains and players
  const [showPlayersHeader, setShowPlayersHeader] = useState(false); // To show "Players" header after captains are shown

  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch('/api/images');
      const data = await res.json();

      if (data.error) {
        console.error('Error fetching images:', data.error);
        return;
      }

      setCaptainList(data.captains);
      setPlayerList(data.players);
      setRemainingCaptains(data.captains);
      setRemainingPlayers(data.players);
    };

    fetchImages();
  }, []);

  const showRandomImage = () => {
    if (isCaptainsFirst) {
      // Show captains if available
      if (remainingCaptains.length > 0) {
        const randomIndex = Math.floor(Math.random() * remainingCaptains.length);
        const selected = remainingCaptains[randomIndex];
        setCurrentImage(`/captains/${selected}`);
        const nameWithoutExtension = selected.split(".")[0].replace(/[-_]/g, " ");
        setImageName(nameWithoutExtension);
        setRemainingCaptains(prev => prev.filter((_, i) => i !== randomIndex));
      } else {
        // Once all captains are shown, switch to players
        setIsCaptainsFirst(false);
        setShowPlayersHeader(true);
      }
    } else {
      // Show players if available
      if (remainingPlayers.length > 0) {
        const randomIndex = Math.floor(Math.random() * remainingPlayers.length);
        const selected = remainingPlayers[randomIndex];
        setCurrentImage(`/players/${selected}`);
        const nameWithoutExtension = selected.split(".")[0].replace(/[-_]/g, " ");
        setImageName(nameWithoutExtension);
        setRemainingPlayers(prev => prev.filter((_, i) => i !== randomIndex));
      }
    }
  };

  const restart = () => {
    setRemainingCaptains([...captainList]);
    setRemainingPlayers([...playerList]);
    setIsCaptainsFirst(true); // Restart with captains first
    setShowPlayersHeader(false); // Hide "Players" header until the next switch
    setCurrentImage(null);
    setImageName("");
  };

  const allShown = (remainingCaptains.length === 0 && remainingPlayers.length === 0);

  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "2rem",
      backgroundColor: "#000000",
      color: "white"
    }}>
      <h1 style={{
        fontSize: "2.5rem",
        marginBottom: "1.5rem",
        fontWeight: "bold",
        color: "#ffffff"
      }}>
        Swayamsevak Premiere League 2 : Auction
      </h1>

      {/* Display "Captains" header below the main title */}
      {isCaptainsFirst && (
        <h2 style={{
          fontSize: "2rem",
          fontWeight: "bold",
          marginBottom: "1.5rem",
          color: "#ffffff"
        }}>
          Captain
        </h2>
      )}

      {/* Display captains or players */}
      {currentImage && (
        <>
          <div style={{
            position: 'relative',
            width: '750px',
            height: '700px',
            marginBottom: '1rem',
          }}>
            <img
              src={currentImage}
              alt="Random"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                borderRadius: '10px',
                boxShadow: '0 4px 10px rgba(255,255,255,0.2)',
              }}
            />
          </div>

          <p style={{
            fontWeight: 'bold',
            marginBottom: '1rem',
            fontSize: '1.2rem',
            color: '#ffffff'
          }}>
            {imageName}
          </p>
        </>
      )}

      {/* Show "Players" header after all captains are shown */}
      {showPlayersHeader && (
        <h2 style={{
          fontSize: "2rem",
          fontWeight: "bold",
          marginBottom: "1.5rem",
          color: "#ffffff"
        }}>
          Player
        </h2>
      )}

      {/* Show Random Photo Button */}
      <div>
        <button
          onClick={showRandomImage}
          disabled={allShown}
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
          {allShown ? 'No more images' : 'Next'}
        </button>

        {/* Restart Button */}
        {allShown && (
          <button
            onClick={restart}
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
