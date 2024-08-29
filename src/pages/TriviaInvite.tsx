import { useEffect } from "react";
import * as TriviaService from "../services/triviaService";
import { useNavigate, useParams } from "react-router-dom";

export default function TriviaInvite() {
  const { triviaId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!triviaId) return;

    const acceptChallenge = async () => {
      try {
        await TriviaService.acceptTriviaInvite(triviaId);
        navigate(`/trivia/${triviaId}`);
      } catch (err) {
        console.log(err);
      }
    };

    acceptChallenge();
  }, [triviaId]);

  return <div>TriviaInvite</div>;
}
