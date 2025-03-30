const jwt = require('jsonwebtoken');

exports.validateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err instanceof jwt.TokenExpiredError) {
            return res.sendStatus(401)
        }
        if (err) return res.sendStatus(403)

        req.visit = decoded

        next()
    })
}

exports.validateAdminToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err instanceof jwt.TokenExpiredError) {
            return res.sendStatus(401)
        }
        if (err) return res.sendStatus(403)

        req.admin = decoded

        next()
    })
}

// exports.authJwt = (req, res, next) => {
//     const token = req.cookies.authToken;
//     try {
//       const user = jwt.verify(token, config.JWT_SECRET);
//       req.user = user;
//       next();
//     } catch (err) {
//       res.clearCookie(config.authToken);
//       return res.redirect(config.redirectUrl);
//     }
// };