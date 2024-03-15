import mongoose from 'mongoose';
const { Schema } = mongoose;

const emailDomainSchema = new Schema(
  {
    domain: {
      type: String,
      required: true,
      unique: true
    }
  },
  { timestamps: true }
);

const EmailDomain = mongoose.models.EmailDomain || mongoose.model('EmailDomain', emailDomainSchema);
export default EmailDomain;
