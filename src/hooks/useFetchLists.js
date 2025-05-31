import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLists } from '../redux/features/listsSlice';

const useFetchLists = () => {
  const dispatch = useDispatch();
  const listsState = useSelector((state) => state.lists);

  useEffect(() => {
    dispatch(getLists());
  }, [dispatch]);

  const retry = () => {
    dispatch(getLists());
  };

  return { ...listsState, retry };
};

export default useFetchLists;
