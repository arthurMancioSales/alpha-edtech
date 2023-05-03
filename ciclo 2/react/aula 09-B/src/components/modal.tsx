import { useState } from "react"

export default function useModal() {
    const [modalIsOpen, setModalIsOpen] = useState(false)

    function openModal() {
        setModalIsOpen(true)
    }

    function closeModal() {
        setModalIsOpen(false);
    }

    function stopPropagation(event: React.MouseEvent) {
        event.stopPropagation()
    }

    function EasyModal() {
        return (
            <>
                {modalIsOpen ? (
                    <div className="modal-background" onClick={closeModal}>
                        <div className="modal-content" onClick={stopPropagation}>
                            Ocorreu um erro inesperado. Por favor, tente novamente
                        </div>
                    </div>
                ) : ""}
            </>
        )
    }

    return [EasyModal, openModal] as [() => JSX.Element, () => void]
}