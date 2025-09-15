import mongoose, { Schema, Document } from "mongoose";

export interface IMedicine extends Document {
  name: string;
  quantity: number;
  price: number;
  pharmacy: string; // pharmacy user ID or name
}

const MedicineSchema = new Schema<IMedicine>(
  {
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    pharmacy: { type: String, required: true },
  },
  { timestamps: true }
);

const Medicine = mongoose.models.Medicine || mongoose.model("Medicine", MedicineSchema);
export default Medicine;
