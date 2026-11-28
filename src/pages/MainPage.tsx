import type { JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { TEAM_MEMBERS } from '../constants/teamMembers';
import { TeamMemberCard } from '../components/about/TeamMemberCard';
import { Button } from '../components/ui/Button/Button';
import styles from './MainPage.module.css';

const APP_FEATURES = [
  {
    title: 'Каталог с актуальными данными',
    description:
      'Просматривайте ассортимент насосного оборудования в реальном времени. В каждой карточке сразу видны актуальная стоимость, изображение модели и ключевые показатели напора и расхода.',
  },
  {
    title: 'Детальные карточки оборудования',
    description:
      'Открывайте страницу любой модели, чтобы изучить полные технические характеристики (мощность в Вт, номинальный напор в метрах и производительность в м³/ч) и выбрать нужное количество единиц перед покупкой.',
  },
  {
    title: 'Интерактивная корзина покупок',
    description:
      'Управляйте составом заказа в один клик: меняйте количество товаров, удаляйте лишние позиции или очищайте список целиком. Корзина автоматически сохраняется в браузере даже после закрытия вкладки.',
  },
  {
    title: 'Система промокодов и расчёт скидки',
    description:
      'Применяйте промокоды (например, SALE10) прямо в блоке итогов заказа. Система мгновенно проверит код, рассчитает размер вашей выгоды и пересчитает итоговую сумму при любом изменении корзины.',
  },
];

export const MainPage = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      {/* Hero-секция о проекте */}
      <section className={styles.hero}>
        <span className={styles.badge}>О проекте</span>
        <h1 className={styles.title}>Интернет-магазин насосного оборудования</h1>
        <p className={styles.subtitle}>
          Удобный онлайн-сервис для подбора и заказа циркуляционных, скважинных и промышленных
          насосов. Приложение помогает быстро сравнить модели по техническим характеристикам,
          собрать заказ нужной комплектации, применить персональный промокод на скидку и сохранить
          выбранные товары до момента оформления покупки.
        </p>

        <div className={styles.heroActions}>
          <Button
            variant="primary"
            size="lg"
            text="Перейти в каталог"
            onClick={() => void navigate('/catalog')}
          />
          <Button
            variant="secondary"
            size="lg"
            text="Открыть корзину"
            onClick={() => void navigate('/cart')}
          />
        </div>
      </section>

      {/* Подробный функционал приложения для пользователя */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Возможности платформы</h2>
        <p className={styles.sectionSubtitle}>
          Всё необходимое для быстрого выбора оборудования и расчёта стоимости заказа:
        </p>
        <div className={styles.featuresGrid}>
          {APP_FEATURES.map((feature) => (
            <div key={feature.title} className={styles.featureCard}>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Команда разработки */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Команда разработки</h2>
        <p className={styles.sectionSubtitle}>
          Участники проекта и их вклад в создание приложения:
        </p>
        <div className={styles.teamGrid}>
          {TEAM_MEMBERS.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </section>
    </div>
  );
};
