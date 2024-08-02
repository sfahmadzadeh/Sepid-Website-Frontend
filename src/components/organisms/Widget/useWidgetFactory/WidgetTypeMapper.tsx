import BigAnswerProblemWidget, { BigAnswerQuestionEditWidget } from '../questions/BigAnswerProblemWidget';
import ImageWidget, { ImageEditWidget } from '../contents/ImageWidget';
import IframeWidget, { IframeEditWidget } from '../contents/IframeWidget';
import MultiChoiceQuestionWidget, { MultiChoiceQuestionEditWidget } from '../questions/MultiChoiceQuestion';
import SmallAnswerProblemWidget, { SmallAnswerProblemEditWidget } from '../questions/SmallAnswerProblemWidget';
import TextWidget, { TextEditWidget } from '../contents/TextWidget';
import UploadFileProblemWidget, { UploadFileProblemEditWidget } from '../questions/UploadFileProblemWidget';
import VideoWidget, { VideoEditWidget } from '../contents/VideoWidget';
import AudioWidget, { AudioEditWidget } from '../contents/AudioWidget';
import DetailBoxWidget, { DetailBoxEditDialog } from '../contents/DetailBoxWidget';
import InviteeUsername, { InviteeUsernameEdit } from '../questions/InviteeUsername';

import {
  sendSmallAnswerAction,
  sendBigAnswerAction,
  sendMultiChoiceAnswerAction,
  sendInviteeUsernameResponseAction,
  sendUploadFileAnswerAction,
} from 'redux/slices/Answer';

const WIDGET_TYPE_MAPPER = {
  SmallAnswerProblem: {
    WidgetComponent: SmallAnswerProblemWidget,
    EditWidgetDialog: SmallAnswerProblemEditWidget,
    label: 'سوال کوتاه‌پاسخ',
    backendType: 'SmallAnswerProblem',
    submitAnswerAction: sendSmallAnswerAction,
  },
  BigAnswerProblem: {
    WidgetComponent: BigAnswerProblemWidget,
    EditWidgetDialog: BigAnswerQuestionEditWidget,
    label: 'سوال تشریحی',
    backendType: 'BigAnswerProblem',
    submitAnswerAction: sendBigAnswerAction,
  },
  MultiChoiceProblem: {
    WidgetComponent: MultiChoiceQuestionWidget,
    EditWidgetDialog: MultiChoiceQuestionEditWidget,
    label: 'سوال چند‌گزینه‌ای',
    backendType: 'MultiChoiceProblem',
    submitAnswerAction: sendMultiChoiceAnswerAction,
  },
  // InviteeUsername: {
  //   WidgetComponent: InviteeUsername,
  //   EditWidgetDialog: InviteeUsernameEdit,
  //   label: 'سوال کد معرف',
  //   backendType: 'InviteeUsernameProblem',
  //   submitAnswerAction: sendInviteeUsernameResponseAction,
  // },
  UploadFileProblem: {
    WidgetComponent: UploadFileProblemWidget,
    EditWidgetDialog: UploadFileProblemEditWidget,
    label: 'ارسال فایل',
    backendType: 'UploadFileProblem',
    submitAnswerAction: sendUploadFileAnswerAction,
  },
  TextWidget: {
    WidgetComponent: TextWidget,
    EditWidgetDialog: TextEditWidget,
    label: 'متن',
    backendType: 'TextWidget',
  },
  DetailBoxWidget: {
    WidgetComponent: DetailBoxWidget,
    EditWidgetDialog: DetailBoxEditDialog,
    label: 'نکته',
    backendType: 'DetailBoxWidget',
  },
  Image: {
    WidgetComponent: ImageWidget,
    EditWidgetDialog: ImageEditWidget,
    label: 'عکس',
    backendType: 'Image',
  },
  Video: {
    WidgetComponent: VideoWidget,
    EditWidgetDialog: VideoEditWidget,
    label: 'فیلم',
    backendType: 'Video',
  },
  Audio: {
    WidgetComponent: AudioWidget,
    EditWidgetDialog: AudioEditWidget,
    label: 'صوت',
    backendType: 'Audio',
  },
  Iframe: {
    WidgetComponent: IframeWidget,
    EditWidgetDialog: IframeEditWidget,
    label: 'بازی',
    backendType: 'Iframe',
  },
};
export default WIDGET_TYPE_MAPPER;
