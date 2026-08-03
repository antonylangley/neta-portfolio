import Link from "next/link";
import type { ComponentType, ReactNode, SVGProps } from "react";
import { ArrowUpRight } from "lucide-react";
import { isExternalHref } from "@/lib/links";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "quiet";
  icon?: IconType;
  download?: boolean;
  ariaLabel?: string;
};

const variantClasses = {
  primary:
    "border-charcoal bg-charcoal text-canvas shadow-selection hover:-translate-y-0.5 hover:shadow-selection-strong",
  secondary:
    "border-line bg-surface text-charcoal hover:-translate-y-0.5 hover:border-charcoal hover:bg-white",
  quiet:
    "border-transparent bg-transparent text-charcoal hover:border-line hover:bg-surface",
};

export function ButtonLink({
  href,
  children,
  variant = "secondary",
  icon: Icon = ArrowUpRight,
  download = false,
  ariaLabel,
}: ButtonLinkProps) {
  const className = `inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-blue ${variantClasses[variant]}`;

  if (isExternalHref(href)) {
    return (
      <a
        aria-label={ariaLabel}
        className={className}
        download={download || undefined}
        href={href}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
        target={href.startsWith("http") ? "_blank" : undefined}
      >
        <span>{children}</span>
        <Icon aria-hidden="true" className="size-4" />
      </a>
    );
  }

  return (
    <Link aria-label={ariaLabel} className={className} download={download || undefined} href={href}>
      <span>{children}</span>
      <Icon aria-hidden="true" className="size-4" />
    </Link>
  );
}
