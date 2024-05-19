// export const SERVER_URL = "https://backend.ether.delivery:49832"
export const SERVER_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:3000";
export const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT ?? "development";

export const RefeshInterval = 180000