/** Non-2xx HTTP response. Keeps the status so the UI can tell 404 apart. */
export class ApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export const isNotFoundError = (error: unknown) =>
  error instanceof ApiError && error.status === 404;
