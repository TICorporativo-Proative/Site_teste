import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  footer?: ReactNode;
  className?: string;
  noPadding?: boolean;
}

const Card = ({
  children,
  title,
  subtitle,
  footer,
  className = '',
  noPadding = false,
}: CardProps) => {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b border-gray-200">
          {title && <h3 className="text-lg font-medium text-gray-900">{title}</h3>}
          {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
        </div>
      )}
      
      <div className={noPadding ? '' : 'p-6'}>
        {children}
      </div>
      
      {footer && (
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;