// components/ProductInfo/ProductInfo.js
import { useQR } from '../../QRContext/QRContext';
import styles from './ProductInfo.module.css';
import Logo from '../../assets/logo.gif';

const ProductInfo = () => {
  const { t } = useQR();

  return (
    <div className={styles.languaje}>
      <div className={styles.category}>
        <h1 className={styles.categoryItem}>{t('productCode')}</h1>
        <h1 className={styles.categoryItem}>{t('productCategory')}</h1>
      </div>
      
      <div className={styles.category}>
        <h1 className={styles.categoryItem}>{t('registrationNumber')}</h1>
      </div>

      <div>
        <p className={styles.paraghraph}>{t('sellAsPackaged')}</p>
      </div>
      
      <div className={styles.safety}>
        <p className={styles.instructions}>{t('safetyInstructions')}</p>
        <p className={styles.paraghraph}>{t('outdoorUse')}</p>
        <p className={styles.paraghraph}>{t('usageInstructions')}</p>
        <p className={styles.paraghraph}>{t('safetyDistancePublic')}</p>
      </div>
      
      <div className={styles.characteristics}>
        <div className={styles.nec}>
          {/* Formato: NEC: 4.3g */}
          <div className={styles.necItem}>
            <span className={styles.necLabel}>{t('nec')}:</span> {t('necValue')}
          </div>
          <div className={styles.necItem}>
            <span className={styles.necLabel}>{t('age')}:</span> {t('ageValue')}
          </div>
          <div className={styles.necItem}>
            <span className={styles.necLabel}>{t('safetyDistance')}:</span> {t('safetyDistanceValue')}
          </div>
        </div>
      </div>
      
      <div className={styles.adrContainer}>
        <div className={styles.adrHeader}>
          <h3 className={styles.adrTitle}>{t('adr')}</h3>
          <img src={Logo} alt="ADR Logo" className={styles.adrLogo} />
        </div>
        
        <div className={styles.adrContent}>
          <p>{t('riskCategory')}</p>
          <p>{t('unClassification')}</p>
          <p>{t('riskWarning')}</p>
        </div>
      </div>
      
      <div className={styles.download}>
        <button>{t('downloadFDS')}</button>
      </div>
    </div>
  );
};

export default ProductInfo;