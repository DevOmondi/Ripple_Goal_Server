const Hashids = require("hashids/cjs");

const hashids = new Hashids("87fb2e68c3d69730383108611576ccfe", 10);

module.exports = {
  encodeId: (id) => hashids.encode(id),
  decodeId: (hash) => hashids.decode(hash)[0] || null,
};
