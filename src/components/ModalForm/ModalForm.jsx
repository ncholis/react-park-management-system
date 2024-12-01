import { useState } from "react";
import PropTypes from "prop-types";

import "./ModalForm.css";

const ModalForm = ({ spot, onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [duration, setDuration] = useState("");
  const [isVisible, setVisible] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && vehicleNumber && duration) {
      onSubmit({ name, vehicleNumber, duration, spot });
      handleVisible()
    } else {
      alert("Harap isi semua field.");
    }
  };

  const handleVisible = () => {
    setVisible(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }

  return (
    <div 
    className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center"
    >
      <div 
      className={`modal bg-white p-6 rounded-lg shadow-lg w-96 ${ isVisible ? "modal-enter" : "modal-exit"}`}
      >
        <h2 className="heading-form">Form Pemesanan Tempat Parkir ( P{spot.id} ) </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="label-form">Nama</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-form"
              placeholder="Steve"
              required
            />
          </div>
          <div className="mb-4">
            <label className="label-form">Nomor Kendaraan</label>
            <input
              type="text"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
              className="input-form"
              placeholder="B-1234-ASD"
              required
            />
          </div>
          <div className="mb-4">
            <label className="label-form">Durasi (menit)</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="input-form"
              placeholder="10"
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleVisible}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg"
            >
              Tutup
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Pesan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Validasi prop types
ModalForm.propTypes = {
  spot: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ModalForm;
