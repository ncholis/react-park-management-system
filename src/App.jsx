//Components
import ParkingMap from "./components/ParkingMap/ParkingMap";
import ParkingDetails from "./components/ParkingDetails/ParkingDetails";

//Toast
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
    <h1 className="text-3xl font-bold m-5">
      Sistem Pengelolaan Parkiran Mobil
    </h1>

    <div className="App bg-gray-700">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {/* Parking Map */}
        <div className="text-white bg-gray-800 p-3 rounded-lg shadow-lg overflow-y-auto h-[39rem]"
            style={{ scrollbarWidth: "none" }}
        >
          <ParkingMap />
        </div>

        {/* Parking Details */}
        <div className="bg-gray-100 text-gray-700 p-6 rounded-lg shadow-lg overflow-y-auto">
          <h2 className="text-lg font-bold mb-4">Rincian Pemesanan Parkir</h2>
          <div className="p-6 rounded-lg shadow-lg overflow-auto max-h-[33rem]">
            <ParkingDetails />
          </div>
        </div>
      </div>
    </div>

    <ToastContainer />
    </>
  );
}

export default App;