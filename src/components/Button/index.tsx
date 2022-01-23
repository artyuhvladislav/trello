import React from 'react'
import './Button.scss'

interface IButtonProps {
    onClick(): void,
    children: any,
    setShowForm(arg: boolean): void,
}


const Button = ({ children, onClick, setShowForm }: IButtonProps) => {

  const rootEl = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      rootEl?.current?.contains(e.target as Node) || setShowForm(false)
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);
  
    return (
      <button className="button" onClick={onClick} ref={rootEl}>
        {children}
      </button>
    );
  };

export default Button
