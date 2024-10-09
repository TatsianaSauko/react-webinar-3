export default {
  load: id => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'comments/load-start' });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
        });

        dispatch({ type: 'comments/load-success', payload: { data: res.data.result.items } });
      } catch (e) {
        dispatch({ type: 'comments/load-error' });
      }
    };
  },

  create: commentData => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'comments/create-start' });

      try {
        const res = await services.api.request({
          url: '/api/v1/comments',
          method: 'POST',
          body: JSON.stringify(commentData),
        });

        dispatch({ type: 'comments/create-success', payload: { data: res.data.result } });
      } catch (e) {
        dispatch({ type: 'comments/create-error' });
      }
    };
  },
};
