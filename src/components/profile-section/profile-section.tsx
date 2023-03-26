import { useGetCurrentUserQuery } from '../../api/current-user-api';

import { MainUserData } from './main-user-data';

import styles from './profile-section.module.scss';

const ProfileSection = () => {
  const { data } = useGetCurrentUserQuery('1');

  return (
    <section className={styles.profile}>
      <MainUserData />
      {/* <UserForm />
      <UserBooks /> */}
    </section>
  );
};

export { ProfileSection };
