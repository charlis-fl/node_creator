import { ButtonProps } from 'common/designSystem/button/types';
import { ButtonStyled } from './ButtonStyled';

export const Button = ({
  label,
  type = 'submit',
  usage,
  ...props
}: ButtonProps) => {
  return (
    <ButtonStyled
      usage={usage}
      {...props}
      type={type}
    >
      {label}
    </ButtonStyled>
  );
};

export default Button;
