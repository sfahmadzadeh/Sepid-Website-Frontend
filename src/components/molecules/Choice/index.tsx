import React, { FC } from 'react';
import { ChoiceType, ChoiceVariantType } from 'types/widgets';
import { WidgetModes } from 'components/organisms/Widget';
import ChoiceEdit from './ChoiceEdit';
import ChoiceView from './ChoiceView';

export type ChoicePropsType = {
  choice: ChoiceType;
  isSelected: boolean;
  onSelectionChange: any;
  onDelete: any;
  onTextChange: any;
  variant: ChoiceVariantType;
  mode: WidgetModes;
}

const Choice: FC<Partial<ChoicePropsType>> = ({
  choice,
  isSelected,
  onSelectionChange,
  onDelete,
  onTextChange,
  variant,
  mode,
}) => {

  if (mode === WidgetModes.Edit) {
    return <ChoiceEdit
      choice={choice}
      onSelectionChange={onSelectionChange}
      onDelete={onDelete}
      onTextChange={onTextChange}
    />
  }

  if (mode === WidgetModes.View) {
    return <ChoiceView
      choice={choice}
      isSelected={isSelected}
      onSelectionChange={onSelectionChange}
      variant={variant}
    />
  }

};

export default Choice;