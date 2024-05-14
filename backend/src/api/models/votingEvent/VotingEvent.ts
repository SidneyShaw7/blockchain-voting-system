import mongoose from 'mongoose';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';
import { Option, StorageType, EventType } from '../../types/event.types';
import logger from '../../middleware/logger';
import { capitalize } from '../../utils';

// mngoose schema for an option in the voting event
const optionSchema = new mongoose.Schema<Option>({
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
  votes: {
    type: Number,
    default: 0,
  },
  voters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

// virtual 'id' field to optionSchema for client side easy using
optionSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
optionSchema.set('toJSON', { virtuals: true });
optionSchema.set('toObject', { virtuals: true });

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
  // voterEligibility: {
  //   type: String,
  //   required: true,
  //   trim: true,
  // },
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
  invitedPersons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

//  virtual 'id' field to votingEventSchema for client side easy using
votingEventSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
votingEventSchema.set('toJSON', { virtuals: true });
votingEventSchema.set('toObject', { virtuals: true });

votingEventSchema.plugin(mongooseLeanVirtuals); // installing plugin for just getting id instead of _id for my frontend; crazy insane

votingEventSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    logger.info('Saving new event with title:', this.title);
  }
  next();
});

const VotingEvent = mongoose.model('VotingEvent', votingEventSchema);
export default VotingEvent;
