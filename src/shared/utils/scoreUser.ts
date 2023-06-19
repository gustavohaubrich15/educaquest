import { IUsersInfo } from "../../screens/QuizAdminScreen";
import { IQuestao } from "../components/EditQuestaoCard";

export const scoreUser = (usuario: IUsersInfo, questoes: IQuestao[]) => {
    const score = usuario.respostas
        .filter((resposta, index) => {
            return (
                questoes[index].alternativas.findIndex(
                    (alternativa) => alternativa.correta === true
                ) === resposta.resposta - 1
            );
        })
        .map((resposta, index) => {
            const questionTimeLimit = 60000;
            const questionMaxScore = 100;

            const timeDiff = resposta.tempoResposta;
            let questionScore = 0;

            if (timeDiff < questionTimeLimit) {
                const scorePercentage = 1 - timeDiff / questionTimeLimit;
                questionScore = Math.floor(questionMaxScore * scorePercentage);
            } else {
                questionScore = questionMaxScore;
            }

            return questionScore;
        });

    const totalScore = score.reduce(
        (total, score) => total + score,
        0
    );

    return totalScore
}