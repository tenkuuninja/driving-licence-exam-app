import React, { useState, useEffect, useRef } from 'react';
import { 
  useRouteMatch,
  useHistory
} from 'react-router-dom';
import { IAnswer, IQuestion, IResult } from '../../interface';
import st from './exam.module.css';
import { 
  getOneHitQuestions, 
  getQuestionsByCode, 
  getQuestionsByIds, 
  getQuestionsByTopicId 
} from '../../data';
import { GrPrevious, GrNext } from 'react-icons/gr';
import { ImInfo } from 'react-icons/im';
import { FaChevronLeft } from 'react-icons/fa';
import Modal from '../components/Modal';
import NoMatchPage from '../NoMatchPage';

type Params = {
  [index: string]: string
}

const TIME = 1140;
let countDownInterval: NodeJS.Timeout;
const slug = [
  'khai-niem-va-quy-tac',
  'van-hoa-dao-duc-lai-xe',
  'ky-thuat-lai-xe',
  'bien-bao-duong-bo',
  'sa-hinh',
]
const topicTitle = [
  'Khái niệm và quy tắc',
  'Văn hoá đạo đức lái xe',
  'Kỹ thuật lái xe',
  'Biển báo đường bộ',
  'Sa hình',
]

const Menupage = function() {
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
  const [is404, set404] = useState<boolean>(false);
  // slider
  const contentRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLUListElement>(null);
  const isDragRef = useRef<boolean>(false);
  const clientXStart = useRef<number>(0);
  const startPosition = useRef<number>(0);
  const currentPosition = useRef<number>(0);
  // console.log('current question', currnetQuestion, currnetQuestion*100) 
  
  
  
  const gotoQuesttion = (arg: number | 'prev' | 'next') => {
    switch (arg) {
      case 'prev':
        if (currnetQuestion > 0) {
          setCurrentQuestion(currnetQuestion-1)
          setPositionByQuestionId(currnetQuestion-1)
        }
        break;
        case 'next':
          if (currnetQuestion < questions.length-1) {
            setCurrentQuestion(currnetQuestion+1)
            setPositionByQuestionId(currnetQuestion+1)
        }
        break;
      default:
        if (arg < 0) {
          setCurrentQuestion(0);
          setPositionByQuestionId(0);
        } else if (arg > questions.length-1) {
          setCurrentQuestion(questions.length-1)
          setPositionByQuestionId(questions.length-1)
        } else {
          setCurrentQuestion(Math.round(arg))
          setPositionByQuestionId(Math.round(arg))
        }
        setOpenAsideDrawer(false);
        break;
    }
  }

  const chooseAnswer = (questionId: number, answerIndex: number) => {
    if (!isSubmitted && isExam) {
      setQuestions(questions.map((item: IQuestion) => {
        if (item.id === questionId) {
          item.yourAnswer = answerIndex;
        }
        return item;
      }));
    }
  }

  const handleSubmit = () => {
    let score = 0
    let oneHit = false
    let failId: number[] = JSON.parse(localStorage.getItem('fail-id-test') || '[]');
    for (let question of questions) {
      if (question.yourAnswer !== undefined && question.answer[question.yourAnswer].isCorrect) {
        score++;
        if (failId.indexOf(question.id) !== -1) {
          failId = failId.filter(i => i !== question.id)
        }
        continue;
      }
      if (question.isCritical) {
        oneHit = true
      }
      if (!failId.includes(question.id)) {
        failId.push(question.id)
      }
    }
    failId.sort((a, b) => a-b)
    localStorage.setItem('fail-id-test', JSON.stringify(failId));

    if (oneHit) {
      setResult({ isPass: false, score, text: 'Bạn đã sai câu điểm liệt, Bạn đã lạc lúi' })
    } else if (score < 21) {
      setResult({ isPass: false, score, text: 'Bạn đã thiếu điểm rồi' })
    } else {
      setResult({ isPass: true, score, text: 'Bạn đã vượt qua bài thi' })
    }
    setSubmitted(true);
    setOpenConfirmSubmidModal(false);
    setOpenResultModal(true);
    clearInterval(countDownInterval)
  }

  const handleReset = () => {
    setQuestions(questions.map(i => ({...i, yourAnswer: undefined})));
    setCurrentQuestion(0);
    setSubmitted(false);
    setTimeRemaining(TIME)
    setOpenHelpModal(true)
  }

  const getResultClassNameOfChoice = (question: IQuestion, choiceIndex: number): keyof typeof st | '' => {
    if (!isExam) {
      return question.answer[choiceIndex].isCorrect ? st.correct : '';
    }
    if (isSubmitted) {
      if (question.answer[choiceIndex].isCorrect) {
        return  st.correct
      }
      return question.yourAnswer === choiceIndex ? st.wrong : ''
    } 
    return question.yourAnswer === choiceIndex ? st.correct : ''
  }

  const getColorClassNameOfButton = (question: IQuestion): keyof typeof st | '' => {
    if (!isExam) {
      return question.isCritical ? st['bg-sunfolower'] : st['bg-emerald'];
    }
    if (isSubmitted) {
      if (question.yourAnswer === undefined) {
        return st['bg-alizarin']
      }
      if (question.answer[question.yourAnswer].isCorrect) {
        return  st['bg-emerald']
      }
      return st['bg-alizarin']
    } 
    return question.yourAnswer === undefined ? st['bg-asbestos'] : st['bg-emerald']
  }

  const getHumanTimeString = (seconds: number): string => {
    let second = seconds%60;
    let minute = Math.floor(seconds/60);
    return `${minute<10?'0':''}${minute}:${second<10?'0':''}${second}`
  }

  const timer = function() {
    setTimeRemaining(timeRemaining => timeRemaining-1);
  }

  const startTheExam = () => {
    setOpenHelpModal(false);
    countDownInterval = setInterval(timer, 1000);
  }

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    // e.persist();
    // e.preventDefault();
    let clientX = getPageX(e);
    isDragRef.current = true;
    
    clientXStart.current = clientX;
    startPosition.current = currentPosition.current;

    if (galleryRef.current !== null) {
      galleryRef.current.style.cursor = 'grabbing';
    }
  }

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    // e.persist();
    // e.preventDefault();
    if (isDragRef.current) {
      let clientX = getPageX(e);
      let move = clientX - clientXStart.current;
      currentPosition.current = startPosition.current + move;
      updateCurrentPosition();
    }
  }

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    // e.persist();
    // e.preventDefault();
    if (!isDragRef.current) return;
    let moved = currentPosition.current - startPosition.current
    let currentIndex = currnetQuestion;
    let movedRequire = 120; // px
    if (moved < -movedRequire && currnetQuestion < questions.length-1) {
      currentIndex++
    }
    if (moved > movedRequire && currnetQuestion > 0) {
      currentIndex--
    }

    setPositionByQuestionId(currentIndex);
    gotoQuesttion(currentIndex)
    isDragRef.current = false;

    if (galleryRef.current !== null) {
      galleryRef.current.style.cursor = 'grab';
    }
  }

  const getPageX = (e: React.MouseEvent | React.TouchEvent) => {
    let x: number;
    if (e.nativeEvent instanceof MouseEvent) {
      x = e.nativeEvent.clientX || 0
    } else {
      x = e.nativeEvent.touches[0]?.clientX || 0
    }
    return x;
  }

  const getWidthSlider = () => {
    return contentRef.current?.clientWidth || 1
  }

  const updateCurrentPosition = () => {
    if (galleryRef.current !== null) {
      galleryRef.current.style.left = `${currentPosition.current}px`;
    }
  }

  const setPositionByQuestionId = (id: number) => {
    if (galleryRef.current !== null) {
      currentPosition.current = -id*getWidthSlider();
      updateCurrentPosition();
    }
  }


 
  useEffect(function() {
    setOpenHelpModal(false);
    setOpenConfirmSubmidModal(false);
    setOpenResultModal(false)
    switch (match.path) {
      case '/thi-sat-hach-de-so-(\\d).html':
        if ((+match.params[0]) >= 1 && (+match.params[0]) <= 8) {
          setIsExam(true);
          setOpenHelpModal(true)
          setQuestions(getQuestionsByCode(+match.params[0]))
          setSubmitted(false);
          setTitle('Đề thi thử số '+match.params[0])
        }
        else {
          set404(true);
        }
        break;
      case '/hoc-ly-thuyet-chu-de-([a-z-]+).html':
        let topicSlug = match.params[0]
        if (slug.indexOf(topicSlug) !== -1) {
          setIsExam(false);
          setQuestions(getQuestionsByTopicId(slug.indexOf(topicSlug)+1))
          setTitle(topicTitle[slug.indexOf(topicSlug)])
        }
        else {
          set404(true);
        }
        break;
      case '/on-tap-cau-diem-liet.html':
        setIsExam(false);
        setTitle('Ôn tập câu điểm liệt')
        setQuestions(getOneHitQuestions())
        break;
      case '/on-tap-cau-sai.html':
        setIsExam(false);
        setTitle('Ôn tập câu hay sai')
        const failId = JSON.parse(localStorage.getItem('fail-id-test') || '[]')
        setQuestions(getQuestionsByIds(failId))
        break;
    
      default:
        break;
    }
    return () => clearInterval(countDownInterval)
  }, [match.url]);

  useEffect(function() {
    if (timeRemaining <= 0) {
      clearInterval(countDownInterval);
      handleSubmit();
    }
  }, [timeRemaining]);

  useEffect(function() {
    const handleResize = () => {
      setPositionByQuestionId(currnetQuestion)
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  if (is404) {
    return (<NoMatchPage />);
  }

  return(
    <div className={`${st.wrapper}`}>
      <div className={`${st.header}`}>
        <div className="desktop-only">
          <div className={`${st.title}`} onClick={() => {
            if (isExam && !isSubmitted)
              setOpenConfirmExitModal(true);
            else
              history.push('/')
          }}>
            {<FaChevronLeft />}  
            <p>{title}</p>
          </div>
        </div>
        <div className={`mobile-only ${st.title} ${isExam ? 'hidden' : ''}`} onClick={() => history.push('/')}>
          {<FaChevronLeft />}  
          <p>{title}</p>
        </div>
        <div className={`mobile-only ${isExam ? '' : 'hidden'} ${st.btn}`} style={{textAlign: 'left'}} onClick={() => setOpenConfirmExitModal(true)}>
          Quay lại
        </div>
        <div className={`mobile-only ${isExam ? '' : 'hidden'} ${st.timer}`}>
          {getHumanTimeString(timeRemaining)}
        </div>
        {isSubmitted ?
          <div className={`mobile-only ${isExam ? '' : 'hidden'} ${st['btn']}`} onClick={handleReset}>
            LÀM LẠI
          </div>  : 
          <div className={`mobile-only ${isExam ? '' : 'hidden'} ${st['btn']}`} onClick={() => setOpenConfirmSubmidModal(true)}>
            NỘP BÀI
          </div>
        }
      </div>
      <div className={`${st.paper}`}>
        <div className={`${st.main}`}>
          <div className={`${st['control-bar']}`}>
            <span className={`${st.prev}`} onClick={() => gotoQuesttion('prev')}>
              <GrPrevious />
            </span>
            <span>
              Câu {Math.round(currnetQuestion+1)}/{questions.length}
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
                    {question.text}
                  </p>
                  {/* {question.image.length !== 0 && <img src={question.image} className={`${st['question-image']}`} draggable={false} />} */}
                  {question.image.length !== 0 && <div className={`${st['question-image']}`}>
                    <img src={question.image} alt="" />
                    <div className={st['image-mask']}></div>
                  </div>}
                  <ul className={`${st['choice-box']}`}>
                    {question.answer.map((choice: IAnswer, i: number) => <li key={i}>
                      <div 
                        className={`${st['choice-item']} ${getResultClassNameOfChoice(question, i)}`} 
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
          <div className={`${st.trigger}`} onClick={() => setOpenAsideDrawer(!isOpenAsideDrawer)}>
            
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
            <p>Bạn muốn nộp bài?</p>
          </div>
          <div className={st['modal-action']}>
            <span onClick={() => setOpenConfirmSubmidModal(false)}>
              Huỷ
            </span>
            <span onClick={handleSubmit}>
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
            diem {result.score}/25, {result.isPass ? 'qua': 'truot'}, ly do: {result.text}
          </div>
          <div className={st['modal-action']}>
            <span onClick={() => history.push('/')}>
              Quay về trang chủ
            </span>
            <span onClick={() => setOpenResultModal(false)}>
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
            Thong bao khi bat dau lam bai
          </div>
          <div className={st['modal-action']}>
            <span onClick={startTheExam}>
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
            Bạn có chắc mún thoát?
          </div>
          <div className={st['modal-action']}>
            <span onClick={() => setOpenConfirmExitModal(false)}>
              Thôi
            </span>
            <span onClick={() => history.push('/')}>
              Ừh
            </span>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Menupage;
