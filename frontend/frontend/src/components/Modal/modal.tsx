
// Modal Component
import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { format, parseISO } from 'date-fns';

// Props Interface
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: {
    title: string;
    description: string;
    dueDate: string;
    subtasks: { title: string; completed: boolean }[];
  };
}

// Modal Component
export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, task }) => {
  const formattedDate = task.dueDate ? format(parseISO(task.dueDate), 'dd MMMM yyyy') : 'No Due Date';

  const renderFooter = () => {
    return (
      <div>
        <Button label="Close" icon="pi pi-times" onClick={onClose} className="p-button-text" />
      </div>
    );
  };

  return (
    <Dialog 
      header={task.title || 'No Title'} 
      visible={isOpen} 
      style={{ width: '50vw' }} 
      footer={renderFooter()} 
      onHide={onClose}
      modal
      draggable={false}
    >
      <p>{task.description || 'No Description'}</p>
      <p>Due Date: {formattedDate}</p>
      {task.subtasks && task.subtasks.length > 0 ? (
        <div>
          <p>Subtasks:</p>
          <ul>
            {task.subtasks.map((subtask, index) => (
              <li key={index}>
                <Checkbox inputId={`subtask-${index}`} checked={subtask.completed} readOnly />
                <label htmlFor={`subtask-${index}`} className="p-checkbox-label">{subtask.title}</label>
              </li>
            ))}
          </ul>
        </div>
      ) : <p>No Subtasks</p>}
    </Dialog>
  );
};


export default Modal;
