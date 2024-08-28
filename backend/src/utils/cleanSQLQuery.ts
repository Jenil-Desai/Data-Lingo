export default function cleanSQLQuery(query: string) {
  // Remove backticks
  query = query.replace(/`/g, "");

  // Remove any occurrences of "```sql" or "```" (often added by models)
  query = query.replace(/```sql/g, "");
  query = query.replace(/```/g, "");

  // Remove excess whitespace, including newlines
  query = query.replace(/\s+/g, " ").trim();

  query = query.replace("sql", "");

  return query;
}
