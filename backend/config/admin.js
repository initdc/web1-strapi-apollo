module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '72590bdb58f7610884dc9525cea40fb7'),
  },
});
