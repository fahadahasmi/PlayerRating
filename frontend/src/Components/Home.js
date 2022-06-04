import { useEffect, useRef, useMemo, useState, React } from "react";
import Loader from "./Loader";

export default function Home() {
  const [data, setData] = useState();
  const [PlayerData, setPlayerData] = useState();
  const [rating, SetRating] = useState();
  const [id,SetId] = useState();

  const modal = useRef("none");
  const formMod = useRef("none");

  function openModal() {
    modal.current.style.display = "flex";
  }

  function formModal() {
    formMod.current.style.display = "flex";
  }

  function closeModal() {
    modal.current.style.display = "none";
    formMod.current.style.display = "none";
  }

  useEffect(() => {
    PlayersData();
  }, []);

  useMemo(() => PlayersData(), []);

  function PlayersData() {
    try{
      fetch(`http://localhost:4000/api/players/getAllPlayers`)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      })
      .catch((e) => {
        alert(e);
      });
    }catch(e){
      alert(e);
    }
  }

  function ViewPlayer(id) {
    try{
      openModal();
      fetch(`http://localhost:4000/api/players/getPlayerDetail/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setPlayerData(res);
      })
      .catch((e) => {
        alert(e);
      });
    }catch(e){
      alert(e);
    }
  }

  function UpdateRating(id) {
    try{
      formModal();
      fetch(`http://localhost:4000/api/players/addRatPlayers/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating: rating,
        }),
      })
      .then((res) => res.json())
      .then((res) => {
        setPlayerData(res);
        alert("Rating Updated");
        PlayersData();
      })
      .catch((e) => {
        alert(e);
      });
    }catch(e){
      alert(e);
    }
  }

  return (
    <div className="container">

      <h3 style={{margin: "20px auto", textAlign:"center",fontWeight:"bolder",color:"azure",textShadow:"1px 1px" }}> Player Rating App </h3>

      {
        data?
        <table
        className="responsive-table centered z-depth-5"
        style={{ width: 800, height: 400, margin: "50px auto",background:'#90e0ef' }}
      >
        <thead>
          <tr>
            <th data-field="id">Sr. No</th>
            <th data-field="name">Player Name</th>
            <th data-field="team">Team Name</th>
            <th data-field="Exp">Experience</th>
            <th data-field="Rating">Rating</th>
            <th data-field="Action">Action</th>
          </tr>
        </thead>
    
        <tbody>
          <div ref={modal} style={{ zIndex: 2, width: 350 }} className="modal">
            <div className="modal-content" style={{ width: 830 }}>
              <div class="card horizontal">
                <div class="card-stacked">
                  <div class="card-content">
                    {PlayerData ? (
                      Object.keys(PlayerData).map((k) => {
                        return (
                          <div>
                            <p>No of Matches: {PlayerData[k].NoOfMatches}</p>
                            <p>Name: {PlayerData[k].Name}</p>
                            <p>Runs: {PlayerData[k].Runs}</p>
                            <p>Team Name: {PlayerData[k].TeamName}</p>
                            <p>Experience: {PlayerData[k].Exp}</p>
                            <p>Player rating: {PlayerData[k].Rating}</p>
                          </div>
                        );
                      })
                    ) : (
                      <Loader />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <a
                onClick={() => {
                  closeModal();
                }}
                className="modal-close waves-effect waves-green btn-flat"
              >
                Close
              </a>
            </div>
          </div>

          <div ref={formMod} style={{ zIndex: 2, width: 350 }} className="modal">
            <div className="modal-content" style={{ width: 830 }}>
              <div className="row">
                <form className="col s12">
                  <div className="row">
                    <div className="input-field col s12">
                      <input id="text" type="text" className="validate" onChange={(e)=> SetRating(e.target.value)} />
                      <label for="text">Rating</label>
                      <a
                      className="btn waves-effect green accent-2"
                      type="submit"
                      name="ViewPlayer"
                      onClick={()=>UpdateRating(id)}
                    >
                      Update
                    </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <a
                onClick={() => {
                  closeModal();
                }}
                className="modal-close waves-effect waves-green btn-flat"
              >
                Close
              </a>
            </div>
          </div>

          {

(
  Object.keys(data).map((info) => {
    return (
      <tr>
        <td>{data[info].PlayerId}</td>
        <td>{data[info].Name}</td>
        <td>{data[info].TeamName}</td>
        <td>{data[info].Exp}</td>
        <td>{data[info].Rating}</td>
        <td>
          <a
            className="btn waves-effect blue lighten-3"
            type="submit"
            name="ViewPlayer"
            onClick={() => ViewPlayer(data[info].PlayerId)}
          >
            View Player
          </a>
        </td>
        <td>
          <a
            className="btn waves-effect  teal lighten-1"
            type="submit"
            name="UpdateRating"
            onClick={
              () =>{
                formModal();
                SetId(data[info].PlayerId);
              }
            }
          >
            Update rating
          </a>
        </td>
      </tr>
    );
  })
)}
        </tbody>
      </table>:
      <Loader />
      }
    </div>
  );
}
