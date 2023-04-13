import styles from "./styles/header.module.css";
export default function Header(props) {
    return (
        <div className="container">
            <h1 className={styles.title}>{props.name && props.name}</h1>
        </div>
    );
}
