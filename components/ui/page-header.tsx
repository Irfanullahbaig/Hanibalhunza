import Link from "next/link";
import type { ReactNode } from "react";

type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-[13px] text-muted">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden className="text-line">/</span>}
            {item.href ? (
              <Link href={item.href} className="transition-colors hover:text-forest">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHeader({
  crumbs,
  eyebrow,
  title,
  description,
  children,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-line bg-paper">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-6 sm:pb-14 sm:pt-10 lg:px-8">
        <Breadcrumbs items={crumbs} />
        {eyebrow && <p className="eyebrow mt-8">{eyebrow}</p>}
        <h1 className="mt-3 max-w-3xl text-4xl leading-[1.1] text-ink sm:text-5xl">{title}</h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
