import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./style.module.scss";

interface WorkProjectProps {
  logo: string;
  id: string;
  name: string;
  description: React.ReactNode;
  isActive: boolean;
}

export const WorkProject: React.FC<WorkProjectProps> = ({
  id,
  logo,
  name,
  description,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.list}>
        <Link href={`/work/${id}`}>
          <a>
            <div className={styles.logo}>
              <Image src={logo} alt="" layout="fill" />
            </div>
            <h3 className={styles.name}>{name}</h3>
          </a>
        </Link>
      </div>
      <div className={styles.full}>
        <Link href="/work">See other projects</Link>
        <div>
          <Image src={logo} alt="" width={80} height={80} layout="intrinsic" />
          <h3 className={styles.name}>{name}</h3>
        </div>
        <div>{description}</div>
      </div>
    </div>
  );
};
