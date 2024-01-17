import React from 'react';
import styles from './loading.module.scss';

function LoadingCard() {
    return (
        <div className="col-6 col-md-4">
            <div className="card mb-7">
                <div className="card-img">
                    <div className={styles.image}></div>
                    <div className={styles.textBox}>
                        <div className={`${styles.text} ${styles.text__1}`}></div>
                        <div className={`${styles.text} ${styles.text__2}`}></div>
                        <div className={`${styles.text} ${styles.text__3}`}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoadingCard;
