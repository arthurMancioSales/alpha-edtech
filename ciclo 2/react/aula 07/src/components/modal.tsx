interface ILoginProps {
    onClose: () => void,
    sucess: boolean
}

export default function LoginModal({onClose, sucess}: ILoginProps) {
    
    
    function stopPropagation(event: React.MouseEvent) {
        event.stopPropagation()
    }

    return (
        <div className="modal-background" onClick={onClose}>
            <div className="modal-content" onClick={stopPropagation}>
                {sucess ? "Login enviado com sucesso!" : "Erro ao fazer login"}
            </div>
        </div>
    )
}