import styles from "./BenefitCard.module.css"

interface BenefitCardProps {
  benefit: {
    id: number
    title: string
    description: string
    icon: string
    color: string
  }
}

export const BenefitCard = ({ benefit }: BenefitCardProps) => {
  return (
    <div className={styles.card}>
      <div
        className={styles.iconContainer}
        style={{ backgroundColor: `${benefit.color}20` }}
      >
        <span className={styles.icon} style={{ color: benefit.color }}>
          {benefit.icon}
        </span>
      </div>
      <h3 className={styles.title}>{benefit.title}</h3>
      <p className={styles.description}>{benefit.description}</p>
    </div>
  )
}

