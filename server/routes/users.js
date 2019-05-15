const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');

const { validateBody, schemas } = require('../helpers/routeHelpers');
const UsersController = require('../controllers/users');
const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/signup')
  .post(validateBody(schemas.authSchema), UsersController.signUp);

router.route('/signin')
  .post(validateBody(schemas.authSchema), passportSignIn, UsersController.signIn);

router.route('/signout')
  .get(passportJWT, UsersController.signOut);

router.route('/oauth/google')
  .post(passport.authenticate('googleToken', { session: false }), UsersController.googleOAuth);

router.route('/oauth/facebook')
  .post(passport.authenticate('facebookToken', { session: false }), UsersController.facebookOAuth);

router.route('/oauth/link/google')
  .post(passportJWT, passport.authorize('googleToken', { session: false }), UsersController.linkGoogle)

router.route('/oauth/unlink/google')
  .post(passportJWT, UsersController.unlinkGoogle);

router.route('/oauth/link/facebook')
  .post(passportJWT, passport.authorize('facebookToken', { session: false }), UsersController.linkFacebook)

router.route('/oauth/unlink/facebook')
  .post(passportJWT, UsersController.unlinkFacebook);

router.route('/dashboard')
  .get(passportJWT, UsersController.dashboard);

router.route('/status')
  .get(passportJWT, UsersController.checkAuth);

module.exports = router;