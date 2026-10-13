/** Converts Mongo documents (ObjectId/Date fields) into plain JSON-safe objects
 * so they can be returned from Server Components / Server Actions to Client Components. */
export function serialize<T>(doc: unknown): T {
  return JSON.parse(JSON.stringify(doc));
}
