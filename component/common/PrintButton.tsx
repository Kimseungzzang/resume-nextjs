import { Button } from 'reactstrap';
import { useLanguage } from './LanguageContext';

export default function PrintButton() {
  const { lang } = useLanguage();

  return (
    <Button className="no-print" color="secondary" outline size="sm" onClick={() => window.print()}>
      {lang === 'en' ? 'Save as PDF' : 'PDF로 저장'}
    </Button>
  );
}
