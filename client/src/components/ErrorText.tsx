const ErrorText = ({ children }: { children: React.ReactNode }) => (
  <>{children && <p className="text-xs text-red-500 pt-1">{children}</p>}</>
);
export default ErrorText;
