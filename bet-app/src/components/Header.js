import React, {Suspense} from 'react';
import { Translation } from 'react-i18next';

export const NavBar = ({t, i18n }) => {
    const changeLang = async (lang) => {
        i18n.changeLanguage(lang)
        await i18n.getResource(i18n.language)
    }
    return (<div>
        <div style={{marginLeft: 30}}>
            <h2 data-testid="text-trans">{t("WELCOME")}</h2>
        </div>
        <div className="languages">
            
            <h4>{t("LANGUAGES")}</h4>
            <div >
                
                <button data-testid="es-trans" onClick={() => changeLang('es')} style={i18n.language === "es" ? {backgroundColor: "red", margin: 5} : {margin: 5}}>ES</button>
                <button data-testid="en-trans" onClick={() => changeLang('en')} style={i18n.language === "en" ? {backgroundColor: "red", margin: 5} : {margin: 5}}>EN</button>
            
            </div>
        </div>
    </div>)
}

export const HeaderContent = () => (
    <div className="navBar">
        <Translation>
        {
            (t, { i18n }) => {   
            return (<NavBar t={t} i18n={i18n}/>)}
        }
        </Translation>
        
    </div>
);


export default function Header() {
    return (
      <Suspense fallback="loading languages">
        <HeaderContent />
      </Suspense>
    );
}