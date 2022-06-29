import '@reach/dialog/styles.css';

import { DialogContent, DialogOverlay } from '@reach/dialog';
import VisuallyHidden from '@reach/visually-hidden';
import { ReactNode, useState } from 'react';

const Modal = ({ children, openButtonText = 'Open Dialog' }: { children: ReactNode; openButtonText?: string }) => {
  const [showDialog, setShowDialog] = useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  return (
    <div>
      {' '}
      <button onClick={open} style={{ fontSize: '1.2rem' }}>
        {openButtonText}
      </button>
      <DialogOverlay isOpen={showDialog} onDismiss={close} style={{ zIndex: 999 }}>
        <DialogContent style={{ width: '65vw' }}>
          <button className="close-button" onClick={close}>
            <VisuallyHidden>Close</VisuallyHidden> <span aria-hidden>×</span>
          </button>
          {children}
        </DialogContent>
      </DialogOverlay>
    </div>
  );
};

export default Modal;
