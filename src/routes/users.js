import express from 'express';
import User from '../models/User';
import parseErrors from '../utils/parseErrors';

const router = express.Router();

router.post('/',(req, res)=> {
  const { email, password } = req.body.user;
  const user = new User({ email });
  user.setPassword(password);
  //  err object contains lot of info but we want
  // to extract only required part for which
  // we need parser and thus we created utils/parseErrors.js
  user.save()
    .then( userRecord => res.json({  user: userRecord.toAuthJSON()  }))
    .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
})

export default router;
