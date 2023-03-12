import { useNavigate } from 'react-router-dom';

import { Button } from '../button';
import { FormTitle } from '../form';

interface ResultAuthBlockProps {
  title: string;
  text: string;
  buttonText: string;
  onClick: () => void;
}

const ResultAuthBlock = ({ buttonText, onClick, text, title }: ResultAuthBlockProps) => (
    <div>
      <FormTitle title={title} />
      <p>{text}</p>
      <Button onClick={onClick}> {buttonText} </Button>
    </div>
  );

export { ResultAuthBlock };
