import React, { useState } from "react";

const districts = [ 'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya',
        'Galle', 'Matara', 'Hambantota', 'Jaffna', 'Kilinochchi', 'Mannar',
        'Mullaitivu', 'Vavuniya', 'Batticaloa', 'Ampara', 'Trincomalee',
        'Kurunegala', 'Puttalam', 'Anuradhapura', 'Polonnaruwa', 'Badulla',
        'Monaragala', 'Ratnapura', 'Kegalle'];
const products = ["Flowers", "Chocolates", "Gift Card", "Perfume"];

const PurchaseForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    location: "",
    product: "",
    quantity: 1,
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const disableSundays = (date) => {
    const day = new Date(date).getDay();
    return day === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Purchase successful!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <form
        className="bg-white p-6 rounded-lg w-96 space-y-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold">Purchase Form</h2>
        <label className="block">
          Date of Purchase:
          <input
            type="date"
            name="date"
            min={new Date().toISOString().split("T")[0]}
            value={formData.date}
            onChange={(e) => {
              if (!disableSundays(e.target.value)) {
                handleChange(e);
              } else {
                alert("Sundays are not allowed!");
              }
            }}
            className="w-full border p-2 rounded"
            required
          />
        </label>

        <label className="block">
          Preferred Delivery Time:
          <select
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Time</option>
            <option value="10 AM">10 AM</option>
            <option value="11 AM">11 AM</option>
            <option value="12 PM">12 PM</option>

              <option value="2 PM">10 PM</option>
            <option value="3 PM">11 PM</option>
            <option value="4 PM">12 PM</option>
          </select>
        </label>


        <label className="block">
          Delivery Location:
          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select District</option>
            {districts.map((d, i) => (
              <option key={i} value={d}>
                {d}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          Product Name:
          <select
            name="product"
            value={formData.product}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Product</option>
            {products.map((p, i) => (
              <option key={i} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          Quantity:
          <input
            type="number"
            name="quantity"
            min="1"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </label>

      
        <label className="block">
          Message:
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </label>

        <div className="flex justify-between">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Purchase
          </button>
        </div>
      </form>
    </div>
  );
};

export default PurchaseForm;
