import { WidgetModes } from "commons/components/organisms/Widget";
import { HintType } from "commons/types/global";

export type WidgetTypes =
  'TextWidget' |
  'Image' |
  'Video' |
  'Aparat' |
  'Iframe' |
  'SmallAnswerProblem' |
  'BigAnswerProblem' |
  'MultiChoiceProblem' |
  'UploadFileProblem';

export type WidgetType = {
  name: string;
  id: number;
  mode: WidgetModes;
  widget_type: WidgetTypes;
  cost: any;
  reward: any;
  hints: HintType[];
  is_hidden: boolean;
};