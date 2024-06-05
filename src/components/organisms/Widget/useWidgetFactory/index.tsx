import { useDispatch } from 'react-redux';
import { WidgetModes } from 'components/organisms/Widget';
import WIDGET_TYPE_MAPPER from './WidgetTypeMapper';
import { useCreateWidgetMutation, useDeleteWidgetMutation, useUpdateWidgetMutation } from 'redux/features/widget/WidgetSlice';
import { runConfetti } from 'components/molecules/confetti'
import { toast } from 'react-toastify';
import { useState } from 'react';

type WidgetFactoryType = {
  widgetId?: number;
  paperId?: number;
  widgetType?: string;
  mode: WidgetModes;
  collectWidgetDataToolkit?: any;
  collectAnswerData?: any;
}

const useWidgetFactory = ({
  widgetId,
  paperId,
  widgetType,
  mode,
  collectWidgetDataToolkit,
  collectAnswerData,
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

  onMutate = paperId ?
    (widgetId ?
      (props) => {
        updateWidget({ widgetType, fsmStateId: paperId, widgetId, ...props });
        setSkipFetch(false);
      } :
      (props) => {
        createWidget({ widgetType, fsmStateId: paperId, ...props });
        setSkipFetch(false);
      }) :
    // todo: fix TOF. لزوماً نباید با ?. هندلش کرد و لزوماً نباید اینجا صداش زد. اینجا صرفاً باید پاسش داد
    (widgetId ?
      collectWidgetDataToolkit?.updateWidget :
      collectWidgetDataToolkit?.addWidget?.({ widgetType }));

  onAnswerChange = collectAnswerData;

  // todo refactor: this peace of code should be extracted as a seprate method
  onAnswerSubmit = (arg) => dispatcher(submitAnswerAction(arg)).then((response) => {
    const CORRECTNESS_TRESHOLD = 50;
    if (response.error) return;
    if (response?.payload?.response) {
      if (response?.payload?.response.correctness_percentage > CORRECTNESS_TRESHOLD) {
        runConfetti();
        toast.success('آفرین! پاسخ شما درست بود.')
      } else {
        toast.error('پاسخ شما اشتباه بود')
      }
    } else {
      toast.success('پاسخ شما با موفقیت ثبت شد.');
    }
  });

  onDelete = paperId ?
    (arg) => deleteWidget(arg) :
    collectWidgetDataToolkit?.removeWidget;

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