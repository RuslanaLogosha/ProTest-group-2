import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { testScoreOperations } from '../../../redux/testScore';
import { currentTestInfoSlice } from '../../../redux/testScore/test-reducers.js';
import arrow from '../../../images/arrow-main-page.svg';
import s from './HomePageButtons.module.css';

function Buttons() {
  const dispatch = useDispatch();

  const getQuestions = url => dispatch(testScoreOperations.getQuestions(url));

  return (
    <ul className={s.buttonContainer}>
      <li className={(s.buttonTech, s.button)}>
        <div className={s.buttonTech}>
          <Link
            to={{
              pathname: '/test',
              state: {
                quizName: 'QA technical training',
                url: 'techquiz/results',
              },
            }}
            className={s.buttonDescription}
            onClick={() => {
              getQuestions('techquiz/questions');
              dispatch(
                currentTestInfoSlice.actions.setInfo({
                  quizName: 'QA technical training',
                  url: 'techquiz/results',
                }),
              );
            }}
          >
            QA technical <br />
            training
            <img
              src={arrow}
              alt="arrow"
              width="24"
              height="16"
              className={s.arrow}
            />
          </Link>
        </div>
      </li>
      <li className={s.button}>
        <div className={s.buttonTheory}>
          <Link
            to={{
              pathname: '/test',
              state: {
                quizName: 'Theory Testing',
                url: 'theoryquiz/results',
              },
            }}
            className={s.buttonDescription}
            onClick={() => {
              getQuestions('theoryquiz/questions');
              dispatch(
                currentTestInfoSlice.actions.setInfo({
                  quizName: 'Theory Testing',
                  url: 'theoryquiz/results',
                }),
              );
            }}
          >
            Testing <br />
            theory
            <img
              src={arrow}
              alt="arrow"
              width="24"
              height="16"
              className={s.arrow}
            />
          </Link>
        </div>
      </li>
    </ul>
  );
}

export default Buttons;