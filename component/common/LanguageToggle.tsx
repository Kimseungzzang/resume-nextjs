import { Button } from 'reactstrap';
import { useLanguage } from './LanguageContext';

export default function LanguageToggle() {
  const { lang, toggleLang } = useLanguage();

  return (
    <Button className="no-print ml-2" color="secondary" outline size="sm" onClick={toggleLang}>
      {lang === 'ko' ? 'EN' : 'KO'}
    </Button>
  );
}
