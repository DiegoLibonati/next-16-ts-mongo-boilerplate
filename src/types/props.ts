interface DefaultProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ActionProps extends DefaultProps {
  id?: string;
  ariaLabel?: string;
  onClick?: () => void;
}

export interface LinkProps extends DefaultProps {
  id?: string;
  href: string;
  target?: "_blank" | "_self";
  ariaLabel?: string;
}

export interface UserCardProps extends DefaultProps {
  name: string;
  email: string;
}

export type RootLayoutProps = DefaultProps;

export interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export interface CounterProviderProps {
  children: React.ReactNode;
}
