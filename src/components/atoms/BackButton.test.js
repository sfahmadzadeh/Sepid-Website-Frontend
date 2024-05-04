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
    expect(wrapper).toMatchSnapshot(); // Use Jest's toMatchSnapshot() function
  });

  it('renders nothing when inwardEdges is empty', () => {
    const wrapper = shallow(
      <BackButton
        inwardEdges={[]}
        goBackward={() => {}}
        mentorMoveBackward={() => {}}
        playerId={1}
      />
    );
    expect(wrapper.isEmptyRender()).toBe(true); // Check if the component renders nothing
  });

  it('calls mentorMoveBackward when isMentor is true', () => {
    const mentorMoveBackwardMock = jest.fn();
    const wrapper = shallow(
      <BackButton
        inwardEdges={[{ is_back_enabled: true }]}
        goBackward={() => {}}
        mentorMoveBackward={mentorMoveBackwardMock}
        playerId={1}
      />
    );
    wrapper.find('Button').simulate('click'); // Simulate a click event on the Button
    expect(mentorMoveBackwardMock).toHaveBeenCalled(); // Check if mentorMoveBackward was called
  });

  it('calls goBackward when isMentor is false and backEdge.is_back_enabled is true', () => {
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

  it('does not call goBackward when isMentor is false and backEdge.is_back_enabled is false', () => {
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
