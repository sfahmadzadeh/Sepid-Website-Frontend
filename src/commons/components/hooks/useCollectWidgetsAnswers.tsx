import { useState } from "react";
import { WidgetTypes } from "commons/types/widgets/widget";

type collectAnswersPropsType = {
  widgetId: number;
  widgetType: WidgetTypes;
}

export type GetAnswerCollectorType = ({ widgetId, widgetType }: collectAnswersPropsType) => (data: object) => void

const WidgetType2AnswerType = {
  SmallAnswerProblem: 'SmallAnswer',
  BigAnswerProblem: 'BigAnswer',
  UploadFileProblem: 'UploadFileAnswer',
  MultiChoiceProblem: 'MultiChoiceAnswer',
}

const useCollectWidgetsAnswers = (initialAnswers: any[]) => {
  const [answers, _setAnswers] = useState(initialAnswers);


  const getAnswerCollector = ({ widgetId, widgetType }: collectAnswersPropsType) => (data: object) => {
    let isFound = false;
    const tempAnswers = [...answers];
    for (let i = 0; i < tempAnswers.length; i++) {
      if (tempAnswers[i].problem === widgetId) {
        let isDataEmpty = true;
        for (let [key, value] of Object.entries(data)) {
          if (value) {
            isDataEmpty = false;
          }
          tempAnswers[i][key] = value;
        }
        if (isDataEmpty) {
          tempAnswers.splice(i, 1);
        }
        isFound = true;
        break;
      }
    }
    if (!isFound) {
      tempAnswers.push({
        ...data,
        answer_type: WidgetType2AnswerType[widgetType],
        problem: widgetId,
      });
    }
    _setAnswers(tempAnswers);
  };

  return { answers, getAnswerCollector };
}

export default useCollectWidgetsAnswers;