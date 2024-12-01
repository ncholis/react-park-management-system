import { useState, useEffect, useRef } from "react";
import { Circle, Stage, Layer, Text, Image } from "react-konva";

//COMPONENT
import ModalForm from "../ModalForm/ModalForm";
import ParkingSpot from "../ParkingSpot/ParkingSpot";
import { toast } from "react-toastify";

const ParkingMap = () => {
  const [animationTriggered, setAnimationTriggered] = useState(null);
  const [bgImage, setBgImage] = useState(null);
  const imageRef = useRef(null);
  const [spots, setSpots] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState(null);

  // Fungsi untuk menangani klik pada tempat parkir
  const handleSpotClick = (spot) => {
    //animasi mobil
    setAnimationTriggered(spot);

    if (spot.isAvailable) {
      setSelectedSpot(spot);
      setIsModalOpen(true); // Buka modal form pemesanan
    }
  };

  // Fungsi untuk menutup modal
  const handleCloseModal = () => {
    setIsModalOpen(false); // Tutup modal
  };

  const handleParkirOrder = (formData) => {
    var data = JSON.parse(localStorage.getItem("order_parking"));
    if (!data) {
      data = [];
    }

    data.push(formData);
    localStorage.setItem("order_parking", JSON.stringify(data));
  };

  // Fungsi untuk menangani pemesanan tempat parkir
  const handleSubmitBooking = (formData) => {
    const startTime = Math.floor(Date.now() / 1000); // Waktu mulai dalam format Unix timestamp
    const endTime = startTime + formData.duration * 60; // Hitung waktu selesai berdasarkan durasi (dalam detik)

    // Update status parkir dan simpan durasi serta waktu mulai dan selesai
    const updatedSpots = spots.map((s) =>
      s.id === formData.spot.id
        ? {
            ...s,
            isAvailable: false,
            duration: formData.duration,
            startTime,
            endTime,
          }
        : s
    );

    setSpots(updatedSpots);
    localStorage.setItem("parking", JSON.stringify(updatedSpots)); // Simpan ke localStorage

    //Handle log parkir
    handleParkirOrder({
      spot: formData.spot.id,
      duration: formData.duration,
      vehicleNumber: formData.vehicleNumber,
      startTime: startTime,
      endTime: endTime,
    });

    // tampilkan toast konfirmasi
    toast.success("Berhasil di pesan", {
      autoClose: 3000,
      theme: "colored",
    });
  };

  // Fungsi untuk inisialisasi data parkir jika tidak ada di localStorage
  const initializeParkingData = () => {
    const defaultSpots = Array.from({ length: 8 }, (_, index) => ({
      x: 160 + (index % 4) * 109,
      y: 50 + Math.floor(index / 4) * 270,
      isAvailable: true,
      id: index + 1,
      duration: 0,
      startTime: null,
      endTime: null,
    }));

    setSpots(defaultSpots);
    localStorage.setItem("parking", JSON.stringify(defaultSpots)); // Menyimpan data parkir ke localStorage
  };

  // Fungsi untuk memperbarui status parkir setiap 30 detik
  const updateParkingStatus = () => {
    const realTime = Math.floor(Date.now() / 1000); // Waktu lokal komputer dalam format Unix timestamp
    const spotx = JSON.parse(localStorage.getItem("parking", []));
    const updatedSpots = spotx.map((spot) => {
      if (spot.endTime && spot.endTime <= realTime) {
        // Jika waktu parkir telah habis, ubah status parkir menjadi tersedia
        return {
          ...spot,
          isAvailable: true,
          duration: 0,
          startTime: null,
          endTime: null,
        };
      }
      return spot;
    });

    setSpots(updatedSpots);
    localStorage.setItem("parking", JSON.stringify(updatedSpots)); // Simpan status terbaru ke localStorage
  };

  // Gunakan useEffect untuk memeriksa data parkir saat pertama kali aplikasi dimuat
  useEffect(() => {
    //Gambar Parking Map
    const img = new window.Image();
    img.src = "/images/bg-park2.png";
    img.onload = () => {
      setBgImage(img);
    };

    const storedData = localStorage.getItem("parking");
    if (!storedData || JSON.parse(storedData).length === 0) {
      initializeParkingData(); // Jika data kosong, inisialisasi data parkir
    } else {
      setSpots(JSON.parse(storedData)); // Gunakan data yang ada di localStorage
    }

    if (animationTriggered !== null) {
      const timeout = setTimeout(() => {
        setAnimationTriggered(null);
      }, 4000);
      return () => clearTimeout(timeout);
    }

    // Set interval untuk memeriksa status parkir setiap 2 detik
    const intervalId = setInterval(updateParkingStatus, 2000);

    // Bersihkan interval saat komponen di-unmount
    return () => clearInterval(intervalId);
  }, []); // Hanya sekali saat pertama kali aplikasi dimuat

  return (
    <>
      <Stage width={760} height={window.innerHeight / 1.5}>
        <Layer>
          {/* Background Image */}
          {bgImage && (
            <Image
              image={bgImage}
              x={0}
              y={0}
              width={720}
              height={450}
              cornerRadius={20}
              ref={imageRef}
            />
          )}

          <Circle x={30} y={30} radius={20} fill="green" />

          <Text
            x={55}
            y={30}
            text="Clickable"
            fontSize={12}
            fontFamily="Calibri"
            fill="white"
          />

          <Circle x={30} y={75} radius={20} fill="orange" />

          <Text
            x={55}
            y={75}
            text="No Clickable"
            fontSize={12}
            fontFamily="Calibri"
            fill="white"
          />

          {/* Parking Spot */}
          {spots.map((spot, index) => (
            <ParkingSpot
              key={index}
              spot={spot}
              onSpotClick={handleSpotClick}
              animationTriggered={animationTriggered}
            ></ParkingSpot>
          ))}
        </Layer>
      </Stage>

      {isModalOpen && (
        <ModalForm
          spot={selectedSpot}
          onClose={handleCloseModal}
          onSubmit={handleSubmitBooking}
        />
      )}
    </>
  );
};
export default ParkingMap;
