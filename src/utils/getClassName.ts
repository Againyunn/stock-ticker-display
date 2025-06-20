export function getClassNameFromDomain(): string {
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  if (hostname.includes("wooribank")) return "wooribank";
  return "";
}
