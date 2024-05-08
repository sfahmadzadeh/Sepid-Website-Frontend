import React from 'react';
import { shallow } from 'enzyme';
import BackButton from "./BackButton";

describe('BackButton component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <BackButton
        inwardEdges={[{ is_back_enabled: true }]}
        goBackward={() => {}}
        mentorMoveBackward={() => {}}
        playerId={1}
      />
    );
    expect(wrapper).toMatchSnapshot(); 
  });

  it('is empty', () => {
    const wrapper = shallow(
      <BackButton
        inwardEdges={[]}
        goBackward={() => {}}
        mentorMoveBackward={() => {}}
        playerId={1}
      />
    );
    expect(wrapper.isEmptyRender()).toBe(true);
  });

  it('true', () => {
    const mentorMoveBackwardMock = jest.fn();
    const wrapper = shallow(
      <BackButton
        inwardEdges={[{ is_back_enabled: true }]}
        goBackward={() => {}}
        mentorMoveBackward={mentorMoveBackwardMock}
        playerId={1}
      />
    );
    wrapper.find('Button').simulate('click'); 
    expect(mentorMoveBackwardMock).toHaveBeenCalled();
  });

  it('true', () => {
    const goBackwardMock = jest.fn();
    const wrapper = shallow(
      <BackButton
        inwardEdges={[{ is_back_enabled: true }]}
        goBackward={goBackwardMock}
        mentorMoveBackward={() => {}}
        playerId={1}
      />
    );
    wrapper.find('Button').simulate('click');
    expect(goBackwardMock).toHaveBeenCalled();
  });

  it('false', () => {
    const goBackwardMock = jest.fn();
    const wrapper = shallow(
      <BackButton
        inwardEdges={[{ is_back_enabled: false }]}
        goBackward={goBackwardMock}
        mentorMoveBackward={() => {}}
        playerId={1}
      />
    );
    wrapper.find('Button').simulate('click');
    expect(goBackwardMock).not.toHaveBeenCalled();
  });
});
