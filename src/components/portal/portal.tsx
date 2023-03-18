import { useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';

const Portal = ({ children }: { children: JSX.Element }) => {
  const el = useMemo(() => document.createElement('div'), []);

  useEffect(() => {
    document.body.appendChild(el);

    return () => {
      document.body.removeChild(el);
    };
  }, [el]);

  return ReactDOM.createPortal(children, el);
};

export { Portal };
