import { IUsersInfo } from "../../screens/QuizAdminScreen"
import { IQuestao } from "../components/EditQuestaoCard";


export const rankingUsers = (usersInfo: IUsersInfo[], questoes: IQuestao[]) => {

    return usersInfo.sort((a, b) => {
        const aCorrectAnswers = a.respostas.filter((resposta, index) => {
            return questoes[index].alternativas.findIndex(alternativa => alternativa.correta === true) === resposta.resposta - 1
        }).length

        const bCorrectAnswers = b.respostas.filter((resposta, index) => {
            return questoes[index].alternativas.findIndex(alternativa => alternativa.correta === true) === resposta.resposta - 1
        }).length

        // Se o número de acertos for o mesmo, desempate com base no menor tempo de resposta entre as respostas corretas
        if (aCorrectAnswers === bCorrectAnswers) {
            const aCorrectResponseTimes = a.respostas
                .filter((resposta, index) => {
                    return (
                        questoes[index].alternativas.findIndex(
                            (alternativa) => alternativa.correta === true
                        ) === resposta.resposta - 1
                    );
                })
                .map((resposta, index) => {
                    const questionTimeLimit = 60000;
                    const questionMaxScore = 20;

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

            const bCorrectResponseTimes = b.respostas
                .filter((resposta, index) => {
                    return (
                        questoes[index].alternativas.findIndex(
                            (alternativa) => alternativa.correta === true
                        ) === resposta.resposta - 1
                    );
                })
                .map((resposta, index) => {
                    const questionTimeLimit = 60000;
                    const questionMaxScore = 20;

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

            const aTotalScore = aCorrectResponseTimes.reduce(
                (total, score) => total + score,
                0
            );
            const bTotalScore = bCorrectResponseTimes.reduce(
                (total, score) => total + score,
                0
            );

            return bTotalScore - aTotalScore;
        }

        return bCorrectAnswers - aCorrectAnswers;
    });

}