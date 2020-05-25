/* eslint-disable max-len */
/* eslint-disable require-unicode-regexp */
const mongoose = require('mongoose')
const { Schema } = mongoose

const businessSchema = new Schema({
  businessName: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  ownerName: {
    type: String,
    required: true
  },
  ownerId: {
    type: String,
    required: [true, 'OwnerId is required.']
  },
  branchOfService: {
    type: String,
    required: true
  },
  industry: {
    type: String,
    required: true
  },
  areasServiced: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    validate: {
      validator (validData) {
        return (/\d{3}-\d{3}-\d{4}/).test(validData)
      },
      message: (props) => `${props.value} is not a valid phone number.`
    },
    required: [true, 'Business phone number required']
  },
  email: {
    type: String,
    validate: {
      validator: (validData) => {
        return (/^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+(?:[a-zA-Z]{2}|aero|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel)$/).test(validData)
      },
      message: (props) => `${props.value} is not a valid email.`
    },
    required: [true, 'Business email required']
  },
  website: {
    type: String,
    required: [true, 'Website is Required']
  }
})

module.exports = mongoose.model('business', businessSchema)
