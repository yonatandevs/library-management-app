import NodeCache from "node-cache";

// Create a cache instance with a default TTL (Time To Live) of 60 seconds
const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 }); // 60 seconds TTL, checks every 120 seconds

export default cache;
