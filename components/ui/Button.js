const variants = {
  primary: 'bg-accent text-white hover:bg-[#b8897a] shadow-sm',
  outline: 'border border-accent text-accent hover:bg-blush',
  ghost:   'text-muted hover:text-avio-text',
  google:  'bg-white border border-black/10 text-avio-text hover:bg-gray-50 shadow-sm flex items-center gap-3 justify-center',
};

const sizes = {
  sm: 'text-sm px-4 py-2',
  md: 'text-sm px-6 py-3',
  lg: 'text-base px-8 py-4',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) {
  return (
    <button
      className={`
        rounded-full font-medium transition-colors duration-200 cursor-pointer
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
