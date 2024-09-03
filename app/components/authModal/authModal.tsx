import { Modal, Button } from "@mui/material";

interface AuthModalProps {
  open: boolean;
}

const AuthModal: React.FC<AuthModalProps> = ({ open }) => {
  return (
    <Modal open={open}>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-white rounded-lg p-6 shadow-lg w-80">
          <h2 className="text-xl font-semibold mb-4">Моля валедирайте се</h2>
          <p className="mb-4">
            За да използвате приложението, трябва да се регистрирате с поща
          </p>
          <Button
            variant="contained"
            color="primary"
            href="/api/auth/login"
            className="w-full"
          >
            Вход
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AuthModal;
