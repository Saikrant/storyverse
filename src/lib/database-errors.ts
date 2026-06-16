export class DatabaseUnavailableError extends Error {
  constructor(message = "Database is unavailable.") {
    super(message);
    this.name = "DatabaseUnavailableError";
  }
}

export function isDatabaseUnavailableError(error: unknown) {
  if (error instanceof DatabaseUnavailableError) {
    return true;
  }

  if (!(error instanceof Error)) {
    return false;
  }

  const errorWithCode = error as Error & { code?: string };
  const unavailableCodes = new Set(["P1000", "P1001", "P1002", "P1017"]);

  return (
    error.name === "PrismaClientInitializationError" ||
    (error.name === "PrismaClientKnownRequestError" &&
      Boolean(errorWithCode.code && unavailableCodes.has(errorWithCode.code)))
  );
}

export function logDatabaseUnavailable(context: string, error: unknown) {
  const errorWithCode = error instanceof Error ? (error as Error & { code?: string }) : null;

  console.error("[StoryVerse database unavailable]", {
    context,
    name: errorWithCode?.name,
    code: errorWithCode?.code,
    message: errorWithCode?.message,
  });
}
