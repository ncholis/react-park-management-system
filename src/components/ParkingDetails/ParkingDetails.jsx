import { useEffect, useState } from "react";
import "./ParkingDetails.css";

const ParkingDetails = () => {
  const [dataOrder, setDataOrder] = useState([]);

  // Fungsi untuk konversi epoch ke datetime
  const formatDateTime = (epoch) => {
    if (!epoch) return "-";

    const date = new Date(Number(epoch) * 1000); // Konversi epoch ke milidetik
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Bulan dimulai dari 0
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  const updateOrderData = () => {
    const storedData = localStorage.getItem("order_parking");
    setDataOrder(JSON.parse(storedData));
  };

  useEffect(() => {
    const storedData = localStorage.getItem("order_parking");
    if (storedData) {
      setDataOrder(JSON.parse(storedData));
    }

    //interval untuk ambil data storage per 1 detik
    const intervalId = setInterval(updateOrderData, 1000);
    return () => {
      //remove interval ketika unmount
      clearInterval(intervalId);
    };
  }, []);

  return (
    <table className="table-auto w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="pd-cell text-left">Parkir</th>
          <th className="pd-cell text-left">Nomor Plat</th>
          <th className="pd-cell text-left">Durasi (menit)</th>
          <th className="pd-cell text-left">Mulai</th>
          <th className="pd-cell text-left">Akhir</th>
        </tr>
      </thead>
      <tbody className="h-screen overflow-y-scroll">
        {dataOrder &&
          dataOrder
            .map((item) => (
              <tr key={item.startTime}>
                <td className="pd-cell">P{item.spot}</td>
                <td className="pd-cell">{item.vehicleNumber}</td>
                <td className="pd-cell">{item.duration}</td>
                <td className="pd-cell">{formatDateTime(item.startTime)}</td>
                <td className="pd-cell">{formatDateTime(item.endTime)}</td>
              </tr>
            ))
            .reverse()}
      </tbody>
    </table>
  );
};

export default ParkingDetails;
