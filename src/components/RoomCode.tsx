import toast from 'react-hot-toast';
import copyImg from '../assets/images/copy.svg';

import '../styles/room.code.scss';

type RoomCodeProps = {
    code: string;
}


export function RoomCode(props: RoomCodeProps) {
    function copyRoomCodeToCLipboard() {
        navigator.clipboard.writeText(props.code) 
            toast.success("Copiado!")
    }


    return (
        <button className="room-code" onClick={copyRoomCodeToCLipboard}>
            <div>
                <img src={copyImg} alt="Copy room code" />
            </div>
            <span>Sala <b>{props.code}</b></span>
        </button>
    )
}