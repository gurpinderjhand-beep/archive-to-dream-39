import { Link, useNavigate } from "@tanstack/react-router";
import type { AnchorHTMLAttributes, ReactNode } from "react";

// Keeps the original href-based linking style on top of TanStack Router.
type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string; children?: ReactNode };

function split(href: string) {
  const [pathAndQuery, hash] = href.split("#");
  const [path, query] = pathAndQuery.split("?");
  const search = query ? Object.fromEntries(new URLSearchParams(query)) : undefined;
  return { to: path || undefined, hash: hash || undefined, search };
}

export default function AppLink({ href, children, ...rest }: Props) {
  const { to, hash, search } = split(href);
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Link to={to as any} hash={hash} search={search as any} {...rest}>
      {children}
    </Link>
  );
}

export function useRouter() {
  const navigate = useNavigate();
  return {
    push: (href: string) => {
      const { to, hash, search } = split(href);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      navigate({ to: to as any, hash, search: search as any });
    },
  };
}
