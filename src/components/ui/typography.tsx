import type {ComponentPropsWithoutRef, ElementType, ReactNode} from 'react';

type TypographyVariant =
  | 'display'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'body'
  | 'bodySmall'
  | 'label'
  | 'muted';

type TypographyWeight = 'regular' | 'medium' | 'semibold' | 'bold';
type TypographyAlign = 'start' | 'center' | 'end';

type TypographyProps<T extends ElementType = 'p'> = {
  as?: T;
  variant?: TypographyVariant;
  weight?: TypographyWeight;
  align?: TypographyAlign;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>;

const variantClasses: Record<TypographyVariant, string> = {
  display: 'text-4xl sm:text-5xl leading-tight tracking-tight',
  h1: 'text-3xl sm:text-4xl leading-tight',
  h2: 'text-2xl sm:text-3xl leading-snug',
  h3: 'text-xl sm:text-2xl leading-snug',
  body: 'text-base leading-relaxed',
  bodySmall: 'text-sm leading-relaxed',
  label: 'text-sm leading-none uppercase tracking-wide',
  muted: 'text-sm leading-relaxed text-slate-500 dark:text-slate-400',
};

const weightClasses: Record<TypographyWeight, string> = {
  regular: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

const alignClasses: Record<TypographyAlign, string> = {
  start: 'text-start',
  center: 'text-center',
  end: 'text-end',
};

export function Typography<T extends ElementType = 'p'>({
  as,
  variant = 'body',
  weight = 'regular',
  align = 'start',
  className = '',
  children,
  ...rest
}: TypographyProps<T>) {
  const Component = as ?? 'p';
  const classes = `${variantClasses[variant]} ${weightClasses[weight]} ${alignClasses[align]} ${className}`.trim();

  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  );
}
