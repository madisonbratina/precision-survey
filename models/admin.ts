import mongoose from 'mongoose';
import validator from 'validator';
import AutoIncrementFactory from 'mongoose-sequence';
const { Schema } = mongoose;

const adminSchema: any = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      }
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);
export default Admin;
