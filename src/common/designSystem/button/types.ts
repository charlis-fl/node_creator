import { ButtonHTMLAttributes } from 'react';

export interface StyledButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  usage?: string;
}

export type ButtonType = 'button' | 'submit';
export type ButtonUsage= 'primary' | 'secondary';

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & {
  label: string;
  type?: ButtonType;
  usage?: ButtonUsage;
}
