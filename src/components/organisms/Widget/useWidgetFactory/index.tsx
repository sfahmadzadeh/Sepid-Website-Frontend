import { useDispatch } from 'react-redux';
import { WidgetModes } from 'components/organisms/Widget';
import WIDGET_TYPE_MAPPER from './WidgetTypeMapper';
import { useDeleteWidgetMutation } from 'redux/features/widget/WidgetSlice';

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
  const dispatcher = useDispatch();
  const [deleteWidget, result] = useDeleteWidgetMutation();
  let onDelete, onMutate, onAnswerChange, onQuery, onAnswerSubmit;

  if (!widgetType) {
    return null;
  }

  const {
    WidgetComponent,
    EditWidgetDialog,
    createAction,
    updateAction,
    submitAnswerAction,
  } = WIDGET_TYPE_MAPPER[widgetType];

  onMutate = paperId ?
    (widgetId ?
      (arg) => dispatcher(updateAction(arg)) :
      (arg) => dispatcher(createAction(arg))) :
    // todo: fix TOF. لزوماً نباید با ?. هندلش کرد و لزوماً نباید اینجا صداش زد. اینجا صرفاً باید پاسش داد
    (widgetId ?
      collectWidgetDataToolkit?.updateWidget :
      collectWidgetDataToolkit?.addWidget?.({ widgetType }));

  onAnswerChange = collectAnswerData;

  onAnswerSubmit = (arg) => dispatcher(submitAnswerAction(arg));

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
  };
}

export default useWidgetFactory;