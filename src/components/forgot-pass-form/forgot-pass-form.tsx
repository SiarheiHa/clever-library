import { useLocation } from 'react-router-dom';

import { EmailForm } from './email-form';

const ForgotPassForm = () => {
  const location = useLocation();

  if (location.search) {
    const code = location.search.replace('?code=', '');

    return <NewPassForm code={code} />;
  }

  return <EmailForm />;
};

export { ForgotPassForm };
