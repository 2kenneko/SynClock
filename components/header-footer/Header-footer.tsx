"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import styles from "./header_footer.module.css";
import { useRouter } from "next/navigation";


export default function Page() {
  const router = useRouter();
  const link_top : string = "/";
  const link_todo : string = "/todo";
  const link_whatstudy : string = "/whatstudy";

  function top_link() {router.push(link_top);};
  function todo_link() {router.push(link_todo);};
  function whatstudy_link() {router.push(link_whatstudy);};

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
                <button onClick={top_link} className={styles.button} >
                  <span className={styles.lable}>TOP</span>
                </button>
              </div>

              <div>
                <button onClick={todo_link} className={styles.button}>
                  <span className={styles.lable}>TODO</span>
                </button>
              </div>

              <div>
                <button onClick={whatstudy_link} className={styles.button}>
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
