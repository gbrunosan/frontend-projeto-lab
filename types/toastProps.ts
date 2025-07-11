export interface ToastProps {
  type: "success" | "error";
  title: string;
  description: string;
  onClose?: () => void;
}
