import { Button } from 'reactstrap';

export default function PrintButton() {
  return (
    <Button className="no-print" color="secondary" outline size="sm" onClick={() => window.print()}>
      PDF로 저장
    </Button>
  );
}
