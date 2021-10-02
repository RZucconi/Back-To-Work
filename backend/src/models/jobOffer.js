const mongoose = require('mongoose')

const jobOfferSchema = new mongoose.Schema({
  source: {
    type: String,
    trim: true
  },
  contactName: {
    type: String,
    trim: true
  },
  contactEmail: {
    type: String,
    trim: true
  },
  contactPhone: {
    type: String,
    trim: true
  },
  contactCellphone: {
    type: String,
    trim: true
  },
  curriculumVitae: {
    buffer: {
      type: Buffer,
      default: undefined
    },
    mimetype: {
      type: String,
      default: undefined
    }
  },
  coverLetter: {
    buffer: {
      type: Buffer,
      default: undefined
    },
    mimetype: {
      type: String,
      default: undefined
    }
  },
  comment: {
    type: String,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:  'User'
  }
}, {
  timestamps: true
})

const JobOffer = mongoose.model('jobOffer', jobOfferSchema)

module.exports = JobOffer