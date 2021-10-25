const express = require('express')
const router = express.Router()
const {
  getContacts,
  getContactById,
  addContact, removeContact,
  updateContact,
  updateStatusContact
} = require('../../controllers/contacts')

const {
  validContact,
  validUpdateContact,
  validPutContact,
  validStatusContact,
  validId
} = require('../../validation/validation')
const guard = require('../../helpers/guard')

router.get('/', guard, getContacts)

router.get('/:contactId', guard,
  validId,
  getContactById)

router.post('/', guard,
  validContact,
  addContact)

router.delete('/:contactId', guard,
  validId,
  removeContact)

router.put('/:contactId', guard,
  validId,
  validPutContact,
  updateContact)

router.patch('/:contactId/favorite', guard,
  validId, validStatusContact,
  validUpdateContact,
  updateStatusContact)

module.exports = router
