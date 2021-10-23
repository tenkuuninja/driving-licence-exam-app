import React, { useState, useEffect, useRef } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { IAnswer, IQuestion, IResult } from '../../interface';
import st from './exam.module.css';
import { 
  getImportantQuestions, 
  getQuestionsByTestCode, 
  getQuestionsByIds, 
  getQuestionsByTopicId 
} from '../../data';
import { GrPrevious, GrNext } from 'react-icons/gr';
import { ImInfo } from 'react-icons/im';
import { FaChevronLeft } from 'react-icons/fa';
import Modal from '../components/Modal';
import ToggleDarkMode from '../components/ToggleDarkMode';

type Params = {
  [key: string]: string
}

const TIME = 1140;
let countDownInterval: NodeJS.Timeout;
const slug = [
  'khai-niem-va-quy-tac',
  'van-hoa-dao-duc-lai-xe',
  'ky-thuat-lai-xe',
  'bien-bao-duong-bo',
  'sa-hinh',
];
const topicTitle = [
  'Khái niệm và quy tắc',
  'Văn hoá đạo đức lái xe',
  'Kỹ thuật lái xe',
  'Biển báo đường bộ',
  'Sa hình',
];

const ExamPage = function() {
  const match = useRouteMatch<Params>();
  const history = useHistory();
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [currnetQuestion, setCurrentQuestion] = useState<number>(0);
  const [timeRemaining, setTimeRemaining] = useState<number>(TIME);
  const [title, setTitle] = useState<string>('');
  const [isExam, setIsExam] = useState<boolean>(false);
  const [isSubmitted, setSubmitted] = useState<boolean>(false);
  const [isOpenConfirmSubmidModal, setOpenConfirmSubmidModal] = useState<boolean>(false);
  const [isOpenResultModal, setOpenResultModal] = useState<boolean>(false);
  const [isOpenHelpModal, setOpenHelpModal] = useState<boolean>(false);
  const [isOpenConfirmExitModal, setOpenConfirmExitModal] = useState<boolean>(false);
  const [isOpenAsideDrawer, setOpenAsideDrawer] = useState<boolean>(false);
  const [result, setResult] = useState<IResult>({ isPass: false, score: 0, text: '' });
  
  const contentRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLUListElement>(null);
  const isDragRef = useRef<boolean>(false);
  const clientXStart = useRef<number>(0);
  const startPosition = useRef<number>(0);
  const currentPosition = useRef<number>(0);
  // console.log('current question', currnetQuestion) 
  

  useEffect(function() {
    setOpenHelpModal(false);
    setOpenConfirmSubmidModal(false);
    setOpenResultModal(false);
    switch (match.path) {
      case '/thi-sat-hach-de-so-(\\d).html':
        setIsExam(true);
        setOpenHelpModal(true);
        setQuestions(getQuestionsByTestCode(+match.params[0]));
        setSubmitted(false);
        setTitle('Đề thi thử số '+match.params[0]);
        break;
      case '/hoc-ly-thuyet-chu-de-([a-z-]+).html':
        let topicSlug = match.params[0];
        setIsExam(false);
        setQuestions(getQuestionsByTopicId(slug.indexOf(topicSlug)+1));
        setTitle(topicTitle[slug.indexOf(topicSlug)] || 'Chủ đề không tồn tại');
        break;
      case '/on-tap-cau-diem-liet.html':
        setIsExam(false);
        setTitle('Ôn tập câu điểm liệt');
        setQuestions(getImportantQuestions());
        break;
      case '/on-tap-cau-sai.html':
        setIsExam(false);
        setTitle('Ôn tập câu hay sai');
        const failId = JSON.parse(localStorage.getItem('fail-id-test') || '[]');
        setQuestions(getQuestionsByIds(failId));
        break;
      default:
        break;
    }
    return () => clearInterval(countDownInterval);
    // eslint-disable-next-line
  }, [match.url]);
  
  
  const gotoQuesttion = (arg: number | 'prev' | 'next') => {
    switch (arg) {
      case 'prev':
        if (currnetQuestion > 0) {
          setCurrentQuestion(currnetQuestion-1);
          setPositionByQuestionIndex(currnetQuestion-1);
        }
        break;
      case 'next':
        if (currnetQuestion < questions.length-1) {
          setCurrentQuestion(currnetQuestion+1);
          setPositionByQuestionIndex(currnetQuestion+1);
        }
        break;
      default:
        if (arg < 0) {
          setCurrentQuestion(0);
          setPositionByQuestionIndex(0);
        } else if (arg > questions.length-1) {
          setCurrentQuestion(questions.length-1);
          setPositionByQuestionIndex(questions.length-1);
        } else {
          setCurrentQuestion(Math.round(arg));
          setPositionByQuestionIndex(Math.round(arg));
        }
        break;
      }
    setOpenAsideDrawer(false);
  }

  const chooseAnswer = (questionId: number, answerIndex: number) => {
    if (!isSubmitted && isExam) {
      setQuestions(questions.map((item: IQuestion) => {
        if (item.id === questionId) {
          item.userAnswer = answerIndex;
        }
        return item;
      }));
    }
  }

  const handleSubmit = () => {
    let score = 0;
    let isFail = false;
    let failId: number[] = JSON.parse(localStorage.getItem('fail-id-test') || '[]');
    for (let question of questions) {
      if (question.userAnswer !== undefined && question.answer[question.userAnswer].isCorrect) {
        score++;
        if (failId.indexOf(question.id) !== -1) {
          failId = failId.filter(i => i !== question.id);
        }
        continue;
      }
      if (question.isCritical) {
        isFail = true;
      }
      if (!failId.includes(question.id)) {
        failId.push(question.id);
      }
    }
    failId.sort((a, b) => a-b);
    localStorage.setItem('fail-id-test', JSON.stringify(failId));

    if (isFail) {
      setResult({ isPass: false, score, text: 'Bạn đã sai câu điểm liệt' });
    } else if (score < 21) {
      setResult({ isPass: false, score, text: 'Bạn đã bị thiếu điểm' });
    } else {
      setResult({ isPass: true, score, text: 'Bạn đã vượt qua bài thi' });
    }
    setSubmitted(true);
    setOpenConfirmSubmidModal(false);
    setOpenResultModal(true);
    clearInterval(countDownInterval);
  }

  const handleReset = () => {
    setQuestions(questions.map(i => ({...i, userAnswer: undefined})));
    setCurrentQuestion(0);
    setSubmitted(false);
    setTimeRemaining(TIME);
    setOpenHelpModal(true);
  }

  const getColorClassNameOfChoice = (question: IQuestion, choiceIndex: number): keyof typeof st | '' => {
    if (!isExam) {
      return question.answer[choiceIndex].isCorrect ? st.correct : '';
    }
    if (isSubmitted) {
      if (question.answer[choiceIndex].isCorrect) {
        return  st.correct;
      }
      return question.userAnswer === choiceIndex ? st.wrong : '';
    } 
    return question.userAnswer === choiceIndex ? st.correct : '';
  }

  const getColorClassNameOfButton = (question: IQuestion): keyof typeof st | '' => {
    if (!isExam) {
      return question.isCritical ? st['bg-warning'] : st['bg-success'];
    }
    if (isSubmitted) {
      if (question.userAnswer === undefined) {
        return st['bg-error'];
      }
      if (question.answer[question.userAnswer].isCorrect) {
        return  st['bg-success'];
      }
      return st['bg-error'];
    } 
    return question.userAnswer === undefined ? st['bg-empty'] : st['bg-success'];
  }

  const getHumanTimeString = (seconds: number): string => {
    let second = seconds%60;
    let minute = Math.floor(seconds/60);
    return `${minute<10?'0':''}${minute}:${second<10?'0':''}${second}`;
  }

  const timer = function() {
    setTimeRemaining(timeRemaining => timeRemaining-1);
  }

  const startTheExam = () => {
    setOpenHelpModal(false);
    countDownInterval = setInterval(timer, 1000);
  }

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    let clientX = getPageX(e);
    isDragRef.current = true;
    
    clientXStart.current = clientX;
    startPosition.current = currentPosition.current;

    if (galleryRef.current !== null) {
      galleryRef.current.style.cursor = 'grabbing';
      galleryRef.current.style.transitionDuration = '0ms';
    }
  }

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (isDragRef.current) {
      let clientX = getPageX(e);
      let move = clientX - clientXStart.current;
      currentPosition.current = startPosition.current + move;
      updateCurrentPosition();
    }
  }

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (galleryRef.current !== null) {
      galleryRef.current.style.cursor = 'grab';
      galleryRef.current.style.transitionDuration = '300ms';
    }
    if (!isDragRef.current) return;
    isDragRef.current = false;
    let moved = currentPosition.current - startPosition.current;
    let currentIndex = currnetQuestion;
    let movedRequire = 120; // px
    if (moved < -movedRequire) {
      currentIndex++;
    }
    if (moved > movedRequire) {
      currentIndex--;
    }
    gotoQuesttion(currentIndex);

  }

  const getPageX = (e: React.MouseEvent | React.TouchEvent) => {
    let x: number;
    if (e.nativeEvent instanceof MouseEvent) {
      x = e.nativeEvent.clientX || 0;
    } else {
      x = e.nativeEvent.touches[0]?.clientX || 0;
    }
    return x;
  }

  const getWidthSlider = () => {
    return contentRef.current?.clientWidth || 1;
  }

  const updateCurrentPosition = () => {
    if (galleryRef.current !== null) {
      galleryRef.current.style.left = `${currentPosition.current}px`;
    }
  }

  const setPositionByQuestionIndex = (index: number) => {
    currentPosition.current = -index*getWidthSlider();
    updateCurrentPosition();
  }

  useEffect(function() {
    if (timeRemaining <= 0) {
      clearInterval(countDownInterval);
      handleSubmit();
    }
    // eslint-disable-next-line
  }, [timeRemaining]);


  if (questions.length === 0) return (
    <div className={st.wrapper} >
      <div className={st.header}>
        <div className={st.title} onClick={() => history.push('/')}><FaChevronLeft /> {title}</div>
        <ToggleDarkMode />
      </div>
      <div className={st.paper}>
        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translateX(-50%) translateY(-50%)' }}>
          <p style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>Không có nội dung</p>
          <button className={st['submit-btn']} onClick={() => history.push('/')}>Quay lại trang chủ</button>
        </div>
      </div>
    </div>
  );

  return(
    <div className={`${st.wrapper}`}>
      <div className={`${st.header} desktop-only`}>
        <div className={`${st.title}`} onClick={() => {
            if (isExam && !isSubmitted)
              setOpenConfirmExitModal(true);
            else
              history.push('/')
          }}>
            {<FaChevronLeft />}  
            <p>{title}</p>
        </div>
        <ToggleDarkMode />
      </div>
      <div className={`${st.header} mobile-only`}>
        <div className={`${st.title} ${isExam ? 'hidden' : ''}`} onClick={() => history.push('/')}>
          {<FaChevronLeft />}  
          <p>{title}</p>
        </div>
        <div className={`${isExam ? '' : 'hidden'} ${st.btn}`} style={{textAlign: 'left'}} onClick={() => setOpenConfirmExitModal(true)}>
          Quay lại
        </div>
        <div className={`${isExam ? '' : 'hidden'} ${st.timer}`}>
          {getHumanTimeString(timeRemaining)}
        </div>
        {isSubmitted ?
          <div className={`${isExam ? '' : 'hidden'} ${st['btn']}`} onClick={handleReset}>
            LÀM LẠI
          </div>  : 
          <div className={`${isExam ? '' : 'hidden'} ${st['btn']}`} onClick={() => setOpenConfirmSubmidModal(true)}>
            NỘP BÀI
          </div>
        }
      </div>
      <div className={`${st.paper}`}>
        <div className={`${st.main}`}>
          <div className={`${st['control-bar']} desktop-only`}>
            <span className={`${st.prev}`} onClick={() => gotoQuesttion('prev')}>
              <GrPrevious />
            </span>
            <span>
              Câu {currnetQuestion+1}/{questions.length}
            </span>
            <span className={`${st.next}`} onClick={() => gotoQuesttion('next')}>
              <GrNext />
            </span>
          </div>
          <div 
            ref={contentRef} 
            className={`${st.content}`}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
          >
            <ul ref={galleryRef} className={`${st.galery}`} >
              {questions.map((question: IQuestion) => <li key={question.id}>
                <div className={`${st['question-box']}`}>
                  <p className={st['question-text']}>
                    {question.text} {((!isExam || isSubmitted) && question.isCritical) && <span className={st.warning}>(Câu điểm liệt)</span>}
                  </p>
                  {question.image.length !== 0 && <div className={`${st['question-image']}`}>
                    <img src={question.image} alt="" />
                    <div className={st['image-mask']}></div>
                  </div>}
                  <ul className={`${st['choice-box']}`}>
                    {question.answer.map((choice: IAnswer, i: number) => <li key={i}>
                      <div 
                        className={`${st['choice-item']} ${getColorClassNameOfChoice(question, i)}`} 
                        onClick={() => chooseAnswer(question.id, i)}
                      >
                        <span className={`${st.bullet}`}>
                          {i+1}
                        </span>
                        <span>
                          {choice.text}
                        </span>
                      </div>
                    </li>)}
                  </ul>
                  {(!isExam || isSubmitted) && <div className={`${st['question-explain']}`}>
                    <span><ImInfo /></span>
                    <p>{question.explain}</p>
                  </div>}
                </div>
              </li>)}
            </ul>
          </div>
        </div>
        <div className={`${st['aside-desktop']}`}>
          {isExam === true && <div className={st['time-box']}>
            <p>Thời gian còn lại</p>
            <p className={st.timer}>
              {getHumanTimeString(timeRemaining)}
            </p>
          </div>}
          <ul className={st['list-btn']}>
            {questions.map((question: IQuestion, i: number) => <li key={question.id}>
              <span className={`${getColorClassNameOfButton(question)}`} onClick={() => gotoQuesttion(i)}>{i+1}</span>
            </li>)}
          </ul>
          {isExam === true && (isSubmitted ?
            <button className={`${st['submit-btn']}`} onClick={handleReset}>LÀM LẠI</button> 
            : 
            <button 
              className={`${st['submit-btn']}`} 
              onClick={() => setOpenConfirmSubmidModal(true)}
            >
              NỘP BÀI
            </button>)
          }
        </div>
        <div  
          className={`${st['aside-mobile-drawer']} ${isOpenAsideDrawer ? st.active : ''}`} 
          onClick={() => setOpenAsideDrawer(false)}
        ></div>
        <div className={`${st['aside-mobile']} ${isOpenAsideDrawer ? st.active : ''}`}>
          <div className={`${st['aside-trigger']}`} >
            <span onClick={() => gotoQuesttion('prev')}>
              <GrPrevious />
            </span>
            <span className={st.trigger} onClick={() => setOpenAsideDrawer(!isOpenAsideDrawer)}>
              Câu {Math.round(currnetQuestion+1)}/{questions.length}
            </span>
            <span onClick={() => gotoQuesttion('next')}>
              <GrNext />
            </span>
          </div>
          <div className={`${st['aside-paper']}`}>
            <ul className={st['list-btn']}>
              {questions.map((question: IQuestion, i: number) => <li key={question.id}>
                <span className={`${getColorClassNameOfButton(question)}`} onClick={() => gotoQuesttion(i)}>{i+1}</span>
              </li>)}
            </ul>
          </div>
        </div>
      </div>
      <Modal 
        isOpen={isOpenConfirmSubmidModal}
        handleOutsideClick={() => setOpenConfirmSubmidModal(false)}
      >
        <div className={`${st['modal-paper']}`}>
          <div className={st['modal-content']}>
            <p>Bạn đã làm {questions.filter(q => typeof q.userAnswer === 'number').length}/{questions.length} câu</p>
            <p>Bạn muốn nộp bài?</p>
          </div>
          <div className={st['modal-action']}>
            <span className={st.cancel} onClick={() => setOpenConfirmSubmidModal(false)}>
              Huỷ
            </span>
            <span className={st.confirm} onClick={handleSubmit}>
              Đồng ý
            </span>
          </div>
        </div>
      </Modal>
      <Modal 
        isOpen={isOpenResultModal}
        handleOutsideClick={() => setOpenResultModal(false)}
      >
        <div className={`${st['modal-paper']}`}>
          <div className={st['modal-content']}>
            <p className={`${result.isPass ? st.success : st.error}`} style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1rem' }}>
              {result.isPass ? 'Đạt': 'Không đạt'}
            </p>
            <p>Điểm: <span style={{ fontWeight: 700 }}>{result.score}/25</span></p>
            {!result.isPass && <p>Bạn trượt vì lý do: {result.text}</p>}
            {result.isPass && <p>{result.text}</p>}
          </div>
          <div className={st['modal-action']}>
            <span className={st.cancel}  onClick={() => history.push('/')}>
              Quay về trang chủ
            </span>
            <span className={st.confirm}  onClick={() => setOpenResultModal(false)}>
              Xem kết quả
            </span>
          </div>
        </div>
      </Modal>
      <Modal 
        isOpen={isOpenHelpModal}
      >
        <div className={`${st['modal-paper']}`}>
          <div className={st['modal-content']}>
            <div>
              <p>Số câu: {questions.length} câu</p>
              <p>Thời gian: 19 phút</p>
              <p>Điều kiện hoàn thành: Đúng tối thiếu 21 câu và không bị sai câu điểm liệt</p>
            </div>
          </div>
          <div className={st['modal-action']}>
            <span className={st.confirm} onClick={startTheExam}>
              Bắt đầu
            </span>
          </div>
        </div>
      </Modal>
      <Modal 
        isOpen={isOpenConfirmExitModal}
        handleOutsideClick={() => setOpenConfirmExitModal(false)}
      >
        <div className={`${st['modal-paper']}`}>
          <div className={st['modal-content']}>
            <p>Bạn đã làm {questions.filter(q => typeof q.userAnswer === 'number').length}/{questions.length} câu</p>
            <p>Bạn có chắc muốn thoát?</p>
          </div>
          <div className={st['modal-action']}>
            <span className={st.cancel}  onClick={() => setOpenConfirmExitModal(false)}>
              Ở lại
            </span>
            <span className={st.confirm}  onClick={() => history.push('/')}>
              Thoát
            </span>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ExamPage;
