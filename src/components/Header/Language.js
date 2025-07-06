import { NavDropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Language = (props) => {
  const lngs = {
    en: { nativeName: "English" },
    vi: { nativeName: "Việt Nam" },
  };
  const { t, i18n } = useTranslation();
  return (
    <>
      <NavDropdown
        title={lngs[i18n.resolvedLanguage]?.nativeName || "Language"}
        id="language-nav-dropdown"
        className="language no-caret m-1"
      >
        {Object.keys(lngs).map((lng) => (
          <NavDropdown.Item
            key={lng}
            active={i18n.resolvedLanguage === lng}
            onClick={() => i18n.changeLanguage(lng)}
          >
            {lngs[lng].nativeName}
          </NavDropdown.Item>
        ))}
      </NavDropdown>
    </>
  );
};

export default Language;
