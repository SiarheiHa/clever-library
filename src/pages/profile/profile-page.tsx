import { Container } from '../../components/container';
import { ProfileSection } from '../../components/profile-section';

import styles from './profile.module.scss';

export const ProfilePage = () => (
  <Container className={styles.grow}>
    <ProfileSection />
  </Container>
);
