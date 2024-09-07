import { useDispatch } from 'react-redux';
import { WidgetModes } from 'commons/components/organisms/Widget';
import WIDGET_TYPE_MAPPER from './WidgetTypeMapper';
import { useCreateWidgetMutation, useDeleteWidgetMutation, useUpdateWidgetMutation } from 'apps/website-display/redux/features/widget/WidgetSlice';
import { runConfetti } from 'commons/components/molecules/confetti'
import { toast } from 'react-toastify';
import { useState } from 'react';

type WidgetFactoryType = {
  widgetId?: string;
  paperId?: string;
  widgetType?: string;
  mode: WidgetModes;
  collectAnswer?: any;
}

const useWidgetFactory = ({
  widgetId,
  paperId,
  widgetType,
  mode,
  collectAnswer,
}: WidgetFactoryType) => {
  // skip fetch is initially true, means it doesnot need to fetch the widget data for the first time
  // the widget data should be fetched after each update
  const [skipFetch, setSkipFetch] = useState(true);
  const dispatcher = useDispatch();
  const [deleteWidget] = useDeleteWidgetMutation();
  const [createWidget] = useCreateWidgetMutation();
  const [updateWidget] = useUpdateWidgetMutation();

  let onDelete, onMutate, onAnswerChange, onQuery, onAnswerSubmit;

  if (!widgetType) {
    return null;
  }

  const {
    WidgetComponent,
    EditWidgetDialog,
    submitAnswerAction,
  } = WIDGET_TYPE_MAPPER[widgetType];

  onMutate =
    widgetId ?
      (props) => {
        updateWidget({ widgetType, paperId: paperId, widgetId, ...props });
        setSkipFetch(false);
      } :
      (props) => {
        createWidget({ widgetType, paperId: paperId, ...props });
        setSkipFetch(false);
      }

  onAnswerChange = collectAnswer ? collectAnswer : () => { };

  // todo refactor: this peace of code should be extracted as a separate method
  onAnswerSubmit = (props) => dispatcher(submitAnswerAction(props)).then((response) => {
    const CORRECTNESS_THRESHOLD = 50;
    if (response.error) return;
    if (response.payload?.response?.score >= 0) {
      if (response.payload.response.score > CORRECTNESS_THRESHOLD) {
        runConfetti();
        toast.success('آفرین! پاسخ شما درست بود.')
      } else {
        toast.error(response.payload.response.feedback)
      }
    } else {
      toast.success('پاسخ شما با موفقیت ثبت شد.');
    }
  });

  onDelete = (props) => deleteWidget(props);

  return {
    onDelete,
    onMutate,
    onAnswerChange,
    onQuery,
    onAnswerSubmit,
    WidgetComponent,
    EditWidgetDialog,
    skipFetch,
  };
}

export default useWidgetFactory;