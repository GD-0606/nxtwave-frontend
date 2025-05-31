import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLists } from '../redux/features/listsSlice';

const useFetchLists = () => {
  const dispatch = useDispatch();
  const listsState = useSelector((state) => state.lists);

  useEffect(() => {
    dispatch(getLists());
  }, [dispatch]);

  const retry = useCallback(() => {
    dispatch(getLists());
  }, [dispatch]);

  return { ...listsState, retry };
};

export default useFetchLists;
