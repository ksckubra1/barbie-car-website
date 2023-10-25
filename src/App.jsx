import './App.css';
import bgVideo from "./assets/bg.mp4"
import {useEffect, useRef, useState} from "react";
import logo from "./assets/logo.png"
import barbieEditionLogo from "./assets/barbie-edition.png"
import prevBtn from "./assets/prev-btn.png"
import nextBtn from "./assets/next-btn.png"

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

function App() {

    const [startAnimState,setStartAnimState] = useState(0)


    let checkPoints = [0,2.1,2.6,4,5.4,6.2,8.5,9.1,11.20]
    const [currentCheckPoint,setCurrentCheckPoint] = useState(0)

    const [isPlaying, setIsPlaying]= useState(false)

    const [runFadeOut,setRunFadeOut] = useState(false)

    const videoElem = useRef(null)


    const ileriSar = async () => {
        if (currentCheckPoint===checkPoints.length-1 || isPlaying){
            return
        }

        setIsPlaying(true)

        let c = currentCheckPoint

        setTimeout(
            ()=>{
                setRunFadeOut(true)
                setTimeout(()=>{
                    setCurrentCheckPoint(v=>v+1)
                    setRunFadeOut(false)
                },500)
            },
            ((checkPoints[c+1]-checkPoints[c])*1000)/2
            // bir sonraki hedef saniyeden şuandaki saniyeyi çıkarıp arada geçen sürenin
            // yarısında state'i güncelliyoruz
            )

        while (true) {
            await sleep(41) // 0.041

            if (checkPoints[c+1] < videoElem.current.currentTime) {
                break
            }

            videoElem.current.currentTime = videoElem.current.currentTime + 0.0415
        }

        setIsPlaying(false)
    }

    const geriSar = async () => {
        if (currentCheckPoint===0 || isPlaying){
            return
        }
        setIsPlaying(true)

        let c = currentCheckPoint

        setTimeout(
            ()=>{
                setRunFadeOut(true)
                setTimeout(()=>{
                    setCurrentCheckPoint(v=>v-1)
                    setRunFadeOut(false)
                },500)
            },
            ((checkPoints[c]-checkPoints[c-1])*1000)/2
            // şuandaki saniyeden bir önceki hedef saniyeyi çıkarıp arada geçen sürenin
            // yarısında state'i güncelliyoruz
        )

        while (true) {
            await sleep(41)

            if (checkPoints[c-1] >= videoElem.current.currentTime){ // 0 > 0
                break
            }

            videoElem.current.currentTime = videoElem.current.currentTime-0.0415
        }

        setIsPlaying(false)
    }

    useEffect(() => {
        window.onkeydown = async (e) => {
            if (e.key === "ArrowLeft" && !isPlaying) await geriSar()
            if (e.key === "ArrowRight" && !isPlaying) await ileriSar()
        }
    }, []);


  return (
      <>
          <div className="h-screen w-screen overflow-x-hidden text-white">
              <video ref={videoElem} preload={"true"} className="absolute h-screen w-screen object-cover" src={bgVideo}></video>
              <div className={"flex flex-col relative z-40 w-screen h-screen p-36"}>
                  <header className={"flex justify-between items-center h-32"}>
                      <div className={"flex gap-5 items-center"}>
                          <img src={logo} alt=""/>
                          <span className={"text-xl"}>Antique Collections</span>
                      </div>
                      <div>
                          <span className={"text-xl"}>3D Showcase</span>
                      </div>
                  </header>
                  <div className={"flex-1 relative flex justify-center items-center"}>
                      {/*HERO*/}
                      {/*SECTION.1*/}
                      {currentCheckPoint === 0 && <section className={`fadeIn absolute left-0 flex flex-col gap-y-1${runFadeOut?" fadeOut":""}`}>
                          <span className={"text-5xl"}>Mercedes-Benz</span>
                          <span className={"text-6xl font-bold"}>300 SL Gullwing</span>
                          <span className={"text-5xl font-light text-white/70"}>1954</span>
                      </section>}

                      {/*SECTION.2*/}
                      {currentCheckPoint === 1 && <section className={`fadeIn absolute left-0 flex flex-col gap-y-1${runFadeOut?" fadeOut":""}`}>
                          <span className={"text-6xl"}>Spreading its</span>
                          <span className={"text-6xl font-bold"}>WINGS</span>
                          <span className={"text-4xl font-light text-white/70"}>like a pink eagle</span>
                      </section>}

                      {/*SECTION.3*/}
                      {currentCheckPoint === 2 && <section className={`fadeIn absolute left-0 flex flex-col${runFadeOut?" fadeOut":""}`}>
                          <span className={"text-[5rem] ml-10 text-white/70 -mb-20"}>Perfect</span>
                          <span className={"text-[10rem] text-white/50 font-bold"}>AERODYNAMIC</span>
                      </section>}

                      {/*SECTION.4*/}
                      {currentCheckPoint === 3 && <section className={`fadeIn absolute right-0 top-32 flex flex-col items-end${runFadeOut?" fadeOut":""}`}>
                          <span className={"text-5xl font-light -mb-10"}>AWESOME</span>
                          <span className={"text-[7rem] font-bold"}>SHAPE</span>
                      </section>}

                      {/*SECTION.5*/}
                      {currentCheckPoint === 4 && <section className={`fadeIn relative -top-[35rem] -left-72${runFadeOut ? " fadeOut" : ""}`}>
                          <span className={"text-[12rem] font-bold absolute left-0"}>XL</span>
                          <span className={"text-[5.5rem] text-white/70 absolute left-52 top-10 font-bold"}>trunk</span>
                          <span className={"text-[5.5rem] text-white/70 absolute left-60 top-[7rem] font-bold"}>volume</span>
                      </section>}

                      {/*SECTION.6*/}
                      {currentCheckPoint === 5 && <section className={`fadeIn flex gap-x-6 absolute bottom-10${runFadeOut ? " fadeOut" : ""}`}>
                          <span className={"text-[8rem] font-light text-white/70"}>fine</span>
                          <span className={"text-[8rem] font-bold text-white/70"}>design</span>
                          <span className={"text-[8rem] font-light text-white/70"}>details</span>
                      </section>}

                      {/*SECTION.7*/}
                      {currentCheckPoint === 6 && <section className={`fadeIn flex flex-col absolute -bottom-40 left-20${runFadeOut ? " fadeOut" : ""}`}>
                          <span className={"text-[8rem] font-light text-white/70 -mb-10"}>High level of</span>
                          <span className={"text-[8rem] font-bold ml-64"}>Handling</span>
                      </section>}

                      {/*SECTION.8*/}
                      {currentCheckPoint === 7 && <section className={`fadeIn flex flex-col items-end absolute right-0 bottom-32${runFadeOut ? " fadeOut" : ""}`}>
                          <span className={"text-[8rem] font-light text-white/70 -mb-20"}>Passive</span>
                          <span className={"text-[8rem] font-bold"}>Cooling</span>
                      </section>}

                      {/*SECTION.9*/}
                      {currentCheckPoint === 8 && <section className={`fadeIn flex flex-col items-end absolute right-0 bottom-48${runFadeOut ? " fadeOut" : ""}`}>
                          <span className={"text-[8rem] font-light text-white/70 -mb-20"}>Ultra-wide</span>
                          <span className={"text-[8rem] font-bold"}>View</span>
                      </section>}
                  </div>
                  <div className={"flex justify-between h-32"}>
                      <div className={"flex items-center"}>
                          {currentCheckPoint <2 && <img className={"fadeIn"} src={barbieEditionLogo} alt=""/>}
                      </div>

                      <div className={"flex gap-3 items-center"}>
                          {currentCheckPoint > 0 && <img onClick={geriSar} className={`cursor-pointer transition-all duration-200 active:scale-105${isPlaying ? " animate-pulse":""}`} src={prevBtn} alt=""/>}
                          {currentCheckPoint < checkPoints.length-1 && <img onClick={ileriSar} className={`cursor-pointer transition-all duration-200 active:scale-105${isPlaying ? " animate-pulse":""}`} src={nextBtn} alt=""/>}
                      </div>
                  </div>
              </div>
          </div>
          {
              startAnimState < 2 && <div className={`w-screen h-screen bg-custom fixed z-40 top-0 left-0 flex justify-center items-center${startAnimState===1?" startOut":""}`}>
                  {startAnimState === 0 && <button className={"bg-black/20 p-6 rounded-lg text-white font-bold text-lg"} onClick={()=> {
                      setStartAnimState(1)
                      setTimeout(()=>setStartAnimState(2),5000)
                  }}>Discover</button>}
                  {startAnimState === 1 && <div className={"relative w-96 h-20 -translate-x-20"}>
                      <div className={"startVendor"}>
                          <div className="startBarbie absolute w-96 h-52">
                              <img className={"w-3/5"} src={barbieEditionLogo} alt=""/>
                          </div>
                          <span className={"absolute text-white text-4xl whitespace-nowrap top-0 w-96 pt-5 bg-custom"}>Mercedes-Benz</span>
                      </div>
                      <div className="startLogo absolute w-72 h-20 bg-custom flex justify-end">
                          <img  src={logo} alt=""/>
                      </div>

                  </div>}
              </div>
          }
      </>
  );
}

export default App;
