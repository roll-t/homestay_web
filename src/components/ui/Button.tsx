type ButtonProps = {
    onClick: () => void;
    children: React.ReactNode;
  };
  
  export default function Button({ onClick, children }: ButtonProps) {
    return <button onClick={onClick} className="btn">{children}</button>;
  }
  