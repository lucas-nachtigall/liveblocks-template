const api = require('lambda-api')();
const { authorize } = require('@liveblocks/node');

const { LIVEBLOCKS_SECRET } = process.env;

api.post('/liveblocks/auth', async (req, res) => {
  try {
    const authRes = await authorize({
      room: req.body.room,
      secret: LIVEBLOCKS_SECRET,
    });

    res.status(200).send(authRes.body);
  } catch (e) {
    console.error(e);
    res.error(e);
  }
});

exports.handler = async (event, context) => {
  return await api.run(event, context);
};
