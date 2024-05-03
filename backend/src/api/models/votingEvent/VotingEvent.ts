import mongoose from 'mongoose';
import { Option, StorageType, EventType } from '../../types/event.types';
import logger from '../../middleware/logger';
import { capitalize } from '../../utils';

// mngoose schema for an option in the voting event
const optionSchema = new mongoose.Schema<Option>(
  {
    name: {
      type: String,
      set: capitalize,
    },
    bio: {
      type: String,
      set: capitalize,
    },
    option: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

// mongoose schema for a voting event
const votingEventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 500,
  },
  options: [optionSchema],
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  timezone: {
    type: String,
    required: true,
    trim: true,
  },
  voterEligibility: {
    type: String,
    required: true,
    trim: true,
  },
  votingMethod: {
    type: String,
    required: true,
    trim: true,
  },
  anonymity: {
    type: Boolean,
    required: true,
  },
  resultVisibility: {
    type: Boolean,
    required: true,
  },
  storageType: {
    type: String,
    enum: Object.values(StorageType),
    required: true,
  },
  eventType: {
    type: String,
    enum: Object.values(EventType),
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

votingEventSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    logger.info('Saving new event with title:', this.title);
  }
  next();
});

const VotingEvent = mongoose.model('VotingEvent', votingEventSchema);
export default VotingEvent;
