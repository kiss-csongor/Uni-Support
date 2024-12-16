import React from "react";
import ButtonSvg from "../assets/svg/ButtonSvg";

const Button = ({ className, href, onClick, children, px, white }) => {
  const classes = `button relative inline-flex items-center justify-center h-11 transition-colors ${px || 'px-7'} ${white ? "text-n-8 hover:text-n-4" : 'text-n-3 hover:text-n-1'} ${className || ''}`;

  const spanClasses = 'relative z-10';

  const renderButton = () => (
    <button className={classes} onClick={onClick}>
      <span className={spanClasses}>{children}</span>
      {ButtonSvg(white)}
    </button>
  );

  const renderLink = () => (
    <a href={href} className={classes} onClick={onClick}>
      <span className={spanClasses}>{children}</span>
        {ButtonSvg(white)}
    </a>
    )

  return href ? renderLink() : renderButton()
};

export default Button;
