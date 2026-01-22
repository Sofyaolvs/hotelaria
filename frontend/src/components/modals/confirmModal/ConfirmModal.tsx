import { AlertTriangle } from 'lucide-react';
import Modal from '../modal/Modal';
import './index.css';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  warning?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  warning,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  isLoading = false,
}: ConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="confirm-modal-body">
        <p className="confirm-modal-message">{message}</p>

        {warning && (
          <div className="confirm-modal-warning">
            <AlertTriangle size={20} />
            <span>{warning}</span>
          </div>
        )}

        <div className="confirm-modal-actions">
          <button
            className="confirm-modal-btn cancel"
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelLabel}
          </button>
          <button
            className="confirm-modal-btn confirm"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Excluindo...' : confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
}
