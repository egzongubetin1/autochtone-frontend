export const LOCAL_STORAGE_TOKEN_NAME = "x-access-token";

export const DEFAULT_FETCH_HEADERS = {
  "Content-Type": "application/json",
  Origin: `${process.env.NEXT_PUBLIC_FRONT_URL}`,
};

export const PAGINATION_LIMIT = 24;

export const API_RESPONSE = {
  loading: "loading",
  succeeded: "succeeded",
  failed: "failed",
  finished:"finished"
};
