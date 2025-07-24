import Redis from "ioredis";

export const redis = new Redis(
  "rediss://default:AVNS_b1EDkNmX4YhqUylEC5Y@valkey-1ff3fbe2-hemanth02135-c08c.d.aivencloud.com:26970"
);

redis.on("connect", () => {
  console.log("redis connected");
});

redis.on("error", (err) => {
  console.error("Redis error:", err);
});
