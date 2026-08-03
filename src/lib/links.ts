export function isExternalHref(href: string) {
  return href.startsWith("http") || href.startsWith("mailto:");
}

export function getMailtoHref(email: string) {
  return `mailto:${email}?subject=Portfolio%20inquiry`;
}
