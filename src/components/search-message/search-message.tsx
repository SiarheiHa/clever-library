import styles from './search-message.module.scss';

const SearchMessage = ({ text }: { text: string }) => <p className={styles.text}>{text}</p>;

export { SearchMessage };
