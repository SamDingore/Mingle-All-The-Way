const express = require('express');
const apiController = require('../controllers/api')

const router = express.Router();


router.post('/join', apiController.join )

router.post('/sign_in', apiController.login)

router.post('/match', apiController.match)

router.post('/login', apiController.login)

router.post('/search', apiController.search)

router.post('/match', apiController.match)

router.post('/profile', apiController.profile)

router.post('/dashboard', apiController.dashboard)

router.post('/view_profile', apiController.view_profile)

  module.exports = router;
