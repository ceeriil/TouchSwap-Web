// export const SERVER_URL = "https://backend.ether.delivery:49832"
export const SERVER_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? "https://63b0-104-28-219-97.ngrok-free.app";
export const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT ?? "development";

export const RefeshInterval = 180000
export const ONE_SECOND = 1000