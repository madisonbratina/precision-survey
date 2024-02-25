import mongoose from 'mongoose';
const { Schema } = mongoose;

const couponSchema: any = new Schema(
  {
    code: String,
    provider: String,
    image: String,
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      unique: true
      // default: null
    },
    redeemDate: {
      type: Date
    }
  },
  { timestamps: true }
);

const Coupon = mongoose.models.Coupon || mongoose.model('Coupon', couponSchema);
export default Coupon;
