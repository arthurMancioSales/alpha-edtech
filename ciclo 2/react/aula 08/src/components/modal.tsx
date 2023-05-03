interface ILoginProps {
    onClose: () => void,
    message: string
}

export default function Modal({onClose, message}: ILoginProps) {
    
    
    function stopPropagation(event: React.MouseEvent) {
        event.stopPropagation()
    }

    return (
        <div className="modal-background" onClick={onClose}>
            <div className="modal-content" onClick={stopPropagation}>
                {message}
            </div>
        </div>
    )
}