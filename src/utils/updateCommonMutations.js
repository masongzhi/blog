import get from 'lodash/get';

export default function updateCommonMutation(type, ...props) {
  function getMutationState(state, props) {
    let mutationState = state;
    if (props && props.length) {
      mutationState = get(state, props);
    }
    if (!mutationState) {
      throw new Error(`getMutationState can not find state.${props.join('.')}`);
    }
    return mutationState;
  }

  return {
    [type + '_START']: function(state) {
      const mutationState = getMutationState(state, props);
      mutationState.isLoading = true;
    },
    [type + '_SUCCESS']: function(state, { response }) {
      const mutationState = getMutationState(state, props);
      mutationState.isLoading = false;
    },
    [type + '_ERROR']: function(state, { error }) {
      const mutationState = getMutationState(state, props);
      mutationState.error = error;
      mutationState.isLoading = false;
    },
  };
}
