import { IQuestion, localStorageEntities } from '@/models';
import { findAllTech } from '@/services';
import { persistDataLocalStorage } from '@/utilities';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Layout from '../../components/Layout/Layout';
import { MustachyWithDialog } from './';
import { FloatingButton, Main } from './styled-components/';
import { AuthFlag } from '@/utilities';

const messages = ['Hola!! Soy Mustachy y seré tu guía durante esta travesía', 'Te voy a hacer unas preguntas para conocer tu nivel'];

export const Dashboard = () => {
  const [quest, setQuest] = useState(false);
  const [message, setMessage] = useState(0);
  const [text, setText] = useState(messages[message]);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  const handleLoad = async () => {
    const questions = await findAllTech();
    /* questions.length = 4; */

    const body = {
      data: questions,
      entity: localStorageEntities.questions,
    };
    persistDataLocalStorage<IQuestion>(body);
  };

  const HandleClick = () => {
    if (text === messages[1]) {
      navigate('/question/1');
    } else {
      setMessage((message) => message + 1);
    }
  };

  useEffect(() => {
    handleLoad();
  }, []);

  useEffect(() => {
    const onResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    setText(messages[message]);
    if (message > messages.length - 1) {
      setQuest(true);
    }
  }, [message]);

  return (
    <>
      {!AuthFlag ? (
        <Main $quest={quest && viewportWidth > 700}>
          {viewportWidth < 700 && quest ? null : <MustachyWithDialog dialogWidth="calc(17ch + 10vmax)">{text}</MustachyWithDialog>}
          <FloatingButton onClick={HandleClick}>Continuar</FloatingButton>
        </Main>
      ) : (
        <Layout>
          <Main $quest={quest && viewportWidth > 700}>
            {viewportWidth < 700 && quest ? null : <MustachyWithDialog dialogWidth="calc(17ch + 10vmax)">{text}</MustachyWithDialog>}
            <FloatingButton onClick={HandleClick}>Continuar</FloatingButton>
          </Main>
        </Layout>
      )}
    </>
  );
};

export default Dashboard;
