import { useEffect, useRef } from 'react';
import SearchCard from './SearchCard';

export default function EditPanel({ open, onClose, searchProps, onSearch }) {
  const ref = useRef(null);

  useEffect(() => {
    const handler = e => {
      if (open && ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open, onClose]);

  return (
    <div className={`edit-panel${open?' open':''}`} ref={ref}>
      <div className="edit-panel-inner">
        <div className="ep-label">Adjust your search</div>
        <SearchCard {...searchProps} onSearch={() => { onSearch(); onClose(); }} isEditCard />
      </div>
    </div>
  );
}
