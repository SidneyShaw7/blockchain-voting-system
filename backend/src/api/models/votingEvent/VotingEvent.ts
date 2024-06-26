import mongoose from 'mongoose';
// import mongooseLeanVirtuals from 'mongoose-lean-virtuals';
import { StorageType, EventType } from '../../types/event.types';
import logger from '../../middleware/logger';
import { capitalize } from '../../utils';
import { addIdVirtual } from '../../utils';

const optionSchema = new mongoose.Schema({
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
    required: function () {
      return this.parent().eventType === 'General';
    },
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

addIdVirtual(optionSchema);

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

addIdVirtual(votingEventSchema);

votingEventSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    logger.info('Saving new event with title:', this.title);
  }
  next();
});

const VotingEvent = mongoose.model('VotingEvent', votingEventSchema);
export default VotingEvent;
