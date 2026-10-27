const configuredBackendUrl =
  process.env.PAYLOAD_URL ?? process.env.NEXT_PUBLIC_PAYLOAD_URL;

export const backendUrl = (
  configuredBackendUrl ??
  (process.env.NODE_ENV === "development" ? "http://admin.skillandmix.com" : "")
).replace(/\/$/, "");
