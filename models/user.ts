import mongoose from 'mongoose';
import validator from 'validator';
import AutoIncrementFactory from 'mongoose-sequence';
const { Schema } = mongoose;
const AutoIncrement = AutoIncrementFactory(mongoose as any);

const userSchema: any = new Schema(
  {
    contactId: {
      type: Number
    },
    firstName: {
      type: String,
      trim: true,
      default: null
    },
    lastName: {
      type: String,
      trim: true,
      default: null
    },
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
    profilingQuestions: [
      {
        question: { type: String },
        answer: { type: String },
        createdAt: { type: Date, default: Date.now }
      }
    ],
    surveyStep: {
      type: Number,
      default: 0
    },
    couponId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Coupon'
    },
    surveyCompleteDate: {
      type: Date
    }
  },
  { timestamps: true }
);

userSchema.plugin(AutoIncrement, { inc_field: 'contactId', start_seq: 1 });
const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
