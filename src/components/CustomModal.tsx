import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';
import type { ReactNode } from 'react';
import { BUTTONS } from '../constants/dictionary';

interface CustomModalProps {
  openState: boolean;
  setOpenState: (isOpen: boolean) => void;
  title: string | ReactNode;
  body: string | ReactNode;
}

export default function CustomModal({
  openState,
  setOpenState,
  title,
  body,
}: CustomModalProps) {
  return (
    <Modal
      isOpen={openState}
      onOpenChange={setOpenState}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>{body}</ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                {BUTTONS.close}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
