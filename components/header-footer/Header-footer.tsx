"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import styles from "./header_footer.module.css";

export default function Page() {
  return (
    <main>
      <div>
        <header className={styles.header}>
          <div className={styles["header-left"]}>
            <h1 className={styles["header-text"]}>タイマーテスト</h1>
          </div>
          <div className={styles["header-right"]}>
            <div className={styles["header-btn"]}>
              <div>
                {" "}
                リンク path: '/'
                <button className={styles.button}>
                  <span className={styles.lable}>TOP</span>
                </button>
              </div>

              <div>
                {" "}
                path: /todo
                <button className={styles.button}>
                  <span className={styles.lable}>TODO</span>
                </button>
              </div>

              <div>
                path: /what-study
                <button className={styles.button}>
                  <span className={styles.lable}>What study?</span>
                </button>
              </div>

              <button className={styles.button}>
                <span className={styles.lable}>Darkmode</span>
              </button>
            </div>
          </div>
        </header>
      </div>
    </main>
  );
}
