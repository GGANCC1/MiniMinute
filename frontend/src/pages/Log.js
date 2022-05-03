import React, {useState, useEffect} from "react";
import Bookmark from "../components/bookmark";
import Header_log from "../components/Header_log";
import SidebarLog from "../components/Sidebar_log";
import NewBm from "../components/New_Bookmark";
import {useParams} from "react-router-dom";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import {google} from "@google-cloud/speech/build/protos/protos";
import url from '../api/axios';
import axios from "axios";
import {Modal, Nav} from "react-bootstrap";
import chatProfile from '../images/profile.png';
import Add_bm from '../images/Add_bm2.png';
import happy from '../images/happy.png';

function Log(){
    let params = useParams();  //url로 정보받아오기
    const dr_id = params.dr_id;
    const mn_id = params.mn_id;
    const [memo,setMemo] = useState("");    //메모
    const [isUpload, setIsUpload] = useState(false);
    const [audio, setAudio] = useState(""); //파일 url
    const [dialogue, setDialogue] = useState("");   //대화
    const [bookmark, setBookmark] = useState([]);   //북마크 리스트
    const [showBm, setShowBm] = useState(false);    //북마크모달
    const [participant, setParticipant] = useState(false);  //참가자 모달
    const [pNum, setPNum] = useState("");   //참가자 수
    const [keyword, setKeyword] = useState([]);   //키워드 리스트
    const [chat, setChat] = useState([]);   //키워드 리스트


    const onMemoHandler = (event) => {
        setMemo(event.currentTarget.value);
    }

    const onEditLogHandler =(event) => {
        event.preventDefault();
        url.put(
            `/minutes/${mn_id}`,{
                "mn_memo" : memo        //우선 메모만 추가
            }
        )
            .then((response) => {
                console.log(response);
                alert('저장!');
            })
            .catch((error) => {
                console.log(error.response);
                alert('실패!'); 
            });

    }

    useEffect(() => { // 처음에만 정보 받아옴
        url.get(     
            `/minutes/${mn_id}`
            )
            .then((response) => {
            console.log('회의록 정보 불러오기');
            console.log(response.data.mn_memo);
            setMemo(response.data.mn_memo);
            })
            .catch((error) => { //오류메시지 보이게 함
            console.log(error.response);
            });       
      }, []);

    useEffect(() => {
        url.get(
            `/minutes/${mn_id}/bookmark/lists`)
            .then((response) => {
                console.log(response.data);
                setBookmark(response.data);
            })
            .catch((error) => {
                console.log("북마크 목록 불러오기 실패 "+error)
            })
    },[showBm])
    
    let bookmarkList =[]; 
   //let bookmarkList = bookmark.map((bookmark) => (<li key={bookmark.bm_seq}>{bookmark.mn_id}</li>));
    let keywordList = [];

    const onAudioHandler = (e) => {
        const file = e.target.files[0];
        let type = file.name.slice(file.name.indexOf('.'), undefined);
        console.log(type);
        setIsUpload(true);
        setAudio("https://docs.google.com/uc?export=open&id=1glavx1db3_NMDUQgzmvPdP57UdaFXfVH");
        setParticipant(false);

        //파일 전송
        const formData = new FormData();
        formData.append("file", file);

        // url.post(`/minutes/${mn_id}/file/upload`, formData)
        //     .then((response) => {
        //         console.log(response.data);
        //         console.log(response.data.location);
        //         setAudio(response.data.location);
        //         console.log("업로드 성공");
        //     })
        //     .catch((error) => {
        //         console.log("업로드 실패 "+ error);
        //     });

    }

    return (
        <div>
            <Header_log/>
            <div className="main">
                <SidebarLog dr_id={dr_id} mn_id={mn_id} memo={memo}/>
                <div className="article">
                    <div style={{display: "flex"}} className="fade-in">
                        <div>
                            <h5>회의 전문</h5>
                            <Nav justify id="nav-log" variant="tabs" defaultActiveKey="/home">
                                <Nav.Item>
                                    <Nav.Link id="nav-link" eventKey="link-1">전체</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link id="nav-link" eventKey="link-2">행복</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link id="nav-link" eventKey="link-3">슬픔</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link id="nav-link" eventKey="link-4">분노</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <div className="dialogue"/*채팅 대화 구현*/>
                            <div className='chat-wrapper'>
                                <div className='display-container'>
                                    <ul className='chatting-list'>
                                        <li className="chat-mine">
                                            <span className='chat-profile'>
                                                <span className='chat-user'>참가자1</span>
                                                <img src={chatProfile} alt='any' />
                                            </span>
                                            <span className='chat-msg'>안녕하십니까</span>
                                            <span className='chat-time'>03:10</span>
                                            <img src={happy} alt='any' className='chat-emo'/>
                                        </li>
                                        <li className="chat-other">
                                            <span className='chat-profile'>
                                                <span className='chat-user' >참가자2</span>
                                                <img src={chatProfile} alt='any' />
                                            </span>
                                            <span className='chat-msg' >안녕</span>
                                            <span className='chat-time'>03:10</span>
                                            <img src={happy} alt='any' className='chat-emo'/>

                                        </li>
                                        <li className="chat-other">
                                            <span className='chat-profile'>
                                                <span className='chat-user' >참가자3</span>
                                                <img src={chatProfile} alt='any' />
                                            </span>
                                            <span className='chat-msg' >안녕</span>
                                            <span className='chat-time'>03:10</span>
                                            <img src={happy} alt='any' className='chat-emo'/>
                                        </li>
                                        <li className="chat-other">
                                            <span className='chat-profile'>
                                                <span className='chat-user' >참가자4</span>
                                                <img src={chatProfile} alt='any' />
                                            </span>
                                            <span className='chat-msg' >안녕</span>
                                            <span className='chat-time'>03:10</span>
                                            <img src={happy} alt='any' className='chat-emo'/>

                                        </li>      
                                                                        
                                    </ul>                     
                                </div>
                            </div>
                        </div>
                        </div>
                        <div className="side-func">
                            <div className="bookmark">
                                <div style={{ display: "flex"}}>
                                <h5 style={{ flexGrow: 1}}>북마크</h5>
                                <button type="button" className="none-btn" style={{marginBottom:"8px", color:"#B96BC6"} } onClick={()=>setShowBm(true)} >
                                    <img src={Add_bm} style={{width : "20px" , height : "20px" }} />
                                </button>
                                <NewBm showBm={showBm} setShowBm = {setShowBm} mn_id={mn_id}/>
                                </div>
                                <hr id="log-hr" />
                              
                                {bookmarkList= bookmark.map((bookmark) =>

                                            <Bookmark key={bookmark.bm_seq} bm_seq={bookmark.bm_seq} bm_name={bookmark.bm_name} bm_start={bookmark.bm_start} bm_end={bookmark.bm_end} mn_id={bookmark.mn_id} />                                                   
                                )}
                            </div>
                            <div className="keyword">
                                <h5>주요 키워드</h5>
                                <hr id="log-hr" />
                                <div style={{width:'300px' , height: '205px'}}>
                                {keywordList= keyword.map((keyword) =>            
                                       <span className="keyword-list" style={{minWidth : "40px" , height : "25px", display: 'inline-block', backgroundColor: '#B96BC6' ,color:'white',margin: '5px', textAlign: 'center'}}>{keyword}</span>                                   
                                )}
                                <button type="button" className="none-btn" style={{marginBottom:"8px", color:"#B96BC6"} } >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                             fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                                            <path
                                                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                            <path
                                                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                        </svg>
                                </button>
                                </div>
                            </div>
                            <div className="memo">
                                <h5>메모</h5>
                                <hr id="log-hr" />
                                <textarea placeholder="여기에 메모하세요" cols="35" rows="10" value={memo ? memo : ""} onChange={onMemoHandler}></textarea>
                            </div>
                            
                        </div>
                        {/* <div><button type="submit"  onClick={onEditLogHandler} className="submit-btn" >저장</button></div>    */}
                        
                    </div>
                    {!isUpload && <div className="voice-play">
                        <button type="button" id="btn-color" className="participant-btn" onClick={() => setParticipant(true)}>
                            음성 파일 업로드
                        </button>
                        <Modal show={participant} onHide={() => setParticipant(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>참가자 수를 입력해주세요</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <h6>참가자 수</h6>
                                <input type="number" className="form-control" id="directory-name" value={pNum} onChange={(e) => setPNum(e.target.value)} />
                            </Modal.Body>
                            <Modal.Footer>
                                <label id="btn-color" className="voice-btn" htmlFor="input-file">파일 업로드</label>
                                <input type="file" id="input-file" style={{display: "none"}}
                                       accept="audio/*"
                                       onChange={onAudioHandler}/>
                            </Modal.Footer>
                        </Modal>
                    </div>}
                    {isUpload && <AudioPlayer
                        src={audio}   //test audio
                        style={{marginBottom: "40px", width: "74%", border:"1px solid #E0BFE6", boxShadow: "none", borderRadius:"0"}}
                        customAdditionalControls={[]}
                    />}
                </div>
            </div>
        </div>
    );
}

export default Log;