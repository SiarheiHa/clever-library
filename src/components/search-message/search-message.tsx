import styles from './search-message.module.scss';

const SearchMessage = ({ text, testId }: { text: string; testId: string }) => (
  <p className={styles.text} data-test-id={testId}>
    {text}
  </p>
);

export { SearchMessage };
