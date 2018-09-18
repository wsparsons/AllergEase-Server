const environment = process.env.NODE_ENV || "development";

const knexConfig = require("../../knexfile")[environment];
const knex = require("knex")(knexConfig);

module.exports = knex;


// https://api.nal.usda.gov/ndb/search/?format=json&api_key=XoSPvLyxl1RFd60aG8Z6f5hrJZdrNAcMPOfg6eHX&q=041570130025
// https://api.nal.usda.gov/ndb/V2/reports?type=f&format=json&api_key=XoSPvLyxl1RFd60aG8Z6f5hrJZdrNAcMPOfg6eHX&ndbno=45224339

// https://api.nal.usda.gov/ndb/search/?format=json&api_key=XoSPvLyxl1RFd60aG8Z6f5hrJZdrNAcMPOfg6eHX&q=632432737775
// https://api.nal.usda.gov/ndb/V2/reports?type=f&format=json&api_key=XoSPvLyxl1RFd60aG8Z6f5hrJZdrNAcMPOfg6eHX&ndbno=45296282

// https://api.nal.usda.gov/ndb/search/?format=json&api_key=XoSPvLyxl1RFd60aG8Z6f5hrJZdrNAcMPOfg6eHX&q=072830400244
// https://api.nal.usda.gov/ndb/V2/reports?type=f&format=json&api_key=XoSPvLyxl1RFd60aG8Z6f5hrJZdrNAcMPOfg6eHX&ndbno=45227621

// https://api.nal.usda.gov/ndb/search/?format=json&api_key=XoSPvLyxl1RFd60aG8Z6f5hrJZdrNAcMPOfg6eHX&q=812891020735
// https://api.nal.usda.gov/ndb/V2/reports?type=f&format=json&api_key=XoSPvLyxl1RFd60aG8Z6f5hrJZdrNAcMPOfg6eHX&ndbno=45161457
// https://api.nal.usda.gov/ndb/search/?format=json&sort=n&max=25&offset=0&api_key=XoSPvLyxl1RFd60aG8Z6f5hrJZdrNAcMPOfg6eHX&q=BEANITOS
