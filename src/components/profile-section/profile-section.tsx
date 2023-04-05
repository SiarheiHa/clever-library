import { useGetCurrentUserQuery } from '../../api/current-user-api';

import { MainUserData } from './main-user-data';
import { UserForm } from './user-form';

import styles from './profile-section.module.scss';

const ProfileSection = () => {
  const { data } = useGetCurrentUserQuery('1');

  if (!data) {
    return null;
  }

  return (
    <section className={styles.profile}>
      <MainUserData {...data} />
      <UserForm {...data} />
      {/* <UserBooks />  */}
    </section>
  );
};

export { ProfileSection };
