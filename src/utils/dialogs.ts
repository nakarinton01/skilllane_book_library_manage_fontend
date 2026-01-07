import Swal from 'sweetalert2';

export type DialogProps = { title: string; text: string; btnConfirmText?: string; btnCancelText?: string };

export const successAlert = ({ title, text }: DialogProps) => {
  return Swal.fire({
    title: title,
    text: text,
    icon: 'success',
    showCancelButton: false,
    confirmButtonColor: '#000000',
    confirmButtonText: 'OK',
  });
};

export const errorAlert = ({ title, text }: DialogProps) => {
  return Swal.fire({
    title: title,
    text: text,
    icon: 'error',
    showCancelButton: false,
    confirmButtonColor: '#000000',
    confirmButtonText: 'OK',
  });
};

export const warningAlert = async ({ title, text, btnConfirmText, btnCancelText }: DialogProps) => {
  return Swal.fire({
    title: title,
    text: text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#000000',
    cancelButtonColor: '#AFAFAF',
    confirmButtonText: btnConfirmText || 'Submit',
    cancelButtonText: btnCancelText || 'Cancel',
  });
};

export const confirmAlert = async ({ title, text }: Partial<DialogProps>, cb: () => void) => {
  const question = await Swal.fire({
    title: title || 'คุณต้องการยืนยัน?',
    text: text || 'ยืนยันการกระทำ?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#000000',
    cancelButtonColor: '#AFAFAF',
    confirmButtonText: 'Submit',
  });
  if (question.isConfirmed) {
    cb();
  }
};
