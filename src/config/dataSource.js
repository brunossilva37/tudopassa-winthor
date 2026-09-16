export function getDataSource() { return (process.env.DATA_SOURCE || "mock").toLowerCase(); }
export function isOracle() { return getDataSource() === "oracle"; }
