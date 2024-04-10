import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser } from './userTypes';
import logger from '../../middleware/logger';

function capitalize(val: string): string {
  if (typeof val !== 'string') val = '';
  return val.charAt(0).toUpperCase() + val.substring(1).toLowerCase();
}

const userSchema = new mongoose.Schema<IUser>({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
    set: capitalize,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
    set: capitalize,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (v: string) {
        return /(?=.*\d)(?=.*[A-Z])(?=.*\W)/.test(v);
      },
      message: () => 'Password must contain at least one number, one uppercase letter, and one special character.',
    },
  },
  createdAt: { type: Date, default: Date.now },
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (error: unknown) {
      logger.error('Error hashing password:', { error });
      next(new Error('Failed to hash password'));
    }
  } else {
    next();
  }
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;
