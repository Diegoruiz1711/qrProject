// components/Home/Home.js
import React from 'react';
import { useQR } from '../../QRContext/QRContext';
import styles from "./Home.module.css";
import ProductInfo from "../ProducInfo/ProductInfo";
import Toro from '../../assets/0372_El_Toro.png';
import Logo from '../../assets/logo.gif'

const Home = () => {
  const {
    currentLanguage,
    changeLanguage,
    isLoading,
    languages,
    isDropdownOpen,
    toggleDropdown,
    getCurrentLanguageDisplay,
    t
  } = useQR();

  if (isLoading) {
    return <div className={styles.loading}>{t('loading')}</div>;
  }

  return (
    <div className={styles.body}>
      <div className={styles.languageSelector}>
        <img src={Logo} alt="Logo Cialfir" className={styles.adrLogo} />
        <div className={styles.selectedLanguage} onClick={toggleDropdown}>
          {getCurrentLanguageDisplay()}
          <span className={styles.arrow}>{isDropdownOpen ? '▲' : '▼'}</span>
        </div>

        {isDropdownOpen && (
          <div className={styles.languageDropdown}>
            {languages.map((lang) => (
              <div
                key={lang.code}
                className={`${styles.languageOption} ${currentLanguage === lang.code ? styles.active : ''}`}
                onClick={() => changeLanguage(lang.code)}
              >
                {lang.name} - {lang.fullName}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.productImage}>
        <div className={styles.imageFrame}>
          <img src={Toro} alt="Imagen producto El Toro" className={styles.image} />
        </div>

        <div className={styles.productName}>
          <h1>{t('productTitle')}</h1>
        </div>
        
        <div className={styles.productDescription}>
          <p className={styles.paraghraph}>{t('productSubtitle')}</p>
          <p className={styles.paraghraph}>{t('productDescription')}</p>
        </div>
      </div>
      
      <hr className={styles.hr} />
      
      <div className={styles.productInfo}>
        <ProductInfo />
      </div>
    </div>
  );
};

export default Home;