// models/Unicon.js
import mongoose from 'mongoose';

const uniconSchema = new mongoose.Schema({
  UniconID: {
    type: String,
    required: true,
  },
  position: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Unicon = mongoose.model('Unicon', uniconSchema);

export default Unicon;
