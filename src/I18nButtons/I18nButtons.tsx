import { useState } from "react";
import "./I18nButtons.css";

interface I18nButtonsProps {
  changeLanguage: (lng: string) => void;
  currentLanguage: string;
}

const languages: Record<string, string> = {
  fr: "Français",
  sr: "Srpski",
};

const addClass = (classObject: Record<string, boolean>) =>
  Object.keys(classObject)
    .filter((cls) => classObject[cls])
    .join(" ");
export default function I18nButtons({
  changeLanguage,
  currentLanguage,
}: I18nButtonsProps) {
  const [chooseLanguageOpen, setChooseLanguageOpen] = useState(false);
  const handleChangeLanguage = (lang: string) => {
    changeLanguage(lang);
    setChooseLanguageOpen(false);
  };
  return (
    <div className="language">
      {!chooseLanguageOpen ? (
        <div
          className="chosen-language"
          onClick={() => setChooseLanguageOpen((prev) => !prev)}
        >
          {languages[currentLanguage]}
        </div>
      ) : (
        <div className="languages">
          {Object.keys(languages)
            .sort((a) => (a === currentLanguage ? -1 : 1))
            .map((language) => (
              <div
                key={language}
                className={addClass({ selected: currentLanguage === language })}
                onClick={() => handleChangeLanguage(language)}
              >
                {languages[language]}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
