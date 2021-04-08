import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import actions from './test-actions';

const userAnswersOnTest = createReducer([], {
  [actions.setAnswer]: (state, { payload }) => {
    const isAlreadyAnswered = state.find(
      el => el.questionId === payload.questionId,
    );
    if (!isAlreadyAnswered) {
      return [...state, payload];
    }

    const refreshedState = state.map(el => {
      if (isAlreadyAnswered.questionId === el.questionId) {
        return { questionId: payload.questionId, result: payload.result };
      }
      return el;
    });
    return [...refreshedState];
  },
});

export default combineReducers({ userAnswersOnTest });