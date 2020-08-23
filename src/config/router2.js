// import { Router } from 'express';
// import passport from 'passport';
// import users from './users';
// import jwtConfig from './jwtConfig';


// const jwt = require('jwt-simple');

// const anonAuth = passport.authenticate('local');

// export const endAnonHandler = (req, res) => {
//   if (req.body.email && req.body.password) {
//     const { email } = req.body;
//     const { password } = req.body;
//     const user = users.find(u => u.email === email && u.password === password);
//     if (user) {
//       const payload = {
//         id: user.id,
//       };
//       const token = jwt.encode(payload, jwtConfig.jwtSecret);
//       res.json({
//         token,
//       });
//     } else {
//       res.sendStatus(401);
//     }
//   } else {
//     res.sendStatus(401);
//   }
// };
// const router2 = Router();
// router2
//   .post('/anonymous/login', anonAuth, endAnonHandler);

// export default router2;
