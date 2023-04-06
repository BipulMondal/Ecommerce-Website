const { expressjwt: jwt } = require ("express-jwt");

function authJwt () {
    const secret = process.env.SECRET;
    const api = process.env.API_URL;
    return jwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            {url: /\/public\/uploads\/(.*)/, method: ["GET", "OPTIONS"]},
            {url: /\/api\/v1\/products(.*)/, method: ["GET", "OPTIONS"]},
            {url: /\/api\/v1\/orders(.*)/, method: [ "GET", "OPTIONS", "POST"]},
            {url: /\/api\/v1\/cartItems(.*)/, method: ["GET" , "OPTIONS", "POST"]},
            {url: /\/api\/v1\/users(.*)/, method: ["GET", "OPTIONS", "POST"]},
            `${api}/users/login`,
            `${api}/users/register`,

        ]
    })
}

async function isRevoked(req, payload) {
    // console.log(payload);
    if (payload.isAdmin == false) {
    //   console.log('Not Admin');
      return true;
    }
    // console.log('Admin');
    return false;
  }
  
module.exports = authJwt;
