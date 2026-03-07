import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeed } from '../../slices/feed';
import { FeedUI } from '@ui-pages';

export const Feed = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.feed.orders);

  useEffect(() => {
    dispatch(getFeed());
  }, [dispatch]);

  return <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeed())} />;
};
