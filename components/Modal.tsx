import ReactDOM from "react-dom";
import Close from "/icons/close.svg";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ open, onClose, children }: ModalProps) => {
  if (!open) return null;
  return ReactDOM.createPortal(
    <div
      className="fixed bottom-0 left-0 right-0 z-50 w-full h-full t-0 bg-slate-900/50"
      onClick={onClose}
    >
      <div
        className="fixed top-[30%] left-1/2 -translate-x-2/4 -translate-y-2/4 p-12 bg-black z-[10] h-72 rounded-md min-w-[260px] max-w-[600px]"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
      <div
        className="hidden absolute top-[10px] right-[10px] z-[1] cursor-pointer p-2"
        onClick={onClose}
      >
        <Close className="w-[24px] h-[24px] text-white" />
      </div>
    </div>,

    document.getElementById("global-modal") as HTMLElement
  );
};

export default Modal;
