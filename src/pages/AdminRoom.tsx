import toast, { Toaster } from 'react-hot-toast';


import { useParams } from 'react-router';

import { Link, useHistory } from 'react-router-dom';

import Logo from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import deleteImg from '../assets/images/delete.svg'

import '../styles/room.scss';
import { Question } from '../components/Question';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';



type RoomParams = {
    id: string;
}

export function AdminRoom() {
    const history = useHistory()
    const params = useParams<RoomParams>();
    const roomId = params.id;

    const { title, questions } = useRoom(roomId);

    async function handleEndRoom() {
        database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        })
        history.push('/');
        toast.success("Sala encerrada")
    }

    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm('Tem certeza que você deseja Excluir esta pergunta?')) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }


    return (


        <div id="page-room">
            <Toaster
                position="top-center"
                reverseOrder={true}
            />
            <header>
                <div className="content">
                    <div>
                    <Link to="/">
                        <img className="img" src={Logo} alt="logo" />
                    </Link>
                    <hr />
                    <h3>Admin</h3>
                    </div>

                    <div>
                        <RoomCode code={roomId} />
                        <Button isOutlined onClick={handleEndRoom}>Encerrar Sala</Button>
                    </div>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala <b>{title}</b></h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>

                <div className="question-list">
                    {questions.map(question => {
                        return (
                            <Question
                                key={question.id}
                                content={question.content}
                                author={question.author}
                            >
                                <button
                                    type="button"
                                    onClick={() => handleDeleteQuestion(question.id)}
                                >
                                    <img src={deleteImg} alt="Remover" />
                                </button>
                            </Question>
                        )
                    })}
                </div>
            </main>
        </div>
    );
}