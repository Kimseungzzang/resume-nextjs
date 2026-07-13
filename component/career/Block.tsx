import { PropsWithChildren } from 'react';
import { ICareer } from './ICareer';
import { Style } from '../common/Style';

export default function CareerBlock({ block }: PropsWithChildren<{ block: ICareer.Block }>) {
  switch (block.type) {
    case 'heading':
      return (
        <h5 className="mt-4" style={Style.blue}>
          {block.text}
        </h5>
      );
    case 'paragraph':
      return <p className="mb-2">{block.text}</p>;
    case 'list':
      return (
        <ul>
          {block.items.map((item, index) => (
            <li key={index.toString()}>{item}</li>
          ))}
        </ul>
      );
    case 'code':
      return (
        <pre
          className="p-3 mb-3"
          style={{
            backgroundColor: '#1e293b',
            color: '#e2e8f0',
            borderRadius: '6px',
            overflowX: 'auto',
            fontSize: '0.85em',
          }}
        >
          <code style={{ fontFamily: "'DejaVu Sans Mono', Consolas, monospace" }}>
            {block.code}
          </code>
        </pre>
      );
    default:
      return null;
  }
}
